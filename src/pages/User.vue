<script setup>
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/"); // 登出後回首頁
};
</script>

<template>
  <div class="container text-white">
    <h1>使用者資訊</h1>

    <div v-if="authStore.user">
      <p>歡迎，{{ authStore.user.name }}！</p>
      <button class="btn btn-danger" @click="logout">登出</button>
    </div>

    <div v-else>
      <p>請先登入</p>
      <router-link to="/login" class="btn btn-primary">登入</router-link>
    </div>
  </div>
</template>