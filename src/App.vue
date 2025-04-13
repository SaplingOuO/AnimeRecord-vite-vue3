<!-- Vue 主應用元件 -->
<script setup>
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { watch } from "vue"; // ✅ 這裡要引入 watch

const route = useRoute();

// 監聽路由變化，自動更新標題
watch(
  () => route.path, // ✅ 這裡改成監聽 route.path，避免 Vue 3 reactivity 錯誤
  () => {
    document.title = route.meta.title || "AnimeRecord-vite-vue3";
  }
);
</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #565a5e; /* 淺灰色背景 */
}
</style>