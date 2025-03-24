<!-- 導覽列 -->
<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">動畫館</router-link>
      <div>
        <router-link class="nav-link d-inline text-white mx-2" to="/test">測試</router-link>
        <router-link class="nav-link d-inline text-white mx-2" to="/collection">收藏</router-link>
        <router-link class="nav-link d-inline text-white mx-2" to="/login">登入</router-link>
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
  background-color: rgba(0, 0, 0, 0.8); /* 可加半透明背景，避免與動畫混淆 */
}
</style>