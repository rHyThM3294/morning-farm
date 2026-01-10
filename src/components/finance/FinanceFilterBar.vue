<template>
  <section class="financeFilterBar" ref="filterBarRef">
    <div class="filterBlock">
      <div class="filter">
        <DataRangePicker
          :startDate="startDate"
          :endDate="endDate"
          @updateStart="$emit('updateStart', $event)"
          @updateEnd="$emit('updateEnd', $event)"
        />
        <KeywordSearch
          :keyword="keyword"
          @updateKeyword="$emit('updateKeyword', $event)"
        />
      </div>
      <ExportButton :records="filteredRecords" />
    </div>
    <div class="tableWrapper">
      <FinanceTable :records="paginatedRecords" />
    </div>
    <Page
      :totalPages="totalPages"
      v-model="currentPage"
      @pageChanged="handlePageChange"
    />
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'
import { financeTableRecords } from '@/stores/finance'
import DataRangePicker from './DataRangePicker.vue'
import KeywordSearch from './KeywordSearch.vue'
import ExportButton from './ExportButton.vue'
import FinanceTable from './FinanceTable.vue'
import Page from '@/components/common/Page.vue'
const props = defineProps({
  keyword: String,
  startDate: String,
  endDate: String
})
defineEmits(['updateKeyword', 'updateStart', 'updateEnd'])
const currentPage = ref(1)
const pageSize = 9
const filterBarRef = ref(null)
const filteredRecords = computed(() => {
  return financeTableRecords.filter(item => {
    const matchKeyword = props.keyword
      ? item.orderId.includes(props.keyword)
      : true
    const recordDate = new Date(item.date)
    const start = props.startDate ? new Date(props.startDate) : null
    const end = props.endDate ? new Date(props.endDate) : null
    const matchDate =
      (!start || recordDate >= start) &&
      (!end || recordDate <= end)
    return matchKeyword && matchDate
  })
})
const totalPages = computed(() => 
  Math.ceil(filteredRecords.value.length / pageSize) || 1
)
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredRecords.value.slice(start, start + pageSize)
})
function handlePageChange(page) {
  currentPage.value = page
  if (filterBarRef.value){
    const rect = filterBarRef.value.getBoundingClientRect()
    if (rect.top < 0) {
      filterBarRef.value.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }
}
</script>
<style scoped>
.financeFilterBar{
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  scroll-margin-top: 20px;
}
.tableWrapper{
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
.filterBlock{
  width: 100%;
  margin: 5em 0 0 0;
  padding: 1.5em 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  border-top: 8px solid var(--mainColor);
}
.filter{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1em;
}
@media(width >= 768px){
  .filterBlock {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .financeFilterBar {
    scroll-margin-top: 80px;
  }
  .filter{
    flex-flow: row nowrap;
  }
}
</style>