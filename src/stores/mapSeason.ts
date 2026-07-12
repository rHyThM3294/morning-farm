import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CityProduct {
  id: number
  name: string
  price: number
  image: string
}

interface SeasonChartItem {
  id: string
  name: string
  months: number[]
  image: string
  price: number
  seller: string
}

interface SeasonProductItem {
  id: number
  name: string
  price: number
  image: string
  seller: string
}

type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export const useMapSeasonStore = defineStore('mapSeason', () => {
  const activeTab = ref('map')
  const selectedCity = ref('新北市')
  const isMapReady = ref(false)
  const allCities = [
    '臺北市', '新北市', '桃園市', '新竹市', '新竹縣', '苗栗縣',
    '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣',
    '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣',
    '澎湖縣', '金門縣', '連江縣'
  ]
  const allProducts = ref<Record<string, CityProduct[]>>({
    臺北市: [
      { id: 1, name: '東勢甘露梨', price: 599, image: 'chinese-pear.webp' },
      { id: 2, name: '淡水柿子', price: 450, image: 'chinese-pear.webp' },
      { id: 3, name: '內湖蜜蘋果', price: 320, image: 'chinese-pear.webp' }
    ],
    新北市: [
      { id: 4, name: '活力小番茄', price: 180, image: 'chinese-pear.webp' },
      { id: 5, name: '三芝甜玉米', price: 120, image: 'chinese-pear.webp' }
    ],
    桃園市: [
      { id: 6, name: '大溪豆干', price: 150, image: 'chinese-pear.webp' },
      { id: 7, name: '復興水蜜桃', price: 350, image: 'chinese-pear.webp' }
    ],
    新竹縣: [
      { id: 8, name: '關西仙草凍', price: 199, image: 'chinese-pear.webp' },
      { id: 9, name: '北埔擂茶粉', price: 250, image: 'chinese-pear.webp' }
    ],
    苗栗縣: [
      { id: 10, name: '大湖草莓', price: 280, image: 'chinese-pear.webp' },
      { id: 11, name: '木雕香皂', price: 150, image: 'chinese-pear.webp' }
    ],
    臺中市: [
      { id: 12, name: '東勢甜柿', price: 320, image: 'chinese-pear.webp' },
      { id: 13, name: '霧峰米', price: 260, image: 'chinese-pear.webp' }
    ],
    嘉義縣: [
      { id: 14, name: '高山茶', price: 680, image: 'chinese-pear.webp' },
      { id: 15, name: '民雄鳳梨酥', price: 360, image: 'chinese-pear.webp' }
    ],
    臺南市: [
      { id: 16, name: '關廟鳳梨', price: 299, image: 'chinese-pear.webp' },
      { id: 17, name: '玉井芒果', price: 380, image: 'chinese-pear.webp' }
    ],
    高雄市: [
      { id: 18, name: '高雄金桔', price: 299, image: 'chinese-pear.webp' },
      { id: 19, name: '白玉蘿蔔', price: 220, image: 'chinese-pear.webp' }
    ],
    屏東縣: [
      { id: 20, name: '黑鮪魚', price: 1200, image: 'chinese-pear.webp' },
      { id: 21, name: '愛文芒果', price: 400, image: 'chinese-pear.webp' }
    ],
    花蓮縣: [
      { id: 22, name: '壽豐金針花', price: 250, image: 'chinese-pear.webp' },
      { id: 23, name: '瑞穗鮮奶', price: 180, image: 'chinese-pear.webp' }
    ],
    臺東縣: [
      { id: 24, name: '池上米', price: 280, image: 'chinese-pear.webp' },
      { id: 25, name: '鹿野紅烏龍', price: 350, image: 'chinese-pear.webp' }
    ]
  })
  const filteredProducts = computed(() =>
    allProducts.value[selectedCity.value] || []
  )
  function switchTab(tab: string){
    activeTab.value = tab
  }
  function setSelectedCity(city: string){
    selectedCity.value = city
  }
  function setMapReady(ready: boolean){
    isMapReady.value = ready
  }
  const seasonList = [
    { label: '春', value: 'spring' },
    { label: '夏', value: 'summer' },
    { label: '秋', value: 'autumn' },
    { label: '冬', value: 'winter' }
  ]
  const currentSeason = ref<Season>('spring')
  const seasonChartData: SeasonChartItem[] = [
    {
      id: 'pear',
      name: '水梨',
      months: [4,5,6,7,8,9,10,11,12,1],
      image: 'chinese-pear.webp',
      price: 350,
      seller: '王大哥'
    },
    {
      id: 'mango',
      name: '芒果',
      months: [5,6,7,8],
      image: 'mango.webp',
      price: 200,
      seller: '玉井果園'
    },
    {
      id: 'pomelo',
      name: '文旦',
      months: [8,9,10],
      image: 'chinese-pear.webp',
      price: 250,
      seller: '柚子伯'
    },
    {
      id: 'cabbage',
      name: '高麗菜',
      months: [11,12,1,2,3,4],
      image: 'cabbage.webp',
      price: 70,
      seller: '清境農場'
    },
    {
      id: 'tea',
      name: '烏龍茶',
      months: [3,4,5,9,10,11],
      image: 'chinese-pear.webp',
      price: 680,
      seller: '阿里山茶農'
    },
    {
      id: 'rice',
      name: '池上米',
      months: [6,7,8,10,11,12],
      image: 'rice.webp',
      price: 280,
      seller: '池上農會'
    },
    {
      id: 'bamboo',
      name: '竹筍',
      months: [4,5,6,7,8,9],
      image: 'bamboo-shoots.webp',
      price: 120,
      seller: '阿明農場'
    },
    {
      id: 'mushroom',
      name: '香菇',
      months: [10,11,12,1,2,3],
      image: 'mushroom.webp',
      price: 150,
      seller: '新社菇農'
    },
    {
      id: 'sweet_potato',
      name: '地瓜',
      months: [8,9,10,11,12,1],
      image: 'potato.webp',
      price: 90,
      seller: '雲林地瓜伯'
    },
    {
      id: 'carrot',
      name: '紅蘿蔔',
      months: [11,12,1,2,3],
      image: 'carrot.webp',
      price: 80,
      seller: '彰化阿誠'
    }
  ]
  const seasonProducts: Record<Season, SeasonProductItem[]> = {
    spring: [
      { id: 101, name: '春季竹筍', price: 120, image: 'bamboo-shoots.webp', seller: '阿明農場' },
      { id: 102, name: '春季烏龍茶', price: 680, image: 'chinese-pear.webp', seller: '阿里山茶農' },
      { id: 103, name: '春季高麗菜', price: 70, image: 'cabbage.webp', seller: '清境農場' },
    ],
    summer: [
      { id: 201, name: '夏季芒果', price: 220, image: 'mango.webp', seller: '玉井果園' },
      { id: 202, name: '夏季竹筍', price: 120, image: 'bamboo-shoots.webp', seller: '阿明農場' },
      { id: 203, name: '夏季水梨', price: 350, image: 'chinese-pear.webp', seller: '王大哥' },
      { id: 204, name: '夏季池上米', price: 280, image: 'rice.webp', seller: '池上農會' },
    ],
    autumn: [
      { id: 301, name: '秋季文旦', price: 250, image: 'chinese-pear.webp', seller: '柚子伯' },
      { id: 302, name: '秋季地瓜', price: 90, image: 'potato.webp', seller: '雲林地瓜伯' },
      { id: 303, name: '秋季烏龍茶', price: 680, image: 'chinese-pear.webp', seller: '阿里山茶農' },
      { id: 304, name: '秋季池上米', price: 280, image: 'rice.webp', seller: '池上農會' },
    ],
    winter: [
      { id: 401, name: '冬季高麗菜', price: 70, image: 'cabbage.webp', seller: '清境農場' },
      { id: 402, name: '冬季香菇', price: 150, image: 'mushroom.webp', seller: '新社菇農' },
      { id: 403, name: '冬季紅蘿蔔', price: 80, image: 'carrot.webp', seller: '彰化阿誠' },
      { id: 404, name: '冬季地瓜', price: 90, image: 'potato.webp', seller: '雲林地瓜伯' },
    ]
  }
  const filteredSeasonProducts = computed(() =>
    seasonProducts[currentSeason.value] || []
  )
  function setSeason(season: Season) {
    currentSeason.value = season
  }
  return{
    activeTab,
    selectedCity,
    isMapReady,
    allCities,
    filteredProducts,
    switchTab,
    setSelectedCity,
    setMapReady,
    seasonList,
    currentSeason,
    seasonChartData,
    filteredSeasonProducts,
    setSeason,
  }
})
