import type { Product } from '@/types'

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
  { title: "臺農地瓜", category: "season", series: "sweet_potato" },
  { title: "紫心地瓜", category: "season", series: "sweet_potato" },
  { title: "地瓜片", category: "process", series: "sweet_potato" },
  { title: "有機紅蘿蔔", category: "season", series: "carrot" },
  { title: "彩虹蘿蔔", category: "season", series: "carrot" },
  { title: "蘿蔔汁", category: "process", series: "carrot" }
]

const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

const PRODUCT_COUNT = 150

export function generateProducts(): Product[] {
  return Array.from({ length: PRODUCT_COUNT }).map((_, i) => {
    const t = productTemplates[i % productTemplates.length]
    const farmer = farmers[i % farmers.length]
    const price = 150 + (i % 40) * 5 + Math.floor(Math.random() * 20)
    return {
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
}
