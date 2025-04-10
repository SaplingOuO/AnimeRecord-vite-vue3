<!-- 登入頁 -->
<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
// import { users } from "../../public/users.json";

const username = ref("");
const password = ref("");
const errorMessage = ref(""); // 用來存放錯誤訊息
const users = ref([]); // 存放從 JSON 讀取的使用者資料

const authStore = useAuthStore();
const router = useRouter();

// 讀取 users.json
const fetchUsers = async () => {
  try {
    const response = await fetch("users.json"); // 確保 JSON 放在 public 目錄
    if (!response.ok) throw new Error("無法載入使用者資料");
    users.value = await response.json();
  } catch (error) {
    console.error("讀取失敗:", error);
    errorMessage.value = "系統錯誤，請稍後再試";
  }
};

// 進入頁面時讀取 JSON
fetchUsers();

const login = () => {
  if (!username.value || !password.value) {
    errorMessage.value = "請輸入帳號和密碼";
    return;
  }

  // 在 users 陣列中查找對應帳號
  const user = users.value.find(
    (u) => u.name === username.value && u.password === password.value
  );

  if (user) {
    authStore.login({ name: user.name }); // 登入成功，存入 Pinia
    router.push("/user"); // 跳轉到使用者資訊頁面
  } else {
    errorMessage.value = "帳號或密碼錯誤";
  }
};
</script>

<template>
  <div class="container text-white">
    <h1>登入</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">帳號</label>
        <input v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input type="password" v-model="password" class="form-control" />
      </div>

      <!-- 顯示錯誤訊息 -->
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

      <button type="submit" class="btn btn-primary">登入</button>
    </form>
  </div>
</template>

<style>
h1, label {
  color: #000;
}
</style>