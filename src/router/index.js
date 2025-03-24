// Vue Router定義所有頁面的路由
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import AnimeDetail from "../pages/AnimeDetail.vue";
import Collection from "../pages/Collection.vue";
import Test from "../pages/Test.vue";
import Login from "../pages/Login.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/anime/:id", component: AnimeDetail },
  { path: "/collection", component: Collection },
  { path: "/test", component: Test },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;