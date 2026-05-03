import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const FAVORITE_KEY = 'morning_farm_favorites'

export const useFavoriteStore = defineStore('favorite', () => {
  // 從 localStorage 還原收藏清單
  const savedFavorites = (() => {
    try {
      const raw = localStorage.getItem(FAVORITE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })()

  const items = ref(savedFavorites)

  // 變動時同步寫入 localStorage
  watch(items, (val) => {
    try {
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(val))
    } catch {
      // 靜默忽略
    }
  }, { deep: true })

  function toggle(product) {
    const index = items.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
      return false
    } else {
      items.value.push(product)
      return true
    }
  }

  function isFavorited(id) {
    return items.value.some(p => p.id === id)
  }

  return { items, toggle, isFavorited }
})
