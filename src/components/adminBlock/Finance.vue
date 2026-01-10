<template>
  <section class="finance">
    <FinanceSummary/>
    <FinanceFilterBar
      :keyword="keyword"
      :startDate="startDate"
      :endDate="endDate"
      @updateKeyword="v => keyword = v"
      @updateStart="v => startDate = v"
      @updateEnd="v => endDate = v"
    />
  </section>
</template>
<script setup>
import { ref } from 'vue'
import FinanceSummary from '../finance/FinanceSummary.vue'
import FinanceFilterBar from '../finance/FinanceFilterBar.vue'
const keyword = ref('')
const startDate = ref('')
const endDate = ref('')
const records = ref([])
</script>
<style scoped>
*{box-sizing: border-box;}
.finance{
    width: 100%;
    max-width: 100vw;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0;
    overflow-x: hidden;
}
@media(width>=768px){
    .finance{
        max-width: 1200px;
        margin: 2em 0 0 0;
        padding: 0 0 0 200px;
    }
}
</style>