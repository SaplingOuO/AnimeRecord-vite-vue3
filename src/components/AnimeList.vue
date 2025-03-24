<!-- 顯示動畫列表的元件 -->
<script setup>
import { defineProps } from "vue";
defineProps({
  animes: Array, // 接收從 Home.vue 傳來的動畫列表
});
</script>

<template>
  <div class="row">
    <div v-for="anime in animes" :key="anime.mal_id" class="col-12 col-md-6 col-lg-4">
      <div class="card mb-4">
        <img :src="anime.images.jpg.image_url" class="card-img-top" :alt="anime.title" />
        <div class="card-body">
          <h5 class="card-title">{{ anime.title }}</h5>
          <router-link :to="`/anime/${anime.mal_id}`" class="btn btn-primary">查看詳情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
.card img {
  height: 250px;
  object-fit: cover;
}
</style>