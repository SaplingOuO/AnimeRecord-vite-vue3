// Vue Router定義所有頁面的路由
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AnimeDetail from "../pages/AnimeDetail.vue";
import Collection from "../pages/Collection.vue";
import Test from "../pages/Test.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/", redirect: "/Home" }, // 👈 這行確保 `/` 會正確導向
  { path: "/Home", component: Home, meta: { title: "首頁 | AnimeRecord" } },
  { path: "/anime/:id", component: AnimeDetail, meta: { title: "動畫詳情 | AnimeRecord" } },
  { path: "/collection", component: Collection, meta: { title: "收藏列表 | AnimeRecord" } },
  { path: "/test", component: Test, meta: { title: "測試頁面 | AnimeRecord" } },
  { path: "/login", component: Login, meta: { title: "登入 | AnimeRecord" } },
];

const router = createRouter({
  history: createWebHashHistory(), // ⬅️ 改成 Hash 模式，避免 GitHub Pages 404
  routes,
});

export default router;