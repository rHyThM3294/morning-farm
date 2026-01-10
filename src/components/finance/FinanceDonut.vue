<template>
  <div class="donut-chart">
    <div class="donut-center">
      <div class="donut-center-label">本月收入</div>
      <div class="donut-center-value">{{ displayTotal }}</div>
    </div>
    <svg width="300" height="300" viewBox="0 0 300 300" ref="svgRef">
      <circle class="donut-bg" cx="160" cy="140" r="100" />
      <circle class="donut-net" cx="160" cy="140" r="100" />
      <circle class="donut-fee" cx="160" cy="140" r="100" />
    </svg>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import gsap from 'gsap'
const props = defineProps({
  net: Number,  
  fee: Number,
})
const emit = defineEmits(['net-animation-complete'])
const svgRef = ref(null)
const netIncome = computed(() => props.net - props.fee)
const displayValue = ref(0)
const displayTotal = ref('$0')
const format = n => '$' + Math.round(n).toLocaleString()
onMounted(startAnimation)
watch(() => [props.net, props.fee], startAnimation)
function startAnimation() {
  const totalIncome = props.net
  const refundAmount = props.fee
  const actualNet = netIncome.value
  const circumference = 2 * Math.PI * 100
  const netArc = circumference * (actualNet / totalIncome)
  const feeArc = circumference * (refundAmount / totalIncome)
  const netEl = svgRef.value.querySelector('.donut-net')
  const feeEl = svgRef.value.querySelector('.donut-fee')
  gsap.set([netEl, feeEl], { strokeDasharray: circumference, strokeDashoffset: circumference })
  gsap.set(feeEl, { opacity: 0 })
  displayValue.value = 0
  displayTotal.value = '$0'
  const NET_TIME = 2
  const FEE_TIME = 1.2
  const INITIAL_DELAY = 0.5
  const tl = gsap.timeline()
  tl.to({}, { duration: INITIAL_DELAY })

  tl.to(netEl, {
    strokeDashoffset: 0,
    duration: NET_TIME,
    ease: 'power2.out'
  })
  tl.to(displayValue, {
    value: totalIncome,
    duration: NET_TIME,
    onUpdate() {
      displayValue.value = Math.round(displayValue.value)
      displayTotal.value = format(displayValue.value)
    },
    onComplete() {
      emit('net-animation-complete')
    }
  }, '<')
  tl.to(feeEl, { opacity: 1, duration: 0.2 })
  tl.to(feeEl, {
    strokeDashoffset: circumference - feeArc,
    duration: FEE_TIME,
    ease: 'power2.out'
  })

  tl.to(displayValue, {
    value: actualNet, 
    duration: FEE_TIME,
    onUpdate() {
      displayValue.value = Math.round(displayValue.value)
      displayTotal.value = format(displayValue.value)
    }
  }, '<')
}
</script>
<style scoped>
.donut-chart{ 
  position: relative; 
  width: 280px; 
  height: 280px;
}
svg{ 
  transform: rotate(-90deg);
}
circle{
  fill: none; 
  stroke-width: 40; 
  stroke-linecap: round;
}
.donut-bg { 
  stroke: var(--white);
}
.donut-net { 
  stroke: var(--firstColor); 
}
.donut-fee { 
  stroke: var(--addColor);
  opacity: 0;
}
.donut-center { 
  position: absolute; 
  inset: 0; 
  display: grid; 
  place-content: center;
  text-align: center; 
}
</style>