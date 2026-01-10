<template>
  <div class="stat-card" :class="type">
    <p class="title">{{ title }}</p>
    <h4>{{ formattedValue }}</h4>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import gsap from 'gsap'
const props = defineProps({
  title: String,
  type: String,
  value: Number,
  delay: { type: Number, default: 0 }
})
const displayValue = ref(0)
const formattedValue = computed(() => {
  const val = Math.round(displayValue.value)
  return '$' + val.toLocaleString()
})
function animate(){
  displayValue.value = 0
  gsap.to(displayValue,{
    value: props.value,
    duration: 2,
    ease: 'power2.out',
    delay: props.delay,
    onUpdate: function(){
      displayValue.value = this.targets()[0].value
    }
  })
}
onMounted(() => {
  if (props.value !== undefined && props.value !== null) {
    animate()
  }
})
watch(() => props.value, (newVal) => {
  if (newVal !== undefined && newVal !== null) {
    animate()
  }
})
</script>
<style scoped>
.stat-card{
  background: var(--backgroundColor);
  border-radius: 12px;
  padding: 0.5em;
  min-width: 180px;
}
.stat-card.income{ 
  border-right: 6px solid var(--firstColor);
}
.stat-card.fee{ 
  border-right: 6px solid var(--mainCOlor);
}
.stat-card.refund{
  border-right: 6px solid var(--addColor); 
}
</style>