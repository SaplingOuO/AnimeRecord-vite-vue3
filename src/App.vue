<!-- Vue 主應用元件 -->
<script setup>
import Navbar from "./components/Navbar.vue";
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