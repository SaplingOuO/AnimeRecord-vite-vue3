// Pinia（或 Vuex）管理全域狀態
import { defineStore } from "pinia";

export const useAnimeStore = defineStore("animeStore", {
  state: () => ({
    collection: JSON.parse(localStorage.getItem("animeCollection")) || [],
  }),
  actions: {
    addToCollection(anime) {
      if (!this.collection.some(a => a.mal_id === anime.mal_id)) {
        this.collection.push(anime);
        this.saveCollection();
      }
    },
    removeFromCollection(id) {
      this.collection = this.collection.filter(a => a.mal_id !== id);
      this.saveCollection();
    },
    saveCollection() {
      localStorage.setItem("animeCollection", JSON.stringify(this.collection));
    },
    isInCollection(id) {
      return this.collection.some(a => a.mal_id === id);
    }
  },
});