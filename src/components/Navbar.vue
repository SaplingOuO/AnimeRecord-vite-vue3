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
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">動畫館</router-link>
      <div>
        <router-link class="nav-link d-inline text-white mx-2" to="/test">測試</router-link>
        <router-link class="nav-link d-inline text-white mx-2" to="/collection">收藏</router-link>

        <!-- 如果未登入，顯示「登入」 -->
        <router-link v-if="!authStore.user" class="nav-link d-inline text-white mx-2" to="/login">
          登入
        </router-link>

        <!-- 如果已登入，顯示使用者名稱，並可點擊進入使用者頁面 -->
        <div v-else class="d-inline">
          <router-link class="nav-link d-inline text-white mx-2" to="/user">
            {{ authStore.user.name }}
          </router-link>
          <button class="btn btn-danger btn-sm mx-2" @click="logout">登出</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  margin-bottom: 20px;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* 半透明背景，避免與動畫混淆 */
}
</style>