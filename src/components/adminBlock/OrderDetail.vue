<template>
  <div class="orderDetail" ref="orderDetailRef">
    <button
      type="button"
      class="backToSearchResult"
      @click="emit('back')"
    >
      返回搜尋結果
    </button>
    <div class="allOrderDetailBox">
      <div class="box1">
        <div class="boxTitle">
          <p>訂單編號 {{ order.orderId }}</p>
        </div>
        <div class="boxContainer">
          <div class="informationLeft">
            <p class="left">接單時間</p>
            <p class="right">{{ formatDate(order.date) }}</p>
          </div>
          <div class="informationLeft">
            <p class="left">買家</p>
            <p class="right">{{ order.buyer }}</p>
          </div>
          <div
            class="productGroup"
            v-for="item in order.items"
            :key="item.productId"
          >
            <div class="informationLeft">
              <p class="left">商品名稱</p>
              <p class="right">{{ item.productName }}</p>
            </div>
            <div class="informationLeft">
              <p class="left">數量</p>
              <p class="right">{{ item.quantity }}</p>
            </div>
            <div class="informationLeft">
              <p class="left">商品小計</p>
              <p class="right">NT${{ item.price * item.quantity }}</p>
            </div>
          </div>
          <div class="informationLeft">
                <p class="left">訂單管理</p>
                <button
                  type="button"
                  class="cancel"
                  :class="{ disabled: order.status === 'cancelled' }"
                  @click="handleCancelOrder"
                  :disabled="order.status === 'cancelled'"
                >
                  {{ order.status === 'cancelled' ? '已取消' : '取消訂單' }}
                </button>
          </div>
          <div class="informationRight">
            <p>
              商品共{{ order.items.length }}項，
              <span>{{ totalQuantity }}件</span>
            </p>
            <p>NT${{ itemsTotal }}</p>
          </div>
          <div class="informationRight">
            <p class="send">({{ order.payMethod }})</p>
            <p>運費 NT${{ order.freight }}</p>
          </div>
          <div class="total">
            <h6>合計 NT${{ order.total }}</h6>
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="boxTitle">
          <p>運送方式：{{ order.shippingMethod }}</p>
        </div>
        <div class="boxContainer">
          <div class="buyer">
            <p>收件人：{{ order.buyer }}</p>
          </div>
          <div class="cellphone">
            <p>手機號碼：{{ order.phone }}</p>
          </div>
          <div class="address">
            <p>地址：{{ order.address }}</p>
          </div>
          <div class="status">
            <p>訂單狀態：{{ statusText }}</p>
          </div>
          <div class="finish" v-if="finishInfo.show">
            <p>
              <span>{{ finishInfo.label }}時間：</span>
              {{ formatDate(finishInfo.time) }}
            </p>
          </div>
        <div class="orderProcess">
            <ul class="mfTimeline">
                <li
                v-for="(step, idx) in orderTimeline"
                :key="step.key"
                class="mfStep"
                :class="{
                    'is-done': step.state === 'done',
                    'is-current': step.state === 'current',
                    'is-pending': step.state === 'pending'
                }"
                >
                <div class="mfTime">
                    {{ step.time ? formatDate(step.time) : '----' }}
                </div>
                <div class="mfAxis">
                    <span class="mfDot"></span>
                    <span
                    v-if="idx < orderTimeline.length - 1"
                    class="mfConnector"
                    ></span>
                </div>
                <div class="mfLabel">
                    {{ step.label }}
                </div>
                </li>
            </ul>
        </div> 
        </div>
      </div>
      <div class="box3">
        <div class="boxTitle">
          <p>付款方式：{{ order.payMethod }}</p>
        </div>
        <div class="boxContainer">
          <div class="payMuch">
            <p>應付金額 NT$ {{ order.total }}</p>
          </div>
          <div class="payStatus">
            <p>付款狀態：{{ order.isPaid ? '已付款' : '尚未付款' }}</p>
          </div>
          <div class="payTime">
            <p>
              付款時間：
              {{ order.payTime ? formatDate(order.payTime) : '----' }}
            </p>
          </div>
          <div class="payProcess">
            <ul class="mfTimeline">
                <li
                v-for="(step, idx) in payTimeline"
                :key="step.key"
                class="mfStep"
                :class="{
                    'is-done': step.state === 'done',
                    'is-current': step.state === 'current',
                    'is-pending': step.state === 'pending'
                }"
                >
                <div class="mfTime">
                    {{ step.time ? formatDate(step.time) : '----' }}
                </div>
                <div class="mfAxis">
                    <span class="mfDot"></span>
                    <span
                    v-if="idx < payTimeline.length - 1"
                    class="mfConnector"
                    ></span>
                </div>
                <div class="mfLabel">
                    {{ step.label }}
                </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="boxTitle">
          <p>買家資訊</p>
        </div>
        <div class="boxContainer">
          <div class="buyerName">
            <p>買家姓名：{{ order.buyer }}</p>
          </div>
          <div class="telephone">
            <p>買家電話：{{ order.telephone || order.phone }}</p>
          </div>
          <div class="cellphone">
            <p>買家手機：{{ order.phone }}</p>
          </div>
          <div class="email">
            <p>買家電子信箱：{{ order.email }}</p>
          </div>
        </div>
      </div>
      <div class="box5">
        <div class="boxTitle">
          <p>備註</p>
        </div>
        <div class="boxContainer">
          {{ order.remark || '此買家什麼都沒留' }}
        </div>
      </div>
    </div>
    <button
      type="button"
      class="backToSearchResult"
      @click="emit('back')"
    >
      返回搜尋結果
    </button>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import { useToastStore } from '@/stores/toast'
