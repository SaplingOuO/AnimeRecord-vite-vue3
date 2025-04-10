import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // 存使用者資料
  }),
  actions: {
    login(username, password) {
      if (username === "admin" && password === "1234") {
        this.user = { username };
        return true;
      }
      return false;
    },
    logout() {
      this.user = null;
    },
  },
});