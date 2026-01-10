import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  function addItem(product) {
  const exist = items.value.find(i => i.id === product.id)
  if (exist){
    exist.quantity++
  } else{
    items.value.push({
      ...product,
      quantity: 1
    })
  }
}
  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }
  const totalCount = computed(() =>
    items.value.reduce((s, i) => s + i.quantity, 0)
  )
  const itemTypesCount = computed(() => items.value.length)
  return{
    items,
    addItem,
    removeItem,
    totalCount,
    itemTypesCount,
  }
})
