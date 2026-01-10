import { defineStore } from "pinia";
import { ref } from "vue";
export const useFavoriteStore = defineStore("favorite", () => {
  const items = ref([]);
  function toggle(product) {
    const index = items.value.findIndex(p => p.id === product.id);
    if (index > -1) {
      items.value.splice(index, 1);
      return false;
    } else {
      items.value.push(product);
      return true;
    }
  }
  function isFavorited(id) {
    return items.value.some(p => p.id === id);
  }
  return { items, toggle, isFavorited };
});
