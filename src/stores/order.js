import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProductStore } from '@/stores/product'
export const useOrderStore = defineStore('order', () => {
  const productStore = useProductStore()
  const products = productStore.allProducts
  const statusPool = [
    'unpaid',
    'toShip',
    'delivered',
    'pickedUp',
    'cancelled',
    'returned',
  ]
  const returnReasonPool = [
    '包裝破損',
    '商品短少',
    '商品瑕疵',
    '商品有誤'
  ]
const returnMethodMap = {
  '商品短少': ['補商品', '退款', '換貨'],
  '包裝破損': ['退款', '換貨'],
  '商品瑕疵': ['退款', '換貨'],
  '商品有誤': ['退款', '換貨']
}
const orders = ref(generateOrders())
const searchResult = ref([])
function cancelOrder(orderId){
    const target = orders.value.find(o => o.orderId === orderId)
    if (!target) return false
    target.status = 'cancelled'
    return true
  }
  function finishReturn(orderId){
    const target = orders.value.find(o => o.orderId === orderId)
    if (!target || !target.returnInfo) return
    target.returnInfo.status = 'done'
    target.returnInfo.finishedTime = localDateTimeString()
  }
  function searchOrders(params){
    if (params.type === 'orderId'){
      searchResult.value = orders.value.filter(o =>
        o.orderId.includes(params.keyword)
      )
    }

    if (params.type === 'date'){
      const start = formatDate(params.start)
      const end = formatDate(params.end)

      searchResult.value = orders.value.filter(o =>
        o.date >= start && o.date <= end
      )
    }
  }
  function formatDate(d){
    if (!d) return ''
    return localDateKey(d)
  }
  function generateOrders() {
    if (!products.length) return []

    return Array.from({ length: 50 }, (_, i) => {
      const itemCount = (i % 3) + 1
      const items = []
      let itemsTotal = 0
      for (let j = 0; j < itemCount; j++) {
        const product = products[(i + j) % products.length]
        const quantity = (j % 3) + 1
        const subtotal = product.price * quantity
        items.push({
          productId: product.id,
          productName: product.productTitle,
          sellerName: product.sellerName,
          unit: product.unit,
          price: product.price,
          quantity,
          subtotal
        })
        itemsTotal += subtotal
      }
      const payMethodPool = ['信用卡扣款', '超商繳費', '貨到付款', '現場自取']
      const payMethod = payMethodPool[i % payMethodPool.length]
      let shippingMethod = ''
      let freight = 0
      if(payMethod === '現場自取'){
        shippingMethod = '現場自取'
        freight = 0 
      } else{
        const shippingPool = ['宅配到府', '超商取貨']
        shippingMethod = shippingPool[i % shippingPool.length]
        freight = 120
      }
      const hasReturn = i % 4 === 0
      const isPendingReturn = hasReturn && i % 2 === 0
      let returnInfo = null
      if (hasReturn){
        const randomReason = returnReasonPool[Math.floor(Math.random() * returnReasonPool.length)]
        const availableMethods = returnMethodMap[randomReason]
        const randomMethod =
          availableMethods[Math.floor(Math.random() * availableMethods.length)]
        returnInfo = {
          status: isPendingReturn ? 'pending' : 'done',
          reason: randomReason,
          method: randomMethod,
          applyTime: `${recentDate(i - 1)} 18:30`,
          deadline: isPendingReturn
            ? `${recentDate(i + 2)} 23:59`
            : null,
          finishedTime: !isPendingReturn
            ? `${recentDate(i)} 14:20`
            : null
        }
      }
      return{
        id: i + 1,
        orderId: generateOrderNumber(i),
        buyer: `買家${i + 1}`,
        phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
        telephone: '',
        email: `buyer${i + 1}@example.com`,
        date: recentDate(i),
        payTime: i % 2 === 0 ? recentDate(i - 1) : null,
        status: hasReturn ? 'returned' : statusPool[i % statusPool.length],
        isPaid: i % 2 === 0,
        payMethod,
        shippingMethod,
        address:
          i % 3 === 2
            ? '現場自取'
            : `臺東縣中正區振興路 ${i + 1} 號`,
        items,
        freight,
        total: itemsTotal + freight,
        returnInfo,
        remark: i % 4 === 0 ? '請下午再送' : '',
        productImage: '/image/chinese-pear.png',
      }
    })
  }
  return{
    orders,
    searchResult,
    searchOrders,
    cancelOrder,
    finishReturn,
  }
})
function recentDate(i){
  const d = new Date()
  d.setDate(d.getDate() - i)
  return localDateKey(d)
}
function generateOrderNumber(index){
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const seq = String((index % 99) + 1).padStart(2, '0')
  return `${yyyy}${mm}${dd}${seq}`
}
function getLocalDateTime(){
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}
function localDateKey(d = new Date()){
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function localDateTimeString(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}