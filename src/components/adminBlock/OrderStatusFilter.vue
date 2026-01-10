<template>
  <div 
    ref="scrollContainer"
    class="orderStatusFilter"
  >
    <button
      v-for="s in statusList"
      :key="s.value"
      :class="{ active: modelValue === s.value }"
      @click="$emit('update:modelValue', s.value)"
    >
      {{ s.label }}
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineProps({
  modelValue: {
    type: String,
    default: 'all'
  }
})
const statusList = [
  { value: 'all', label: '全部' },
  { value: 'unpaid', label: '未付款' },
  { value: 'toShip', label: '待出貨' },
  { value: 'delivered', label: '已配達' },
  { value: 'returned', label: '已退回' },
  { value: 'pickedUp', label: '已取件' },
  { value: 'abnormal', label: '異常' },
  { value: 'cancelled', label: '取消訂單' }
]
const scrollContainer = ref(null)
const handleWheel = (e) => {
  if (scrollContainer.value) {
    const hasOverflow = scrollContainer.value.scrollWidth > scrollContainer.value.clientWidth  
    if (hasOverflow) {
      e.preventDefault()
      scrollContainer.value.scrollLeft += e.deltaY
    }
  }
}
onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('wheel', handleWheel, { passive: false })
  }
})
onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('wheel', handleWheel)
  }
})
</script>
<style scoped>
.orderStatusFilter{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 0.5em;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5em; 
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.orderStatusFilter::-webkit-scrollbar {
  display: none;
}
.orderStatusFilter button{
  cursor: pointer;
  min-width: 100px;
  flex-shrink: 0;
  border: 0;
  border-radius: var(--radiusLarge);
  padding: 0.8em;
  background-color: var(--backgroundColor);
  color: var(--black);
  transition: var(--transitionNormal);
}
.orderStatusFilter button.active{
  background: var(--mainColor);
  color: var(--white);
}
@media(width>=768px){
  .orderStatusFilter{
    overflow-x: visible;
  }
  .orderStatusFilter button:hover{
    background-color: var(--mainColor);
    color: var(--white);
  }
}
</style>