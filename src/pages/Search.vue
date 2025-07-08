<template>
  <div class="container py-5">
    <!-- 搜尋框 -->
    <div class="mx-auto" style="max-width: 500px; position: relative;">
      <input
        v-model="query"
        @input="startSearch"
        placeholder="輸入動畫名稱"
        class="form-control"
      />
      <ul
        v-if="results.length"
        class="list-group position-absolute w-100 z-3"
        style="max-height: 400px; overflow-y: auto;"
        @scroll="handleScroll"
        ref="dropdownRef"
      >
        <li
          v-for="item in results"
          :key="item.id"
          @click="selectAnime(item)"
          class="list-group-item d-flex align-items-center"
          style="cursor: pointer;"
        >
          <img
            :src="item.coverImage.medium"
            alt="封面"
            class="me-2"
            style="width: 40px; height: 56px; object-fit: cover;"
          />
          <span>{{ item.title.native || item.title.romaji }}</span>
        </li>
        <li v-if="loadingMore" class="list-group-item text-center text-muted">
          載入中...
        </li>
      </ul>
    </div>

    <!-- 單筆動畫詳情 -->
    <div
      v-if="selectedAnime"
      class="mt-5 p-4 border rounded shadow mx-auto"
      style="max-width: 700px;"
    >
      <h2 class="text-center">{{ selectedAnime.title.native || selectedAnime.title.romaji }}</h2>
      <div class="text-center my-3">
        <img
          :src="selectedAnime.coverImage.large"
          alt="封面"
          style="width: 200px;"
          class="img-fluid"
        />
      </div>
      <p v-html="selectedAnime.description"></p>
      <p><strong>集數：</strong>{{ selectedAnime.episodes }}</p>
      <p><strong>評分：</strong>{{ selectedAnime.averageScore }}</p>
    </div>
  </div>
  
    <!-- 熱門動畫 Carousel -->
    <div v-if="showCarousel" class=" mx-auto" style="max-width: 350px;">
      <h2 class="text-center mb-4">熱門動畫</h2>
      <div id="animeCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div
            v-for="(anime, index) in topAnimes"
            :key="anime.id"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <div class="d-flex justify-content-center position-relative">
              <img
                :src="anime.coverImage.large"
                class="d-block"
                style="height: 500px; object-fit: contain;"
                @click="selectTopAnime(anime)"
              />
                <div class="position-absolute bottom-0 bg-dark bg-opacity-75 text-white text-center px-2 py-1" style="width: 100%;">
                <h4 class="title text-truncate m-0">{{ anime.title.native || anime.title.romaji }}</h4>
                </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#animeCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">上一個</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#animeCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">下一個</span>
        </button>
      </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const query = ref('');
const results = ref([]);
const selectedAnime = ref(null);
const page = ref(1);
const hasNextPage = ref(true);
const loading = ref(false);
const loadingMore = ref(false);
const dropdownRef = ref(null);
const topAnimes = ref([]);
const showCarousel = ref(true);

let debounceTimeout = null;

function startSearch() {
  clearTimeout(debounceTimeout);
  const trimmed = query.value.trim();

  if (!trimmed) {
    results.value = [];
    selectedAnime.value = null;
    showCarousel.value = true; // 👉 清空時顯示熱門動畫
    return;
  }

  showCarousel.value = false; // 👉 有輸入時隱藏熱門動畫

  debounceTimeout = setTimeout(() => {
    page.value = 1;
    hasNextPage.value = true;
    results.value = [];
    searchAnime();
  }, 500);
}

async function searchAnime() {
  if (!hasNextPage.value || loading.value || !query.value.trim()) return;

  loading.value = true;
  if (page.value > 1) loadingMore.value = true;

  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($search: String, $page: Int) {
            Page(page: $page, perPage: 10) {
              pageInfo {
                currentPage
                hasNextPage
              }
              media(search: $search, type: ANIME) {
                id
                title {
                  romaji
                  native
                }
                coverImage {
                  medium
                  large
                }
                description(asHtml: false)
                episodes
                averageScore
              }
            }
          }
        `,
        variables: {
          search: query.value,
          page: page.value,
        },
      }),
    });

    const data = await res.json();
    if (data.errors || !data.data?.Page) {
      console.error('AniList API 錯誤：', data.errors || data);
      return;
    }

    const media = data.data.Page.media;
    results.value.push(...media);
    hasNextPage.value = data.data.Page.pageInfo.hasNextPage;
    page.value += 1;
  } catch (err) {
    console.error('載入錯誤', err);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}

function handleScroll() {
  const el = dropdownRef.value;
  if (!el) return;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    searchAnime();
  }
}

function selectAnime(anime) {
  selectedAnime.value = anime;
  query.value = anime.title.native || anime.title.romaji;
  results.value = [];
}

async function fetchTopAnimes() {
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            Page(page: 1, perPage: 50) {
              media(type: ANIME, sort: POPULARITY_DESC) {
                id
                title {
                  romaji
                  native
                }
                coverImage {
                  large
                }
                description(asHtml: false)
              }
            }
          }
        `,
      }),
    });

    const data = await res.json();
    topAnimes.value = data.data.Page.media;
  } catch (err) {
    console.error('熱門動畫載入失敗：', err);
  }
}

function selectTopAnime(anime) {
  selectedAnime.value = null; // 先清空舊資料（可選）
  query.value = anime.title.native || anime.title.romaji;
  page.value = 1;
  results.value = [];
  hasNextPage.value = true;
  showCarousel.value = false; // 👉 收起熱門動畫
  startSearch();
}

onMounted(() => {
  fetchTopAnimes();
});
</script>