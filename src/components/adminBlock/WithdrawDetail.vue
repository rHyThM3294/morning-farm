<template>
  <div class="withdrawDetail">
    <div class="allDetail">
      <div class="withdrawDetailCard">
        <div class="orderMessage">
          <div class="title">
            <h6>訂單編號 {{ order.orderId }}</h6>
          </div>
          <div class="detailContainer">
            <div
              class="productPicture"
              :style="{ backgroundImage: `url(${imageUrl})` }"
            ></div>
            <div class="detailBox">
              <div class="allText">
                <h6 class="productName">
                  {{ order.items[0].productName }}
                </h6>
                <div class="text">
                  <label>
                    {{ isPending ? '截止' : '完成' }}時間：
                  </label>
                  <p>
                    {{ displayTime }}
                  </p>
                </div>
                <div class="text">
                  <label>退貨原因：</label>
                  <p>{{ order.returnInfo.reason }}</p>
                </div>
                <div class="text">
                  <label>處理方式：</label>
                  <p>{{ order.returnInfo.method }}</p>
                </div>
                <div class="text">
                  <label>運送地址：</label>
                  <p>{{ order.address }}</p>
                </div>
              </div>
              <div class="dealWith" v-if="isPending">
                <button type="button" @click="handleDeal">確定處理</button>
              </div>
            </div>
          </div>
        </div>
        <div class="buyerMessage">
          <div class="title">
            <p>買家資訊</p>  
          </div>
          <div class="detailContainer">
            <div class="allText">
                <div class="text">
                    <label>姓名：</label>
                    <p>{{ order.buyer }}</p>
                </div>
                <div class="text">
                    <label>電話：</label>
                    <p>{{ order.telephone || '—' }}</p>
                </div>
                <div class="text">
                    <label>手機：</label>
                    <p>{{ order.phone }}</p>
                </div>
                <div class="text">
                    <label>電子信箱：</label>
                    <p>{{ order.email }}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import { useToastStore } from '@/stores/toast'
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})
const router = useRouter()
const orderStore = useOrderStore()
const toast = useToastStore()
const emit = defineEmits(['done'])
const isPending = computed(() =>
  props.order.returnInfo.status === 'pending'
)
const displayTime = computed(() => {
  return isPending.value
    ? props.order.returnInfo.deadline
    : props.order.returnInfo.finishedTime
})
function goBack() {
  router.back()
}
const imageUrl = computed(() => {
  return new URL('/image/chinese-pear.png', import.meta.url).href
})
function handleDeal() {
  const ok = confirm('點擊確認後將由專人審核，確實退貨處理完畢方可結案。')
  if (!ok) return
  orderStore.finishReturn(props.order.orderId)
  toast.success('退貨處理完成')
  emit('done')
}
</script>
<style scoped>
    .withdrawDetail{
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }
    .allDetail{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 1.5em;
    }
    .withdrawDetailCard{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 0.5em;
    }
    .orderMessage{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 0;
        border: 4px solid var(--firstColor);
    }
    .title{
        width: 100%;
        padding: 0.4em 0;
        color: var(--black);
        background-color: var(--firstColor);
        text-align: center;
    }
    .detailContainer{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5em;
        overflow: hidden;
    }
    .productPicture{
      width: 100%;
      height: 300px;
      background-size: cover;
      background-position: right;
      background-repeat: no-repeat;
    }
    .detailBox{
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .allText{
        width: 100%;
        padding: 1em;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        gap: 0.4em;
    }
    .text{
        display: flex;
        align-items: center;
        gap: 0;
    }
    .dealWith{
        width: 100%;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dealWith button{
        cursor: pointer;
        padding: 0.5em 1.5em;
        color: var(--black);
        background-color: var(--backgroundColor);
        border: 0;
        border-radius: var(--radiusNormal);
        transition: var(--transitionNormal);
    }
    .buyerMessage{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        gap: 0;
        border: 4px solid var(--firstColor);
    }
    .back{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .back button{
        cursor: pointer;
        color: var(--black);
        background-color: var(--backgroundColor);
        padding: 0.5em 1.5em;
        border: 0;
        border-radius: var(--radiusLarge);
        transition: var(--transitionNormal);
    }
    @media(width>=768px){
        .productPicture{
          max-width: 350px;
        }
        .withdrawDetail button:hover{
            color: var(--white);
            background-color: var(--mainColor);
        }
        .detailContainer{
            flex-flow: row nowrap;
        }
    }
</style>