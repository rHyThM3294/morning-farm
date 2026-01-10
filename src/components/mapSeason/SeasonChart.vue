<template>
  <div class="seasonChart">
    <div class="chartDesktop" v-if="!isMobile">
      <div class="monthHeader">
        <div
          v-for="m in months"
          :key="m"
          class="monthHeaderCell"
          :class="{ highlightMonth: m === currentMonth }"
        >
          {{ m }}月
        </div>
      </div>
      <div 
        v-for="item in seasonChartData" 
        :key="item.id" 
        class="chartRow"
        @mouseenter="hoveredProduct = item.id"
        @mouseleave="hoveredProduct = null"
      >
        <div class="monthGrid">
          <div
            v-for="(segment, idx) in computeBarSegments(item.months)"
            :key="idx"
            class="rangeBar"
            :class="{
              hovered: hoveredProduct === item.id && selectedProductId !== item.id,
              selected: selectedProductId === item.id
            }"
            :style="computeBarStyle(segment)"
            @click="selectProduct(item)"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chartMobile" v-else>
      <div class="mobileMonthColumn">
        <div class="monthLabels">
          <div
            v-for="m in months"
            :key="m"
            class="monthLabel"
            :class="{ current: m === currentMonth }"
          >
            {{ m }}月
          </div>
        </div>
       <div class="productsColumn">
          <div 
            v-for="item in seasonChartData" 
            :key="item.id"
            class="productColumn"
          >
            <div class="monthCells">
              <div
                v-for="(segment, idx) in computeBarSegments(item.months)"
                :key="idx"
                class="mobileRangeBar"
                :class="{ selected: selectedProductId === item.id }"
                :style="computeMobileBarStyle(segment)"
                @click="selectProduct(item)"
              >
                <span class="verticalText">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
const selectedProductId = ref(null)
const props = defineProps({
  seasonChartData: Array
})
const emit = defineEmits(['selectProduct'])
const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const currentMonth = new Date().getMonth() + 1
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)
function handleResize() {
  windowWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
const hoveredProduct = ref(null)
function selectProduct(item) {
  if (selectedProductId.value === item.id) return   // ✅ 已選取就不再反應
  selectedProductId.value = item.id
  emit('selectProduct', item)
}
function computeBarSegments(monthList) {
  if (!monthList || monthList.length === 0) return []
  const sorted = [...monthList].sort((a, b) => a - b)
  const segments = []
  let currentSegment = [sorted[0]]  
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i-1] + 1) {
      currentSegment.push(sorted[i])
    } else {
      segments.push(currentSegment)
      currentSegment = [sorted[i]]
    }
  }
  segments.push(currentSegment)
  return segments
}
function computeBarStyle(segment) {
  if (!segment || segment.length === 0) return {} 
  const start = segment[0]
  const width = segment.length
  return {
    left: `${(start - 1) / 12 * 100}%`,
    width: `${width / 12 * 100}%`
  }
}
function computeMobileBarStyle(segment){
  if(!segment || segment.length === 0) return {}  
  const start = segment[0]
  const height = segment.length
  return{
    top: `${(start - 1) / 12 * 100}%`,
    height: `${height / 12 * 100}%`
  }
}
</script>
<style scoped>
.seasonChart{
  width: 100%;
  background: var(--white);
  border-radius: 12px;
  padding: 1em;
}
.chartDesktop{
  display: none;
}
.chartMobile {
  width: 100%;
  overflow-x: auto;
}
.mobileMonthColumn{
  display: flex;
  gap: 0.5em;
  min-height: 500px;
}
.monthLabels{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5em 0;
}
.monthLabel{
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.85em;
  font-weight: 700;
  color: var(--gray);
  min-height: calc(500px / 12);
}
.monthLabel.current{
  color: var(--firstColor);
  background: var(--backgroundColor);
  padding: 0 0.5em;
  border-radius: 4px;
}
.productsColumn{
  flex: 1;
  display: flex;
  gap: 0.8em;
  overflow-x: auto;
}
.productColumn{
  flex: 0 0 60px;
  min-width: 60px;
  max-width: 60px;
  position: relative;
}
.monthCells{
  position: relative;
  width: 100%;
  height: 500px;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(100% / 12 - 1px),
    var(--backgroundColor) calc(100% / 12 - 1px),
    var(--backgroundColor) calc(100% / 12)
  );
  border-radius: 6px;
}

.mobileRangeBar{
  position: absolute;
  left: 0;
  right: 0;
  background: var(--mainColor);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: var(--transitionNormal);
  padding: 0.5em;
}
.mobileRangeBar.selected{
  background: var(--firstColor);
  cursor: default;
  pointer-events: none;
  opacity: 0.9;
}
.verticalText{
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 0.75em;
  font-weight: 700;
  color:var(--white);
  white-space: nowrap;
}
@media (min-width: 768px){
  .chartMobile{
    display: none;
  }
  .chartDesktop{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }
  .monthHeader{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    text-align: center;
    font-weight: 700;
    margin-bottom: 0.5em;
  }
  .monthHeaderCell{
    padding: 0.3em 0;
    color: var(--gray);
    font-size: 0.9em;
  }
  .highlightMonth{
    background: var(--backgroundColor);
    color: var(--firstColor);
  }
  .chartRow{
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .monthGrid{
    position: relative;
    flex: 1;
    height: 32px;
    background-image: repeating-linear-gradient(
      to right,
      transparent 0,
      transparent calc(100% / 12 - 1px),
      var(--backgroundColor) calc(100% / 12 - 1px),
      var(--backgroundColor) calc(100% / 12)
    );
    border-radius: var(--radiusNormal);
  }
  .rangeBar{
    position: absolute;
    top: 0;
    bottom: 0;
    background:var(--mainColor);
    border-radius: var(--radiusNormal);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85em;
    cursor: pointer;
    color:var(--white);
    font-weight: 700;
    transition: var(--transitionNormal);
  }
  .rangeBar.hovered{
    background: var(--firstColor);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .rangeBar.selected{
    background: var(--firstColor);
    cursor: default;
    pointer-events: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  }
}
</style>