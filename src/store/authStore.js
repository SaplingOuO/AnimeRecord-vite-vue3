import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // 保持登入狀態
  }),
  actions: {
    login(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData)); // 存入 localStorage
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user"); // 清除登入資訊
    }
  }
});