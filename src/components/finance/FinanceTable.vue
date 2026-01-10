<template>
<div class="financeTable">
  <div class="tableScroll">
    <div class="tableHeader">
      <span>訂單編號</span>
      <span>金額</span>
      <span>付款方式</span>
      <span>狀態</span>
      <span>運費</span>
      <span>淨收入</span>
      <span>日期</span>
      <span>時間</span>
    </div>
    <p v-if="records.length === 0" class="empty">目前沒有資料</p>
    <div
      v-for="item in records"
      :key="item.orderId"
      class="rowCard"
      :class="{ active: item.orderId === activeId }"
      @click="activeId = item.orderId"
    >
        <div class="cell">{{ item.orderId }}</div>
        <div class="cell">${{ item.amount }}</div>
        <div class="cell">{{ item.paymentMethod }}</div>
        <div class="cell" :class="statusClass(item.status)">{{ item.status }}</div>
        <div class="cell">${{ item.shipping }}</div>
        <div class="cell">${{ item.netIncome }}</div>
        <div class="cell">{{ item.date }}</div>
        <div class="cell">{{ item.time }}</div>
    </div>
  </div>
  <div class="scrollHint">
    <span class="hintArrow">⇆</span>
    <span class="hintText">左右滑動查看更多欄位</span>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
  records: { type: Array, default: () => [] }
})
const activeId = ref(null)
function statusClass(status) {
  return {
    success: status === '成功',
    fail: status === '失敗',
    refund: status === '退款'
  }
}
</script>
<style scoped>
.financeTable{
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  overflow: hidden;
}
.tableScroll{
  width: 100%;
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;
}
.tableHeader,.rowCard{
  display: grid;
  grid-template-columns: repeat(8, minmax(100px, 1fr));
  align-items: center;
  min-width: 800px;
}
.tableHeader{
  background: var(--backgroundColor);
  padding: 0.75em 1em;
  font-weight: 600;
  border-bottom: 2px solid var(--firstColor);
  position: sticky;
  top: 0;
  z-index: 2;
}
.tableHeader span:first-child,
.rowCard .cell:first-child{
  position: sticky;
  left: 0;
  z-index: 3;
}
.tableHeader span:first-child{
    background-color: var(--backgroundColor);
}
.rowCard .cell:first-child{
    background-color:var(--white);
}
.rowCard{
  cursor: pointer;
  padding: 0.75em 1em;
  background-color: var(--white);
  border-bottom: 1px solid var(--white);
  transition: var(--transitionNormal);
}
.rowCard:hover{
  background-color: var(--backgroundColor);
}
.rowCard.active{
  background-color: var(--firstColor);
  color: var(--white);
}
.rowCard.active .cell:first-child{
  background-color: var(--firstColor);
}
.cell{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25em;
}
.success{ color: var(--addColor); font-weight: 600; }
.fail{ color: var(--warningColor); font-weight: 600; }
.refund{ color: var(--firstColor); font-weight: 600; }
.empty{
  text-align: center;
  padding: 2em;
  color: var(--gray);
}
.scrollHint{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.5em;
  padding: 0.5em;
  font-size: 12px;
  color: #888;
  animation: hintFade 2s infinite;
}
.hintArrow{
  animation: slideHint 1.5s infinite;
  font-size: 16px;
}
@keyframes slideHint{
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}
@keyframes hintFade{
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@media(width >= 768px){
  .tableScroll{
    overflow-x: visible;
  }
  .tableHeader,.rowCard{
    grid-template-columns: repeat(8, 1fr); 
    min-width: auto; 
  }
  .scrollHint{
    display: none;
  }
  .tableHeader span:first-child,.rowCard .cell:first-child {
    position: static;
    box-shadow: none;
  }
}
</style>