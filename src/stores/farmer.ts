import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useProductStore } from './product'

// ─── 農夫基本資料（靜態，日後可替換成 API）────────────────────────────────
// 注意：farmerName 必須與 product store 裡的 sellerName 完全一致，
// Card.vue 點進詳情頁才能透過 sellerName 撈到正確商品。
const FARMER_DATA = [
  { farmerName: '陳阿明',  crop: '日照番茄',  likes: 720, date: '2024-05-12' },
  { farmerName: '李春花',  crop: '蜜香木瓜',  likes: 680, date: '2024-06-01' },
  { farmerName: '黃文發',  crop: '紅肉火龍果', likes: 950, date: '2024-03-28' },
  { farmerName: '張育成',  crop: '甜玉米',    likes: 340, date: '2024-01-25' },
  { farmerName: '林秀蘭',  crop: '蜜香蓮霧',  likes: 888, date: '2024-08-10' },
  { farmerName: '王建國',  crop: '高山萵苣',  likes: 320, date: '2024-07-20' },
  { farmerName: '王大哥',  crop: '有機蔬菜',  likes: 410, date: '2024-04-10' },
  { farmerName: '玉井果園', crop: '愛文芒果',  likes: 860, date: '2024-05-01' },
  { farmerName: '柚子伯',  crop: '文旦柚',    likes: 530, date: '2024-09-01' },
  { farmerName: '清境農場', crop: '高山高麗菜', likes: 740, date: '2024-02-14' },
  { farmerName: '阿誠農園', crop: '有機紅蘿蔔', likes: 390, date: '2024-03-01' },
  { farmerName: '茶山小農', crop: '凍頂烏龍茶', likes: 610, date: '2024-06-15' },
]

export const useFarmerStore = defineStore('farmer', () => {
  const productStore = useProductStore()
  const base = import.meta.env.BASE_URL || '/'

  // 取得所有農夫，帶入 imageUrl（統一預設圖，之後換真圖只改這裡）
  const allFarmers = computed(() =>
    FARMER_DATA.map(f => ({
      ...f,
      imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png`,
    }))
  )

  // 依名字查農夫
  function getFarmerByName(name: string) {
    const decoded = decodeURIComponent(name || '').trim()
    return allFarmers.value.find(f => f.farmerName === decoded) ?? null
  }

  // 取得某農夫的所有商品（直接從 product store 撈真實資料）
  function getProductsByFarmer(farmerName: string) {
    const decoded = decodeURIComponent(farmerName || '').trim()
    return productStore.allProducts.filter(p => p.sellerName === decoded)
  }

  return { allFarmers, getFarmerByName, getProductsByFarmer }
})
