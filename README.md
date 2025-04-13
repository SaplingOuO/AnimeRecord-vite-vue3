# Vue 3 + Vite
vue-router
pinia
axios
tailwindcss

API(https://jikan.moe/) 
https://docs.api.jikan.moe/#section/Information

AnimeRecord-Vite-Vue3
===
第一個Vite專案

目錄
---
*[資料結構](#資料結構)
    1. [](#)
*[](#)
    1. [](#)


使用技術
| JavaScript框架 | UI框架 | 前端建構工具 |
| :--: | :--: |:--:|
| Vue3 | Bootstrap | Vite |

資料結構
>public **資料夾中的檔案不會被 Vite 進行打包，它們會直接放入最終的 dist/ 目錄。**
>>404.html **自訂 404 頁面，當找不到路由時顯示。**

>src **專案的主要程式碼，包含 API、元件、頁面、狀態管理、樣式等。**
>>api **API 相關**
>>>animeService.js **負責與動畫 API 進行溝通，像是取得動畫資料等。**

>>assets **靜態資源**
>>>vue.svg **Vue 標誌，用在 Navbar 或首頁的 Logo。**

>>components **可重複使用的 UI 元件。**
>>>AnimeCard.vue **顯示單個動畫的資訊，例如圖片、標題等。**
>>>AnimeList.vue **負責顯示多個 AnimeCard.vue，類似動畫列表的區塊。**
>>>Navbar.vue **頂部導覽列，可能包含首頁、收藏列表、登入等連結。**

>>layouts **版型（選用）**
>>>DefaultLayout.vue **定義整體頁面的結構，例如 Header、Footer、Sidebar。**

>>pages **頁面**
>>>AnimeDetail.vue **顯示動畫詳細資訊，並提供加入/移除收藏的按鈕。**
>>>Collection.vue **顯示使用者收藏的動畫列表。**
>>>Home.vue **首頁，可能包含熱門動畫、推薦動畫等。**
>>>Login.vue **登入頁面，讓使用者登入帳號。**
>>>Test.vue **測試用的頁面。**
>>>User.vue **使用者資訊頁面**

>>router **Vue Router 設定**
>>>index.js **設定 Vue Router，定義所有頁面的路由。**

>>store **狀態管理**
>>>animeStore.js **使用 Pinia 管理動畫的收藏功能。**
>>>authStore.js **保持登入管理**
>>>userStore.js **使用者資訊管理**

>>styles **全域樣式**
>>>main.css **儲存全站的 CSS 樣式。**

>>App.vue **主要 Vue 應用**

>>main.js **入口檔案**

>deploy.sh **將 Vite 應用程式自動化部署腳本到 GitHub Pages**

>package.json **記錄專案的依賴項目和指令。**

>vite.config.js **Vite 的設定檔案，指定 base 路徑等。**