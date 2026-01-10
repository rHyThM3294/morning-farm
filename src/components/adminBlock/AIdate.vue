<template>
  <div v-show="visible" class="aiDateOverlay" @click.self="closePanel">
    <div class="aiDatePanel" ref="panelRef">
      <div class="aiDateHeader">
        <h5>行事曆任務助手</h5>
        <button class="closeButton" @click="closePanel">✕</button>
      </div>
      <div class="aiDateContent">
        <div class="calendarBlock">
          <div class="calendarHeader">
            <button @click="goPrevMonth">‹</button>
            <h6>{{ currentMonthLabel }}</h6>
            <button @click="goNextMonth">›</button>
          </div>
          <div class="calendarGrid">
            <div class="weekLabel" v-for="w in ['日','一','二','三','四','五','六']" :key="w">
              {{ w }}
            </div>
            <div
                v-for="(cell, i) in calendarCells"
                :key="i"
                class="calendarCell"
                :class="{
                  active: cell?.date === selectedDate,
                  today: cell?.isToday,
                  past: cell?.isPast
                }"
                @click="selectDate(cell)"
              >
              <template v-if="cell">
                <span class="dateNumber">{{ cell.date }}</span>
                <div v-if="cell.tasks.length" class="taskDot">{{ cell.tasks.length }}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="taskList">
          <h6>📌 {{ currentMonthLabel }} / {{ displaySelectedDate }}</h6>
          <div v-if="!selectedTasks.length" class="noTask">
            今日沒有待辦事項
          </div>
          <div
            v-for="(task, i) in selectedTasks"
            :key="i"
            class="taskItem"
          >
            {{ task }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, computed } from 'vue'
import { gsap } from 'gsap'
import { useTaskStore } from '@/stores/useTaskStore'
const taskStore = useTaskStore()
const props = defineProps({
  visible: Boolean,
  originRect: Object
})
const emit = defineEmits(['close'])
const panelRef = ref(null)
const displaySelectedDate = computed(() => padZero(selectedDate.value))
watch(() => props.visible, async (val) => {
  if (!val) return
  await nextTick()
  if (!panelRef.value || !props.originRect) return
  const { x, y, width, height } = props.originRect
  gsap.set(panelRef.value, {
    clearProps: 'all'  // 🔑 每次打開先清空舊 transform
  })
  gsap.set(panelRef.value, {
    x: x + width / 2,
    y: y + height / 2,
    scale: 0.2,
    opacity: 0
  })
  gsap.to(panelRef.value, {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 0.45,
    ease: 'power3.out'
  })
})
function closePanel() {
  if (!panelRef.value) {
    emit('close')
    return
  }
  const { x, y, width, height } = props.originRect

  gsap.to(panelRef.value, {
    x: x + width / 2,
    y: y + height / 2,
    scale: 0.2,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete() {
      gsap.set(panelRef.value, { clearProps: 'all' })
      emit('close')
    }
  })
}
function padZero(num) {
  return String(num).padStart(2, '0')
}
const today = new Date()
const todayKey = `${today.getFullYear()}-${padZero(today.getMonth()+1)}-${padZero(today.getDate())}`
const currentYear = ref(today.getFullYear())
const currentMonthIndex = ref(today.getMonth())
const selectedDate = ref(today.getDate())
const displayMonth = computed(() => padZero(currentMonthIndex.value + 1))
const currentMonthLabel = computed(() =>
  `${currentYear.value} / ${displayMonth.value}`
)
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonthIndex.value + 1, 0).getDate()
})
const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonthIndex.value, 1).getDay()
})
const calendarCells = computed(() => {
  const cells = []
  const total = daysInMonth.value + firstDayOffset.value
  for (let i = 0; i < total; i++) {
    if (i < firstDayOffset.value) {
      cells.push(null)
    } else {
      const date = i - firstDayOffset.value + 1
      const key = `${currentYear.value}-${padZero(currentMonthIndex.value + 1)}-${padZero(date)}`
      cells.push({
        date,
        key,
        tasks: taskStore.tasks[key] || [],
        isToday: key === todayKey,
        isPast: new Date(key) < new Date(todayKey)
      })
    }
  }
  return cells
})
const selectedTasks = computed(() => {
  const key = `${currentYear.value}-${padZero(currentMonthIndex.value + 1)}-${padZero(selectedDate.value)}`
  return taskStore.tasks[key] || []
})
function selectDate(cell){
  if (!cell) return
  selectedDate.value = cell.date
}
function goPrevMonth(){
  if (currentMonthIndex.value === 0){
    currentMonthIndex.value = 11
    currentYear.value--
  } else {
    currentMonthIndex.value--
  }
}
function goNextMonth(){
  if (currentMonthIndex.value === 11){
    currentMonthIndex.value = 0
    currentYear.value++
  } else{
    currentMonthIndex.value++
  }
}
</script>
<style scoped>
.aiDateOverlay{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1em;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.aiDatePanel{
  width: 100%;
  background:var(--white);
  border-radius: 1em;
  margin: 4em 0 0 0;
  padding: 1em;
}

@keyframes fadeUp{
  from { opacity: 0; transform: translateY(40px) }
  to { opacity: 1; transform: translateY(0) }
}
.aiDateHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.closeButton{
  width: 3em;
  height: 3em;
  background-color: var(--backgroundColor);
  color: var(--black);
  font-size: 1em;
  border: 0;
  border-radius: 50%;
  transition: var(--transitionNormal);
}
.calendarHeader button{
  padding: 1em;
  border: 0;
  color: var(--black);
  background-color: var(--backgroundColor);
  transition: var(--transitionNormal);
}
.aiDateContent{
  margin-top: 1em;
}
.calendarGrid{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  gap: 0.5em;
}
.calendarDay{
  background:var(--white);
  padding: 0.5em;
  border-radius: 0.5em;
  position: relative;
}
.taskBadge{
  position: absolute;
  right: 0.3em;
  top: 0.3em;
  background:var(--secondColor);
  color:var(--white);
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  font-size: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.taskList{
  margin-top: 1em;
}
.taskItem{
  background:var(--backgroundColor);
  padding: 0.6em;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
}
.calendarHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weekLabel{
  text-align: center;
  font-size: 0.8em;
  color: #888;
}
.calendarCell{
  cursor: pointer;
  min-height: 60px;
  background: #f2f2f2;
  border-radius: .5em;
  padding: .3em;
  position: relative;
  transition: var(--transitionNormal);
}
.calendarCell.today{
  border: 2px solid var(--mainColor);
}
.calendarCell.past{
  opacity: 0.4;
}
.calendarCell.active{
  background: var(--mainColor);
}
.dateNumber{
  font-weight: 600;
}
.taskDot{
  position: absolute;
  right: 0.3em;
  bottom: .3em;
  background:var(--secondColor);
  color: var(--white);
  border-radius: 50%;
  font-size: .7em;
  width: 1.2em;
  height: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noTask{
  color: #aaa;
  padding: 1em;
}
@media(width>=768px){
  .closeButton{
    cursor: pointer;
    &:hover{
      color: var(--white);
      background-color: var(--mainColor);
    }
  }
  .calendarHeader button{
    cursor: pointer;
    &:hover{
      color: var(--white);
      background-color: var(--mainColor);
    }
  }
  .aiDatePanel {
    max-width: 1000px;
    margin: 1em 0 0 250px;
  }
  .calendarCell:hover{
    background-color: var(--backgroundColor);
  }
}
</style>
