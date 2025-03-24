<script setup>
import { ref, onMounted } from "vue";
import { getAnimeList } from "../api/animeService";
import AnimeList from "../components/AnimeList.vue";

const animeList = ref([]);

onMounted(async () => {
  animeList.value = await getAnimeList();
});
</script>

<template>
  <div class="container">
    <AnimeList :animes="animeList" />
  </div>
</template>

<style scoped>
h1 {
  color: white;
}
</style>