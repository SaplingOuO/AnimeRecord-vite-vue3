// API 請求
import axios from "axios";

// 獲取熱門動畫列表
export async function getAnimeList() {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime");
    return response.data.data; // Jikan API 的數據在 data.data 中
  } catch (error) {
    console.error("取得動畫列表失敗:", error);
    return []; // 發生錯誤時回傳空陣列
  }
}

// 獲取單個動畫詳細資訊
export async function getAnimeDetail(id) {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`取得動畫詳情失敗 (ID: ${id}):`, error);
    return null; // 發生錯誤時回傳 null
  }
}

// 獲取所有動畫總數
export async function getAnimeCount() {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/anime");
    const total = response.data.pagination.items.total; // 確保 API 回應包含 pagination
    console.log("動畫總數:", total);
    return total; // 回傳總數
  } catch (error) {
    console.error("獲取動畫數量時出錯:", error);
    return 0; // 發生錯誤時回傳 0
  }
}

// 文字查詢動畫
export async function getAnimeQuery(name) {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${name}`);
    return response.data.data; 
  } catch (error) {
    console.error("獲取動畫時出錯:", error);
    return null; // 發生錯誤時回傳 0
  }
}

// 獲取隨機動畫
export async function getRandomAnime(){
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/random/anime`);
    return response.data;
  } catch (error) {
    console.error("獲取動畫時出錯:", error);
    return null;
  }
}