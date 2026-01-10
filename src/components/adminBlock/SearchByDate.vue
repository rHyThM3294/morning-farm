<template>
  <div
    class="searchByDate"
    @keydown.enter="handleEnter"
  >
    <div class="rowOne">
      <label>選擇日期區間（最多一個月）</label>
      <div class="selectDate">
        <DateRangePicker
          :maxRange="31"
          @update="handleDateRange"
        />
      </div>
    </div>
    <div class="rowTwo">
      <button
        type="button"
        class="enterDate"
        :disabled="!isValidRange"
        @click="submitSearch"
      >
        查詢
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import DateRangePicker from '../common/DateRangePicker.vue'
const emit = defineEmits(['search'])
const startDate = ref(null)
const endDate = ref(null)
function handleEnter() {
  if (!isValidRange.value) return
  submitSearch()
}
function handleDateRange({ start, end }) {
  startDate.value = start
  endDate.value = end
}
const isValidRange = computed(() => {
  return !!(startDate.value && endDate.value)
})
function submitSearch() {
  emit('search', {
    type: 'date',
    start: startDate.value,
    end: endDate.value
  })
}
</script>
<style scoped>
.searchByDate{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
}
.selectDate{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.rowTwo{
    display: flex;
    justify-content: center;
    align-items: center;
}
.enterDate{
    cursor: pointer;
    background-color: var(--backgroundColor);
    color: var(--black);
    border: 0;
    width: 150px;
    padding: 1em;
    margin: 1.5em 0;
    border-radius: var(--radiusNormal);
    transition: var(--transitionNormal);
}
@media(width>=768px){
    .selectDate{
        flex-flow: row nowrap;
    }
    .enterDate:hover{
        color: var(--white);
        background-color: var(--mainColor);
    }
}
</style>