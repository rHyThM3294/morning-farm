<template>
<section class="Summary">
  <FinanceDonut
    :net="financeStore.donut.net"
    :fee="financeStore.donut.fee"
    @net-animation-complete="handleNetComplete"
  />
  <div class="stat">
    <FinanceStatCard
      v-for="item in financeStore.stats"
      :key="item.id"
      :value="item.value"
      :title="item.title"
      :type="item.type"
      :delay="getCardDelay(item.id)"
    />
  </div>
</section>
</template>
<script setup>
import { ref } from 'vue'
import FinanceDonut from '@/components/finance/FinanceDonut.vue'
import FinanceStatCard from '@/components/finance/FinanceStatCard.vue'
import { useFinanceStore } from '@/stores/finance'
const financeStore = useFinanceStore()
const netAnimationComplete = ref(false)
function handleNetComplete(){
  netAnimationComplete.value = true
}
function getCardDelay(id){
  if (id >= 1 && id <= 4){
    return 0.5
  }
  if (id === 5){
    return 2.5
  }
  return 0
}
</script>
<style scoped>
.Summary{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  gap: 1em;
}   
.stat{
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
}
@media(width>=768px){
  .Summary{
    flex-flow: row nowrap;
  }
  .stat{
    justify-content: flex-start;
    align-items: center;
  }
}
</style>