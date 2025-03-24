<!-- 收藏列表頁 -->
<script setup>
import { useAnimeStore } from "../store/animeStore";

const store = useAnimeStore();
</script>

<template>
  <div class="container text-white">
    <h1>我的收藏</h1>
    <div class="row">
      <div v-for="anime in store.collection" :key="anime.mal_id" class="col-md-4">
        <div class="card mb-4">
          <img :src="anime.images.jpg.image_url" class="card-img-top" :alt="anime.title" />
          <div class="card-body">
            <h5 class="card-title">{{ anime.title }}</h5>
            <button @click="store.removeFromCollection(anime.mal_id)" class="btn btn-danger">移除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>