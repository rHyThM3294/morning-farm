<template>
  <div class="withdraw">
    <WithdrawToggle v-model="activeStatus" />
    <WithdrawList
      :status="activeStatus"
      :orders="activeStatus === 'pending' ? pendingOrders : doneOrders"
      :activeId="selectedOrder?.orderId"
      @select="handleSelectOrder"
    />
    <div ref="detailBlock">
      <WithdrawDetail
        v-if="selectedOrder"
        :order="selectedOrder"
        @done="handleFinish"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useOrderStore } from '@/stores/order'
import WithdrawToggle from './WithdrawToggle.vue'
import WithdrawList from './WithdrawList.vue'
import WithdrawDetail from './WithdrawDetail.vue'
const activeStatus = ref('pending')
const selectedOrder = ref(null)
const detailBlock = ref(null)
const orderStore = useOrderStore()
const orders = computed(() => orderStore.orders)
const returnOrders = computed(() =>
  orders.value.filter(o => o.returnInfo)
)
const pendingOrders = computed(() =>
  returnOrders.value.filter(o => o.returnInfo.status === 'pending')
)
const doneOrders = computed(() =>
  returnOrders.value.filter(o => o.returnInfo.status === 'done')
)
async function handleSelectOrder(order) {
  selectedOrder.value = order
  await nextTick()
  detailBlock.value.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}
watch(activeStatus, () => {
  selectedOrder.value = null
})
function handleFinish() {
  selectedOrder.value = null
  activeStatus.value = 'done'
}
</script>
<style scoped>
.withdraw{
  width: 90%;
  margin: auto;
  position: relative;
}
@media(width>=768px){
  .withdraw{
    width: 100%;
    max-width: 1200px;
    padding: 2em 0 2em 200px;
  }
}
</style>
