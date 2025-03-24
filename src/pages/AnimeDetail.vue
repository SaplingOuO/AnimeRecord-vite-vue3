<!-- 動畫詳細資訊頁 -->
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAnimeDetail } from "../api/animeService";
import { useAnimeStore } from "../store/animeStore";

const route = useRoute();
const anime = ref(null);
const store = useAnimeStore();
const loading = ref(true);
const error = ref(null);

// 計算動畫是否已在收藏清單中
const isCollected = computed(() => anime.value && store.isInCollection(anime.value.mal_id));

onMounted(async () => {
  try {
    anime.value = await getAnimeDetail(route.params.id);
  } catch (err) {
    error.value = "無法載入動畫資料，請稍後再試";
    console.error("取得動畫詳情失敗:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <!-- 載入中狀態 -->
    <p v-if="loading">載入中...</p>

    <!-- 錯誤訊息 -->
    <p v-if="error" class="text-danger">{{ error }}</p>

    <!-- 動畫資訊 -->
    <div v-if="anime">
      <h1>{{ anime.title }}</h1>
      <img :src="anime.images.jpg.image_url" alt="封面" class="img-fluid" />
      <p>{{ anime.synopsis }}</p>

      <!-- 收藏按鈕 -->
      <button 
        @click="isCollected ? store.removeFromCollection(anime.mal_id) : store.addToCollection(anime)"
        :class="isCollected ? 'btn btn-danger' : 'btn btn-warning'"
      >
        {{ isCollected ? "移除收藏" : "加入收藏" }}
      </button>
    </div>
  </div>
</template>
