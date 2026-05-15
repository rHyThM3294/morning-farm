import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const CART_KEY = 'morning_farm_cart'

export const useCartStore = defineStore('cart', () => {
  // 從 localStorage 還原購物車，重整後不清空
  const savedCart = (() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })()

  const items = ref(savedCart)

  // 任何變動都同步寫入 localStorage
  watch(items, (val) => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(val))
    } catch {
      // localStorage 滿了或被禁用，靜默忽略
    }
  }, { deep: true })

  function addItem(product) {
    const exist = items.value.find(i => i.id === product.id)
    if (exist) {
      // 若規格改變（stock 可能不同），更新 stock 上限
      if (product.stock != null) exist.stock = product.stock
      const addQty = product.quantity ?? 1
      exist.quantity = Math.min(exist.quantity + addQty, exist.stock ?? 999)
    } else {
      items.value.push({ ...product, quantity: product.quantity ?? 1 })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQuantity(id, quantity) {
    const item = items.value.find(i => i.id === id)
    if (!item) return
    if (quantity <= 0) {
      removeItem(id)
    } else {
      item.quantity = Math.min(quantity, item.stock ?? 999)
    }
  }

  function clearCart() {
    items.value = []
  }

  const totalCount    = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const itemTypesCount = computed(() => items.value.length)
  // 商品小計總額（不含運費）
  const totalPrice    = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0))

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    itemTypesCount,
    totalPrice,
  }
})