// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   base: process.env.NODE_ENV === 'production' ? 'AnimeRecord-vite-vue3' : '/',
// })

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? 'AnimeRecord-vite-vue3' : '/', // ✅ GitHub Pages 的專案路徑
});