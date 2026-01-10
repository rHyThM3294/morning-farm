<template>
  <div class="checkOrder">
    <div class="searchOrder">
      <h2>查詢訂單</h2>
      <OrderSearchToggle
        :activeType="searchType"
        @change="searchType = $event"
      />
      <SearchByNumber
        v-if="searchType === 'orderId'"
        @search="handleSearch"
      />
      <SearchByDate
        v-else
        @search="handleSearch"
      />
    </div>
    <div class="orderResult" v-show="searched">
      <OrderStatusFilter
        v-if="!selectedOrderId"
        v-model="selectedStatus"
      />
      <SearchResult
        v-if="!selectedOrderId"
        :orders="pagedOrders"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="currentPage = $event"
        @selectOrder="handleSelectOrder"
      />
      <OrderDetail
        v-else
        :order="selectedOrder"
        @back="selectedOrderId = null"
        @mounted="handleOrderDetailMounted"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useOrderStore } from '@/stores/order'
import OrderSearchToggle from './OrderSearchToggle.vue'
import OrderStatusFilter from './OrderStatusFilter.vue'
import SearchResult from './SearchResult.vue'
import SearchByNumber from './SearchByNumber.vue'
import SearchByDate from './SearchByDate.vue'
import OrderDetail from './OrderDetail.vue'
const searchType = ref('orderId')
const searched = ref(false)
const selectedStatus = ref('all')
const orderStore = useOrderStore()
const currentPage = ref(1)
const pageSize = 10
const selectedOrderId = ref(null)
const emit = defineEmits(['scroll-to-order-detail'])
const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orderStore.searchResult
  }
  return orderStore.searchResult.filter(
    o => o.status === selectedStatus.value
  )
})
const selectedOrder = computed(() => {
  if (!selectedOrderId.value) return null
  return orderStore.orders.find(
    o => o.orderId === selectedOrderId.value
  )
})
const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / pageSize)
)
const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredOrders.value.slice(start, start + pageSize)
})
function handleSearch(params){
  searched.value = true
  selectedOrderId.value = null 
  currentPage.value = 1
  orderStore.searchOrders(params)
}
function handleSelectOrder(order){
  selectedOrderId.value = order.orderId
}
watch(selectedStatus, () => {
  currentPage.value = 1
})
function handleOrderDetailMounted(el){
  nextTick(() => {
    emit('scroll-to-order-detail', el)
  })
}
</script>
<style scoped>
.checkOrder{
  width: 100%;
}
@media(width>=768px){
  .checkOrder{
    max-width: 1250px;
    padding: 1em 1em 1em 200px;
  }
}
</style>