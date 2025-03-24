<!-- 登入頁 -->
<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");

const login = () => {
  alert(`登入成功！使用者：${username.value}`);
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
      <button type="submit" class="btn btn-primary">登入</button>
    </form>
  </div>
</template>

<style>
h1, label {
  color: #000;
}
</style>