import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProductStore = defineStore('product', () => {
  const allProducts = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  let fetchPromise = null

  // 商品資料透過 fetch 向（MSW 模擬的）API 取得，避免重複發送請求
  function fetchProducts() {
    if (fetchPromise) return fetchPromise
    isLoading.value = true
    error.value = null
    const BASE = import.meta.env.BASE_URL || '/'
    fetchPromise = fetch(`${BASE}api/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`取得商品資料失敗（${res.status}）`)
        return res.json()
      })
      .then((data) => {
        allProducts.value = data
      })
      .catch((e) => {
        error.value = e.message || '取得商品資料失敗'
        fetchPromise = null
      })
      .finally(() => {
        isLoading.value = false
      })
    return fetchPromise
  }
  function getProductById(id) {
    return allProducts.value.find(p => p.id === id)
  }
  function getProductsByCategory(category) {
    if (category === "all") return allProducts.value
    return allProducts.value.filter(p => p.category === category)
  }
  function getProductsBySeries(series) {
    return allProducts.value.filter(p => p.series === series)
  }
  const seasonProducts = {
    spring: [
      { id: "s101", productTitle: "春季玉米筍", price: 80, imageUrl: "chinese-pear.png", sellerName: "林大哥", unit: "1 份", category: "season", stock: 100 },
      { id: "s102", productTitle: "春季青茶", price: 150, imageUrl: "chinese-pear.png", sellerName: "王阿姨", unit: "1 份", category: "season", stock: 100 },
      { id: "s103", productTitle: "春季胡蘿蔔", price: 65, imageUrl: "chinese-pear.png", sellerName: "阿誠農園", unit: "1 斤", category: "season", stock: 80 }
    ],
    summer: [
      { id: "s201", productTitle: "夏季芒果", price: 220, imageUrl: "chinese-pear.png", sellerName: "玉井果園", unit: "1 份", category: "season", stock: 100 },
      { id: "s202", productTitle: "夏季西瓜", price: 180, imageUrl: "chinese-pear.png", sellerName: "大湖農場", unit: "1 份", category: "season", stock: 80 },
      { id: "s203", productTitle: "夏季竹筍", price: 95, imageUrl: "chinese-pear.png", sellerName: "茶山小農", unit: "1 斤", category: "season", stock: 60 }
    ],
    autumn: [
      { id: "s301", productTitle: "秋季文旦", price: 260, imageUrl: "chinese-pear.png", sellerName: "柚子伯", unit: "1 箱", category: "season", stock: 100 },
      { id: "s302", productTitle: "秋季栗子南瓜", price: 90, imageUrl: "chinese-pear.png", sellerName: "阿誠農園", unit: "1 斤", category: "season", stock: 80 },
      { id: "s303", productTitle: "秋季香菇", price: 150, imageUrl: "chinese-pear.png", sellerName: "新社小農", unit: "1 份", category: "season", stock: 60 }
    ],
    winter: [
      { id: "s401", productTitle: "冬季高麗菜", price: 70, imageUrl: "chinese-pear.png", sellerName: "清境農場", unit: "1 顆", category: "season", stock: 120 },
      { id: "s402", productTitle: "冬季大蒜", price: 110, imageUrl: "chinese-pear.png", sellerName: "阿吉伯", unit: "1 斤", category: "season", stock: 100 },
      { id: "s403", productTitle: "冬季蘿蔔", price: 55, imageUrl: "chinese-pear.png", sellerName: "茶山小農", unit: "1 斤", category: "season", stock: 90 }
    ]
  }
  function getProductsBySeason(season) {
    return seasonProducts[season] || []
  }
  return{
    allProducts,
    isLoading,
    error,
    fetchProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySeries,
    seasonProducts,
    getProductsBySeason,
  }
})