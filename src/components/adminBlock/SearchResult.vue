<template>
  <div class="searchResult">
    <div class="allList">
      <div
        class="listCard"
        v-for="order in orders"
        :key="order.id"
        @click="$emit('selectOrder', order)"
      >
        <div class="listNumber">
          <p>訂單編號 {{ order.orderId }}</p>
        </div>
        <div class="listDetail">
            <div
            class="productPicture"
            :style="{ backgroundImage: `url(${baseUrl}image/chinese-pear.png)` }"
            ></div>
            <div class="listDetailBox">
              <div class="firstBox">
                <p class="productName">
                  {{ getMainItem(order)?.productName || '-' }}
                  <span v-if="order.items.length > 1">
                    ＋{{ order.items.length - 1 }} 項商品
                  </span>
                </p>
                <p class="listDate">{{ order.date }}</p>
                <p class="buyer">買家：{{ order.buyer }}</p>
              </div>
              <div class="secondBox">
                <div class="row1">
                  <div class="numberUnit">
                    <span class="numbers"></span>
                    <p class="unit">
                      {{ getMainItem(order)?.unit || '' }}
                    </p>
                  </div>
                  <p class="price">
                    NT$ {{ getMainItem(order)?.price ?? '-' }}
                  </p>
                </div>
                <div class="row2">
                  <p class="freight">運費：</p>
                  <p class="price">NT$ {{ order.freight }}</p>
                </div>
                <div class="row3">
                  <p class="additionalPrice">
                    NT$ {{ order.total }}
                  </p>
                </div>
                <div class="row4">
                  <button type="button" class="lookDetail">
                    查看詳情<i class="fa-solid fa-angles-right arrowLoop"></i>
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalPages > 1">
      <button
        class="pageButton"
        :disabled="currentPage === 1"
        @click="$emit('changePage', currentPage - 1)"
      >
        上一頁
      </button>
      <span class="pageInfo">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        class="pageButton"
        :disabled="currentPage === totalPages"
        @click="$emit('changePage', currentPage + 1)"
      >
        下一頁
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  },
  currentPage: Number,
  totalPages: Number
})
defineEmits(['selectOrder', 'changePage'])
const baseUrl = import.meta.env.BASE_URL
function getMainItem(order) {
  return order?.items?.[0] || null
}
function getTotalQuantity(order) {
  if (!order?.items?.length) return 0
  return order.items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  )
}
</script>
<style scoped>
.searchResult{
    width: 100%;
}
.allList{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin: 0;
    padding: 0;
}
.listCard{
    cursor: pointer;
    width: 100%;
    background-color: var(--white);
    border: 4px solid var(--secondColor);
    display: flex;
    flex-flow: column nowrap;
    gap: 0;
    transition: var(--transitionNormal);
}
.listNumber{
    background-color: var(--secondColor);
    color: var(--black);
    padding: 0.5em;
    text-align: center;
}
.listNumber p{
    font-size: 1em;
}
.productPicture{
    width: 100%;
    max-width: 300px;
    height:auto;
    min-height: 270px;           
    background-size: cover;    
    background-position: center;
    background-repeat: no-repeat;
    border-radius: var(--radiusNormal);
    overflow: hidden;
}
.listDetail{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 2em 1em 1em 1em;
}
.listDetailBox{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}
.firstBox{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5em;
}
.productName{
    font-size: 2em;
    color: var(--black);
}
.secondBox{
    width: 100%;
    text-align: right;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-end;
    gap: 0.5em;
}
.row1{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.row2{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
}
.row3{
    display: flex;
    justify-content: center;
    align-items: center;
}
.additionalPrice{
    color: var(--secondColor);
    font-size: 1.5em;
}
.row4{
    display: flex;
    justify-content: center;
    align-items: center;
}
.lookDetail{
    cursor: pointer;
    color: var(--addColor);
    background-color: transparent;
    border: 0;
}
.pagination{
  margin: 1em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
.pageButton{
  border: 0;
  padding: 0.5em 1em;
  border-radius: var(--radiusNormal);
  background-color: var(--backgroundColor);
  cursor: pointer;
  transition: var(--transitionNormal);
}
.pageButton:disabled{
  opacity: 0.4;
  cursor: not-allowed;
}
.pageInfo{
  font-size: 0.9em;
}
@keyframes arrowMoveLoop{
  0%{
    transform: translateX(0);
    opacity: 1;
  }
  50%{
    transform: translateX(6px);
    opacity: 1;
  }
  100%{
    transform: translateX(0);
    opacity: 1;
  }
}
@media(width>=768px){
    .listCard{
        &:hover .listDetail{
            background-color: var(--backgroundColor);
        }
    }
    .listCard:hover .arrowLoop {
      animation: arrowMoveLoop 0.8s ease-in-out infinite;
    }
    .listDetail{
        flex-flow: row nowrap;
    }
    .productName{
        font-size: 2.5em;
        font-weight: 700;
    }
    .listDate{
        font-size: 1.5em;
    }
    .buyer{
        font-size: 1.5em;
    }
    .pageButton:not(:disabled):hover {
      background-color: var(--mainColor);
      color: var(--white);
    }
}
</style>