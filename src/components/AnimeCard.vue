<!-- 單個動畫卡片元件 -->
<script setup>
defineProps(["anime"]);
</script>

<template>
  <div class="col-md-4">
    <div class="card">
      <img :src="anime.images.jpg.image_url" class="card-img-top" alt="Anime Image" />
      <div class="card-body">
        <h5 class="card-title">{{ anime.title }}</h5>
        <p class="card-text">Episodes: {{ anime.episodes }}</p>
        <p class="card-text">Score: {{ anime.score }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>