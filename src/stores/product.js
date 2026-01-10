import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useProductStore = defineStore('product', () => {
  const farmers = [
    "陳阿明",
    "李春花",
    "黃文發",
    "張育成",
    "林秀蘭",
    "王建國",
    "王大哥",
    "玉井果園",
    "柚子伯",
    "清境農場",
    "阿誠農園",
    "茶山小農"
  ]
  const seasonChartData = [
    {
      id: 'pear',
      name: '水梨',
      months: [4,5,6,7,8,9,10,11,12,1],
      image: 'chinese-pear.png'
    },
    {
      id: 'mango',
      name: '芒果',
      months: [5,6,7,8],
      image: 'chinese-pear.png'
    },
    {
      id: 'pomelo',
      name: '文旦',
      months: [8,9,10],
      image: 'chinese-pear.png'
    },
    {
      id: 'cabbage',
      name: '高麗菜',
      months: [11,12,1,2,3],
      image: 'chinese-pear.png'
    },
    {
      id: 'tea',
      name: '烏龍茶',
      months: [4,5,10,11],
      image: 'chinese-pear.png'
    },
    {
      id: 'rice',
      name: '稻米',
      months: [6,7,11,12],
      image: 'chinese-pear.png'
    },
    {
      id: 'bamboo',
      name: '竹筍',
      months: [4,5,6,7,8],
      image: 'chinese-pear.png'
    },
    {
      id: 'mushroom',
      name: '香菇',
      months: [10,11,12,1,2,3],
      image: 'chinese-pear.png'
    },
    {
      id: 'sweet_potato',
      name: '地瓜',
      months: [9,10,11,12,1],
      image: 'chinese-pear.png'
    },
    {
      id: 'carrot',
      name: '紅蘿蔔',
      months: [11,12,1,2,3,4],
      image: 'chinese-pear.png'
    }
  ]
  const productTemplates = [
    { title: "黑珍珠蓮霧", category: "festival", series: null },
    { title: "臺農芒果", category: "festival", series: null },
    { title: "無毒鳳梨", category: "vegetarianism", series: null },
    { title: "高山水蜜桃", category: "festival", series: null },
    { title: "香水蘋果", category: "all", series: null },
    { title: "火龍果", category: "vegetarianism", series: null },
    { title: "九號白米", category: "longTime", series: null },
    { title: "花生糖", category: "longTime", series: null },
    { title: "芒果乾", category: "process", series: null },
    { title: "花生糖", category: "process", series: null },
    { title: "堅果禮盒", category: "festival", series: null },
    { title: "水梨禮盒", category: "season", series: "pear" },
    { title: "水梨單顆裝", category: "season", series: "pear" },
    { title: "水梨果汁", category: "process", series: "pear" },
    { title: "愛文芒果", category: "season", series: "mango" },
    { title: "芒果冰棒", category: "process", series: "mango" },
    { title: "芒果乾禮盒", category: "process", series: "mango" },
    { title: "文旦禮盒", category: "season", series: "pomelo" },
    { title: "文旦果醬", category: "process", series: "pomelo" },
    { title: "文旦精油", category: "process", series: "pomelo" },
    { title: "高山高麗菜", category: "season", series: "cabbage" },
    { title: "高麗菜乾", category: "process", series: "cabbage" },
    { title: "高麗菜泡菜", category: "process", series: "cabbage" },
    { title: "凍頂烏龍茶", category: "season", series: "tea" },
    { title: "高山烏龍茶", category: "season", series: "tea" },
    { title: "烏龍茶禮盒", category: "festival", series: "tea" },
    { title: "池上米", category: "season", series: "rice" },
    { title: "有機糙米", category: "season", series: "rice" },
    { title: "米餅禮盒", category: "process", series: "rice" },
    { title: "麻竹筍", category: "season", series: "bamboo" },
    { title: "桂竹筍", category: "season", series: "bamboo" },
    { title: "筍乾", category: "process", series: "bamboo" },
    { title: "新社香菇", category: "season", series: "mushroom" },
    { title: "段木香菇", category: "season", series: "mushroom" },
    { title: "香菇乾", category: "process", series: "mushroom" },
    { title: "臺農57號地瓜", category: "season", series: "sweet_potato" },
    { title: "紫心地瓜", category: "season", series: "sweet_potato" },
    { title: "地瓜片", category: "process", series: "sweet_potato" },
    { title: "有機紅蘿蔔", category: "season", series: "carrot" },
    { title: "彩虹蘿蔔", category: "season", series: "carrot" },
    { title: "蘿蔔汁", category: "process", series: "carrot" }
  ]
  const daysAgo = (n) => {
    const d = new Date()
    d.setDate(d.getDate() - n)
    return d.toISOString()
  }
  const PRODUCT_COUNT = 150
  const allProducts = ref([])
  function generateProducts() {
    const data = Array.from({ length: PRODUCT_COUNT }).map((_, i) => {
      const t = productTemplates[i % productTemplates.length]
      const farmer = farmers[i % farmers.length]
      const price = 150 + (i % 40) * 5 + Math.floor(Math.random() * 20)
      return{
        id: `p${i + 1}`,
        productTitle: t.title,
        category: t.category,
        series: t.series || null,
        status: ["New", "Hot", "促銷", "可自取"][i % 4],
        sellerName: farmer,
        unit: ["6 顆 / 盒", "10 顆 / 箱", "1 斤", "3 斤 / 袋", "1 份"][i % 5],
        price,
        imageUrl: "chinese-pear.png",
        createdAt: daysAgo(i % 30),
        stock: 100,
        sellerAvatarUrl: "/image/sandPear.png",
        farmerDescription: `${farmer} 使用自然農法栽培，堅持以友善方式種植。`
      }
    })
    allProducts.value = data
  }
  generateProducts()
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
    seasonChartData,     
    allProducts,
    getProductById,
    getProductsByCategory,
    getProductsBySeries,
    seasonProducts,
    getProductsBySeason,
  }
})