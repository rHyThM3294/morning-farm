<template>
  <div class="searchList">
    <h5>訂單查詢</h5>
    <div class="allList">
      <div 
        class="listBox"
        v-for="order in orders"
        :key="order.number"
        @click="$emit('openOrderDetail', order)"
      >
        <div class="listState"><p>{{ order.state }}</p></div>
        <div class="photo"><img src="/image/chinese-pear.png" /></div>
        <div class="buyTime"><p>購買時間</p><p>{{ order.time }}</p></div>
        <div class="listNumber"><p>訂單編號</p><p>{{ order.number }}</p></div>
        <div class="price"><p>訂單金額</p><p>NT${{ order.price }}</p></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineEmits(["openOrderDetail"]);
const orders = [
  {
    state: "已完成",
    time: "2025/10/14",
    number: "1234567890",
    price: 1500
  },
  {
    state: "已完成",
    time: "2025/10/15",
    number: "9876543210",
    price: 1200
  },
  {
    state: "已取消",
    time: "2025/10/16",
    number: "5556667777",
    price: 900
  }
];
</script>
<style scoped>
.searchList{
  display: flex;
  flex-flow: column nowrap;
  gap: 2em;
  max-width: 1000px;
}
.searchList h5{
  border-bottom: 1px solid var(--black);
}
.allList{
  display: flex;
  flex-flow:column nowrap;
  gap:1em;
}
.listBox{
  cursor: pointer;
  border-bottom: 1px solid var(--black);
  padding: 1em;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5em;
  transition: var(--transitionNormal);
}
.listState{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
}
.listState p{
  color: var(--firstColor);
}
.photo{
  width: 120px;
  height: 133px;
  overflow: hidden;
  position: relative;
}
.photo img{
  width: 200%;
  position: absolute;
  top: 50%;
  left:20%;
  transform: translate(-50%, -50%);
}
.buyTime,.listNumber,.price{
  display: flex;
  flex-flow: row nowrap;
  gap: 1em;
}
@media (width>=768px){
  .listBox{
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    gap: 0.5em;
    &:hover{
      background-color: var(--backgroundColor);
    }
  }
  .buyTime,.listNumber,.price{
    flex-flow: column nowrap;
    gap: 0.5em;
  }
}
</style>