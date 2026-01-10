<template>
  <div class="dateRangePicker">
    <div class="header">
      <button @click="prevMonth">‹</button>
      <span>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span>
      <button @click="nextMonth">›</button>
    </div>
    <div class="week">
      <span v-for="w in weeks" :key="w">{{ w }}</span>
    </div>
    <div class="days">
      <span
        v-for="d in blanks"
        :key="'b' + d"
        class="blank"
      ></span>
      <button
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="dayClass(day)"
        :disabled="dayClass(day).disabled"
        @click="selectDate(day)"
      >
        {{ day }}
      </button>
    </div>
    <p class="result">
      起：{{ startDateText || '-' }}<br />
      迄：{{ endDateText || '-' }}
    </p>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useToastStore } from '@/stores/toast'
const props = defineProps({
  maxRange: {
    type: Number,
    default: 30,
  }
})
const emit = defineEmits(['update'])
const toast = useToastStore()
const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())
const startDate = ref(null)
const endDate = ref(null)
const todayDate = new Date()
todayDate.setHours(0, 0, 0, 0)
function isFuture(date){
  return date > todayDate
}
const weeks = ['日', '一', '二', '三', '四', '五', '六']
const daysInMonth = computed(() =>
  new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
)
const blanks = computed(() => {
  const firstDay = new Date(
    currentYear.value,
    currentMonth.value,
    1
  ).getDay()
  return Array(firstDay).fill(0)
})
const startDateText = computed(() =>
  startDate.value ? formatDate(startDate.value) : ''
)
const endDateText = computed(() =>
  endDate.value ? formatDate(endDate.value) : ''
)
function selectDate(day){
  const clicked = new Date(currentYear.value, currentMonth.value, day)
  clicked.setHours(0, 0, 0, 0)
  if (!startDate.value) {
    if (isFuture(clicked)) return
    startDate.value = clicked
    endDate.value = null
    return
  }
  if (!endDate.value){
    const diff =
      Math.abs(clicked - startDate.value) / (1000 * 60 * 60 * 24)
    if (diff > props.maxRange){
        toast.error(`最多只能選 ${props.maxRange} 天`)
        return
    }
    if (clicked < startDate.value){
      endDate.value = startDate.value
      startDate.value = clicked
    } else {
      endDate.value = clicked
    }
    return
  }
  if (isFuture(clicked)) return
  startDate.value = clicked
  endDate.value = null
}
function dayClass(day) {
  const date = new Date(currentYear.value, currentMonth.value, day)
  date.setHours(0, 0, 0, 0)
  const isStartDisabled =
    !startDate.value && isFuture(date)
  const isResetStartDisabled =
    startDate.value && endDate.value && isFuture(date)
  return {
    start: isSame(date, startDate.value),
    end: isSame(date, endDate.value),
    inRange:
      startDate.value &&
      endDate.value &&
      date > startDate.value &&
      date < endDate.value,
    disabled: isStartDisabled || isResetStartDisabled
  }
}
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
function formatDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function isSame(a, b) {
  if (!a || !b) return false
  return a.toDateString() === b.toDateString()
}
watch([startDate, endDate], () => {
  emit('update', {
    start: startDate.value,
    end: endDate.value
  })
})
</script>
<style scoped>
.dateRangePicker{
  width: 100%;
  font-size: 16px;
}
.calendarCard{
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.header button{
  cursor: pointer;
  border: 0;
  border-radius: var(--radiusNormal);
  font-size: 24px;
  padding: 6px 12px;
  color: var(--black);
  background-color: var(--backgroundColor);
  transition: var(--transitionNormal);
}
.week,.days{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.week{
  font-weight: 600;
  margin-bottom: 6px;
}
.day{
  min-height: 44px;
  margin: 2px;
  border-radius: var(--radiusNormal);
  font-size: 16px;
  cursor: pointer;
  transition: var(--transitionNormal);
}
.day.start,.day.end{
  background:var(--addColor);
  color:var(--white);
}
.day.inRange {
  background-color: var(--addColor);
  opacity: 0.6;
}
.day.disabled {
  background: #f3f3f3;
  color: #aaa;
  cursor: not-allowed;
}
.blank{
  height: 44px;
}
.result{
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}
@media(width>=768px){
  .dateRangePicker{
    max-width: 280px;
    font-size: 14px;
  }
  .calendarCard{
    padding: 12px;
  }
  .header button:hover{
    background-color: var(--mainColor);
    color: var(--white);
  }
  .day{
    min-height: 36px;
    font-size: 14px;
    border-radius: 6px;
    &:not(:disabled):hover{
        background-color: var(--addColor);
    } 
  }
  .blank{
    height: 36px;
  }
  .result{
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
