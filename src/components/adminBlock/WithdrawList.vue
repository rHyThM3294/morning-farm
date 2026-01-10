<template>
  <div class="withdrawList">
    <div class="listHeader">
      <span>訂單編號</span>
      <span>{{ status === 'pending' ? '截止時間' : '處理完成時間' }}</span>
      <span>原因</span>
      <span>處理方式</span>
    </div>
    <p v-if="orders.length === 0" class="empty">
      {{ status === 'pending' ? '目前沒有待退訂單' : '目前沒有已退訂單' }}
    </p>
        <div
            v-for="order in orders"
            :key="order.orderId"
            class="orderCard"
            :class="{ active: order.orderId === activeId }"
            @click="$emit('select', order)"
        >
      <div class="orderText">
        <p class="label">訂單編號</p>
        <p class="orderNumber">{{ order.orderId }}</p>
      </div>
      <div class="orderText">
        <p class="label">
          {{ status === 'pending' ? '截止時間' : '完成時間' }}
        </p>
        <p class="orderTime">
          {{ status === 'pending'
            ? order.returnInfo.deadline
            : order.returnInfo.finishedTime
          }}
        </p>
      </div>
      <div class="orderText">
        <p class="label">退換原因</p>
        <p class="because">{{ order.returnInfo.reason }}</p>
      </div>
      <div class="orderText">
        <p class="label">處理方式</p>
        <p class="method">{{ order.returnInfo.method }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  status: String,
  orders: Array,
  activeId: String
})
const emit = defineEmits(['select'])
</script>
<style scoped>
.withdrawList{
  display: flex;
  flex-direction: column;
}
.listHeader{
  display: none;
}
.orderCard{
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  border: 3px solid var(--firstColor);
  padding: 1em;
  transition: var(--transitionNormal);
}
.orderCard.active{
  background-color: var(--backgroundColor);
}
.orderText{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.empty{
  color: #888;
  padding: 24px 0;
  text-align: center;
}
@media (width >= 768px){
  .listHeader{
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1.5fr;
    padding: 0.75em 1em;
    font-weight: 600;
    border-bottom: 2px solid var(--firstColor);
  }
  .orderCard{
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1.5fr;
    align-items: center;
    border: none;
    border-bottom: 1px solid #ddd;
    padding: 0.75em 1em;
  }
  .orderCard:hover{
    background-color: var(--backgroundColor);
  }
  .orderCard.active{
    background-color: var(--firstColor);
    color: var(--white);
  }
  .label{
    display: none;
  }
  .orderText{
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25em;
  }
}
</style>