const orderDetailRef = ref(null)
const orderStore = useOrderStore()
const toast = useToastStore()
const emit = defineEmits(['back', 'mounted'])
onMounted(() => {
  emit('mounted', orderDetailRef.value)
})
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})
function handleCancelOrder() {
  const confirmed = window.confirm(
    `確定要取消訂單 ${props.order.orderId} 嗎？\n取消後將無法復原。`
  )
  if (!confirmed) return
  const success = orderStore.cancelOrder(props.order.orderId)
  if (success){
    toast.success('訂單已成功取消')
  } else{
    toast.error('取消訂單失敗，請稍後再試')
  }
}
const totalQuantity = computed(() =>
  (props.order.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0)
)
const itemsTotal = computed(() =>
  (props.order.items || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
    0
  )
)
const statusMap = {
  unpaid: '未付款',
  toShip: '待出貨',
  delivered: '已配達',
  returned: '退貨',
  pickedUp: '已取件',
  abnormal: '異常',
  cancelled: '已取消',
}
const statusText = computed(() => statusMap[props.order.status] || props.order.status || '')
const finishInfo = computed(() => {
  const st = props.order.status
  if (st === 'cancelled') {
    return { show: true, label: '取消', time: props.order.cancelTime || props.order.date }
  }
  if (st === 'delivered' || st === 'pickedUp') {
    return { show: true, label: '完成', time: props.order.finishTime || props.order.payTime || props.order.date }
  }
  return { show: false }
})
const isSelfPick = computed(() => props.order.shippingMethod === '現場自取')
const orderFlowLabels = computed(() => {
  return isSelfPick.value
    ? ['訂單成立', '已接單', '已取件', '完成訂單']
    : ['訂單成立', '已接單', '寄出', '已配達', '已取件', '完成訂單']
})
const orderProgressIndex = computed(() => {
  const st = props.order.status
  if (st === 'unpaid') return 0
  if (st === 'toShip') return 1
  if (st === 'cancelled') return 1
  if (isSelfPick.value) {
    if (st === 'pickedUp' || st === 'delivered') return 3 
    return 1
  }
  if (st === 'delivered') return 3
  if (st === 'pickedUp') return 5 
  if (st === 'returned' || st === 'abnormal') return 3 
  return 1
})
function parseYMDLocal(ymd) {
  if (!ymd) return null
  if (ymd instanceof Date) return ymd
  if (typeof ymd === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(ymd)) {
    const [y, m, d] = ymd.split('-').map(Number)
    return new Date(y, m - 1, d, 0, 0, 0)
  }
  return new Date(ymd)
}
function addHours(baseDate, hours) {
  const d = new Date(baseDate.getTime())
  d.setHours(d.getHours() + hours)
  return d
}
const orderTimeline = computed(() => {
  const labels = orderFlowLabels.value
  const idxNow = Math.min(orderProgressIndex.value, labels.length - 1)
  const offsets = isSelfPick.value
    ? [0, 2, 6, 10]                
    : [0, 2, 24, 48, 72, 80]     
  const base = parseYMDLocal(props.order.date) || new Date()
  return labels.map((label, i) => {
    const state = i < idxNow ? 'done' : i === idxNow ? 'current' : 'pending'
    return {
      key: `order-${i}`,
      label,
      state,
      time: i <= idxNow ? addHours(base, offsets[i] ?? (i * 12)) : null
    }
  })
})
const payFlowLabels = ['選擇付款方式', '已付款', '款項撥款至賣家', '完成訂單']
const payProgressIndex = computed(() => {
  if (!props.order.isPaid) return 0
  let idx = 1
  if (['delivered', 'pickedUp', 'returned', 'cancelled'].includes(props.order.status)) idx = 2
  if (props.order.status === 'pickedUp') idx = 3
  return idx
})
const payTimeline = computed(() => {
  const idxNow = Math.min(payProgressIndex.value, payFlowLabels.length - 1)
  const base = parseYMDLocal(props.order.date) || new Date()
  const offsets = [0, 1, 48, 80]
  return payFlowLabels.map((label, i) => {
    const state = i < idxNow ? 'done' : i === idxNow ? 'current' : 'pending'
    return {
      key: `pay-${i}`,
      label,
      state,
      time: i <= idxNow ? addHours(base, offsets[i] ?? (i * 12)) : null
    }
  })
})
function formatDate(dateStr){
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}/${m}/${day}  ${h}:${min}`
}
</script>
<style scoped>
  .orderDetail{
        width: 100%;
        margin: 4em 0 1em 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 2em;
  }
  .backToSearchResult{
        cursor: pointer;
        padding: 0.5em 0.8em;
        color: var(--black);
        background-color: var(--backgroundColor);
        border: 0;
        border-radius: var(--radiusNormal);
        transition: var(--transitionNormal);
  }
  .allOrderDetailBox{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 1.5em;
  }
  .box1,.box2,.box3,.box4,.box5{
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 0;
        border: 4px solid var(--secondColor);
  }
  .boxTitle{
      background-color: var(--secondColor);
      text-align: center;
      padding: 0.5em;
  }
  .boxContainer{
        padding: 1em;
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;    
  }
  .informationLeft{
        display: flex;
        justify-content: space-between;
        align-items: center;
  }
  .informationRight{
        display: flex;
        justify-content: space-between;
        align-items: center;
  }
  .send{
      color: var(--addColor);
      font-size: 1.2em;
  }
  .cancel{
        cursor: pointer;
        padding: 0.4em 1.5em;
        border: 0;
        border-radius: var(--radiusNormal);
        background-color: var(--backgroundColor);
        color: var(--black);
        transition: var(--transitionNormal);
  }
  .cancel.disabled{
      background-color: #e5e7eb;  
      color: #9ca3af;            
      cursor: not-allowed;
      pointer-events: none;        
  }
  .cancel.disabled:hover{
      background-color: #e5e7eb;
      color: #9ca3af;
  }
  .total{
      display: flex;
      justify-content: end;
      color: var(--secondColor);
  }
  .mfTimeline{
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1em;
  }
  .mfStep{
      display: grid;
      grid-template-columns: 1fr 20px 1fr;
      align-items: center;
      column-gap: 0.75em;
  }
  .mfTime{
      text-align: right;
      font-size: 0.9em;
      opacity: 0.85;
  }
  .mfLabel{
    text-align: left;
    font-size: 0.95em;
  }
  .mfAxis{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      min-height: 44px;
  }
  .mfDot{
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid var(--secondColor);
      background: var(--white);
  }
  .mfConnector{
      width: 2px;
      flex: 1;
      background: var(--secondColor);
      opacity: 0.35;
      margin-top: 6px;
  }
  .mfStep.is-pending{
    opacity: 0.45;
  }
    .mfStep.is-current{
    opacity: 1;
  }
  .mfStep.is-done{
    opacity: 1;
  }
  .mfStep.is-done .mfDot,.mfStep.is-current .mfDot{
    background: var(--secondColor);
  }
@media(width>=768px){
  .backToSearchResult:hover{
    background-color: var(--mainColor);
    color: var(--white);
  }
  .informationLeft{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0;
    }
  .informationLeft .left{
    width:150px;
  } 
  .informationRight{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 3.5em;
  }
  .cancel:hover{
    color: var(--white);
    background-color: var(--mainColor);
  }
  .mfTimeline{
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
    align-items: flex-start;
  }
  .mfStep{
    flex: 1;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    justify-items: center;
    row-gap: 0.5em;
    position: relative;
  }
  .mfTime{
    text-align: center;
  }
  .mfLabel{
    text-align: center;
  }
  .mfConnector{
    display: none;
  }
  .mfAxis{
    width: 100%;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .mfDot{
    position: relative;
    z-index: 2;
  }
  .mfAxis::before,
  .mfAxis::after{
    content: '';
    position: absolute;
    top: 50%;
    height: 2px;
    background: var(--secondColor);
    opacity: 0.35;
    transform: translateY(-50%);
    width: 50%;
  }
  .mfAxis::before{ left: 0; }
  .mfAxis::after{ right: 0; }
  .mfStep:first-child .mfAxis::before{ display: none; }
  .mfStep:last-child  .mfAxis::after{ display: none; }
}
</style>