<!-- 測試頁.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { getRandomAnime } from "../api/animeService";

const animeDetail = ref(null); // 存動畫詳細資訊
const isLoading = ref(false); // 控制載入狀態

// 動畫分級選項
const ratings = ["G", "R"];
const selectedRatings = ref([]); // 使用者選擇的分級

// 獲取動畫列表
const fetchRandomAnime = async () => {
  isLoading.value = true;

  let response = null;

  do {
    response = await getRandomAnime();
  } while (
    response && 
    selectedRatings.value.length > 0 && 
    !selectedRatings.value.some(rating => response.data.rating.includes(rating))
  );

  if (response) {
    animeDetail.value = response.data;
  }

  isLoading.value = false;
};

onMounted(async () => {
  fetchRandomAnime();
});


</script>

<template>
  <div>
    <div>
    <h1>選擇動畫分級</h1>
    <div>
      <label v-for="rating in ratings" :key="rating" class="me-3">
        <input type="checkbox" v-model="selectedRatings" :value="rating" />
        {{ rating }}
      </label>
    </div>
      <button @click="fetchRandomAnime" :disabled="isLoading">
        {{ isLoading ? "載入中..." : "隨機取得動畫" }}
      </button>
      <h1>動畫詳情</h1>
      <div v-if="animeDetail">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center border-end">
              <img :src="animeDetail.images.jpg.image_url" class="img-fluid rounded-start" alt="動畫封面" width="200" />
            </div>
            <div class="col-md-8">
              <div class="card-body p-0">
                <h2 class="card-title p-2 m-0 border">{{ animeDetail.title_japanese }}</h2>
                <p class="card-text p-2 m-0 border">📅 播放時間：{{ animeDetail.aired.string }}</p>
                <p class="card-text p-2 m-0 border">⭐ 評分：{{ animeDetail.score }}</p>
                <p class="card-text p-2 m-0 border">🔖 分級：{{ animeDetail.rating }}</p>
                <p class="card-text p-2 m-0 border overflow-auto" style="height: 200px;">📖 簡介：{{ animeDetail.synopsis }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p v-else>載入中...</p>

    </div>
  </div>
</template>