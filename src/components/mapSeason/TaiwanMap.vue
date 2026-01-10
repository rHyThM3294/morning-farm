<template>
  <div class="tw-wrapper">
    <div ref="svgHost" class="tw-host" v-html="svgHtml" ></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import twSvgRaw from '@/assets/Blank_Taiwan_map.svg?raw'
const emit = defineEmits(['citySelected', 'svgReady'])
const svgHost = ref(null)
const svgHtml = ref('')
let clickHandler = null
const normalizeCityName = (name) => {
  if (!name) return ''
  return name
    .replace(/台/g, '臺')
    .replace(/\s+/g, '')
    .trim()
}
const normalizeSvg = (raw) =>
  raw.replace(/<\?xml[^>]*>/gi, '').replace(/<!DOCTYPE[^>]*>/gi, '')
onMounted(() => {
  console.log('🚀 開始初始化地圖')
  svgHtml.value = normalizeSvg(twSvgRaw)
  requestAnimationFrame(() => {
    const svgEl = svgHost.value?.querySelector('svg')
    if (!svgEl) {
      console.error('❌ 找不到 SVG 元素')
      return
    }
    console.log('✅ SVG 元素已找到')
    svgEl.removeAttribute('width')
    svgEl.removeAttribute('height')
    svgEl.style.width = '100%'
    svgEl.style.height = 'auto'
    svgEl.classList.add('tw-svg')
    const rects = svgEl.querySelectorAll('rect')
    console.log(`🗑️ 找到 ${rects.length} 個 rect 元素，準備移除`)
    rects.forEach((rect) => rect.remove())
    const lines = svgEl.querySelectorAll('line')
    console.log(`🗑️ 找到 ${lines.length} 個 line 元素，準備移除`)
    lines.forEach((line) => line.remove())
    const allPaths = svgEl.querySelectorAll('path')
    allPaths.forEach((p) => {
      const id = p.getAttribute('id')
      if (!id || !/[\u4e00-\u9fa5]/.test(id)) {
        p.remove()
        console.log(`🗑️ 移除無縣市名稱的 path`)
      }
    })
    const paths = svgEl.querySelectorAll('path')
    console.log(`📊 剩餘 ${paths.length} 個 path 元素`)
    let countyCount = 0
    paths.forEach((p, index) => {
      const id = p.getAttribute('id')
      if (id && /[\u4e00-\u9fa5]/.test(id)){
        p.classList.add('tw-county')
        p.setAttribute('data-city', normalizeCityName(id))
        p.setAttribute('tabindex', '0')
        p.setAttribute('role', 'button')
        countyCount++
      }
    })
    console.log(`✅ 成功設定 ${countyCount} 個縣市`)
    clickHandler = (e) => {
      const target = e.target
      if (!(target instanceof SVGPathElement)) return
      const cityId = target.getAttribute('id')
      const cityName = normalizeCityName(cityId)
      if (!cityName) return
      svgEl
        .querySelectorAll('.tw-county.selected')
        .forEach((el) => el.classList.remove('selected'))
      target.classList.add('selected')
      console.log('✅ 選取縣市：', cityName)
      emit('citySelected', cityName)
    }
    svgEl.addEventListener('click', clickHandler, false)
    console.log('🎉 SVG 地圖初始化完成')
    emit('svgReady')
  })
})
onBeforeUnmount(() => {
  const svgEl = svgHost.value?.querySelector('svg')
  if (svgEl && clickHandler) {
    svgEl.removeEventListener('click', clickHandler)
  }
})
const selectCity = (cityName) => {
  console.log('🎯 selectCity 被呼叫，目標城市：', cityName)
  const svgEl = svgHost.value?.querySelector('svg')
  if (!svgEl) {
    console.warn('⚠️ SVG 元素尚未準備好')
    return
  }
  const normalizedTarget = normalizeCityName(cityName)
  svgEl
    .querySelectorAll('.tw-county.selected')
    .forEach((el) => el.classList.remove('selected'))
  const targetPath = svgEl.querySelector(`path[id="${normalizedTarget}"]`)
  if(targetPath){
    targetPath.classList.add('selected')
    console.log('✅ 成功選取縣市：', normalizedTarget)
  }else{
    const allPaths = svgEl.querySelectorAll('path.tw-county')
    let found = false
    allPaths.forEach((p) => {
      const id = normalizeCityName(p.getAttribute('id'))
      if (id === normalizedTarget || id.includes(normalizedTarget)) {
        p.classList.add('selected')
        found = true
      }
    })
    if(!found){
      console.warn('⚠️ 找不到對應的縣市：', normalizedTarget)
    }
  }
}
defineExpose({
  selectCity
})
</script>
<style scoped>
.tw-wrapper{
  width: auto;
  height: calc(100vh -10%);
  margin: 0 auto;
  overflow: hidden;
  padding: 0;
}
:deep(.tw-svg){
  display: block;
  background:var(--white);
  border: 1px solid var(--backgroundColor);
  border-radius: 16px;
}
:deep(.tw-county){
  transform-box: fill-box;
  transform-origin: center;
  fill: var(--addColor);
  stroke: #8c9a66;
  stroke-width: 1;
  cursor: pointer;
  transition: fill 0.22s ease, transform 0.18s ease;
  outline: none;
}
:deep(.tw-county:hover){
  fill:var(--backgroundColor);
}
:deep(.tw-county.selected){
  fill: var(--mainColor) ;
  stroke:var(--black);
  /* transform: translateY(8px) scale(1.05); */
}
:deep(rect),:deep(line){
  display: none;
}
@media screen and (min-width: 768px){
  .tw-wrapper{
    max-width: 1200px;
    height: calc(160vh - 15%);
  }
}
</style>