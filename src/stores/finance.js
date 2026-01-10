import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
export const useFinanceStore = defineStore('finance', () => {
  const donut = ref({
    net: 63229,
    fee: 3294,
  })
  const statsBase = ref([
    { id: 1, title: '今日收入', value: 2325, type: 'income' },
    { id: 2, title: '累計總收入', value: 588435, type: 'income' },
    { id: 3, title: '本月已撥款收入', value: 62671, type: 'income' },
    { id: 4, title: '待撥款收入', value: 2255, type: 'income' },
  ])
  const stats = computed(() => [
    ...statsBase.value,
    { id: 5, title: '本月退單金額', value: donut.value.fee, type: 'refund' }
  ])
  const netIncome = computed(() => donut.value.net - donut.value.fee)  
  const totalIncome = computed(() => donut.value.net)
  const refundAmount = computed(() => donut.value.fee)
  function setFinanceFromApi(payload) {
    if (payload.stats){
      statsBase.value = payload.stats.filter(s => s.id !== 5)
    }
    if (payload.donut){
      donut.value = payload.donut
    }
  }
  return{
    stats,
    donut,
    netIncome,     
    totalIncome,   
    refundAmount,   
    setFinanceFromApi
  }
})
function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function randomOrderId(){
  return String(randomInt(1000000000, 9999999999))
}
function randomDate(){
  const start = new Date('2025-12-01').getTime()
  const end = new Date('2026-03-31').getTime()
  const d = new Date(randomInt(start, end))
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}
function randomTime(){
  const h = String(randomInt(8, 21)).padStart(2, '0')
  const m = String(randomInt(0, 59)).padStart(2, '0')
  return `${h}:${m}`
}
const paymentMethods = ['信用卡', '銀行轉帳', '貨到付款']
const statusPool = ['成功', '失敗', '退款']
export const financeTableRecords = Array.from({ length: 100 }, () => {
  const amount = randomInt(200, 5000)
  const shipping = randomInt(30, 120)
  const netIncome = amount - shipping
  return {
    orderId: randomOrderId(),
    amount,
    paymentMethod: paymentMethods[randomInt(0, 2)],
    status: statusPool[randomInt(0, 2)],
    shipping,       
    netIncome,
    date: randomDate(),
    time: randomTime()
  }
})