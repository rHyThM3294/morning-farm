import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
  const allProducts = ref({
    臺北市: [
      { id: 1, name: '東勢甘露梨', price: 599, image: 'chinese-pear.png' },
      { id: 2, name: '淡水柿子', price: 450, image: 'chinese-pear.png' },
      { id: 3, name: '內湖蜜蘋果', price: 320, image: 'chinese-pear.png' }
    ],
    新北市: [
      { id: 4, name: '活力小番茄', price: 180, image: 'chinese-pear.png' },
      { id: 5, name: '三芝甜玉米', price: 120, image: 'chinese-pear.png' }
    ],
    桃園市: [
      { id: 6, name: '大溪豆干', price: 150, image: 'chinese-pear.png' },
      { id: 7, name: '復興水蜜桃', price: 350, image: 'chinese-pear.png' }
    ],
    新竹縣: [
      { id: 8, name: '關西仙草凍', price: 199, image: 'chinese-pear.png' },
      { id: 9, name: '北埔擂茶粉', price: 250, image: 'chinese-pear.png' }
    ],
    苗栗縣: [
      { id: 10, name: '大湖草莓', price: 280, image: 'chinese-pear.png' },
      { id: 11, name: '木雕香皂', price: 150, image: 'chinese-pear.png' }
    ],
    臺中市: [
      { id: 12, name: '東勢甜柿', price: 320, image: 'chinese-pear.png' },
      { id: 13, name: '霧峰米', price: 260, image: 'chinese-pear.png' }
    ],
    嘉義縣: [
      { id: 14, name: '高山茶', price: 680, image: 'chinese-pear.png' },
      { id: 15, name: '民雄鳳梨酥', price: 360, image: 'chinese-pear.png' }
    ],
    臺南市: [
      { id: 16, name: '關廟鳳梨', price: 299, image: 'chinese-pear.png' },
      { id: 17, name: '玉井芒果', price: 380, image: 'chinese-pear.png' }
    ],
    高雄市: [
      { id: 18, name: '高雄金桔', price: 299, image: 'chinese-pear.png' },
      { id: 19, name: '白玉蘿蔔', price: 220, image: 'chinese-pear.png' }
    ],
    屏東縣: [
      { id: 20, name: '黑鮪魚', price: 1200, image: 'chinese-pear.png' },
      { id: 21, name: '愛文芒果', price: 400, image: 'chinese-pear.png' }
    ],
    花蓮縣: [
      { id: 22, name: '壽豐金針花', price: 250, image: 'chinese-pear.png' },
      { id: 23, name: '瑞穗鮮奶', price: 180, image: 'chinese-pear.png' }
    ],
    臺東縣: [
      { id: 24, name: '池上米', price: 280, image: 'chinese-pear.png' },
      { id: 25, name: '鹿野紅烏龍', price: 350, image: 'chinese-pear.png' }
    ]
  })
  const filteredProducts = computed(() =>
    allProducts.value[selectedCity.value] || []
  )
  function switchTab(tab){
    activeTab.value = tab
  }
  function setSelectedCity(city){
    selectedCity.value = city
  }
  function setMapReady(ready){
    isMapReady.value = ready
  }
  const seasonList = [
    { label: '春', value: 'spring' },
    { label: '夏', value: 'summer' },
    { label: '秋', value: 'autumn' },
    { label: '冬', value: 'winter' }
  ]
  const currentSeason = ref('spring')
  const seasonChartData = [
    {
      id: 'pear',
      name: '水梨',
      months: [4,5,6,7,8,9,10,11,12,1],
      image: 'chinese-pear.png',
      price: 350,
      seller: '王大哥'
    },
    {
      id: 'mango',
      name: '芒果',
      months: [5,6,7,8],
      image: 'chinese-pear.png',
      price: 200,
      seller: '玉井果園'
    },
    {
      id: 'pomelo',
      name: '文旦',
      months: [8,9,10],
      image: 'chinese-pear.png',
      price: 250,
      seller: '柚子伯'
    }
  ]
  const seasonProducts = {
    spring: [
      { id: 101, name: '春季玉米筍', price: 80, image: 'chinese-pear.png', seller: '林大哥' },
      { id: 102, name: '春季青茶', price: 150, image: 'chinese-pear.png', seller: '王阿姨' },
    ],
    summer: [
      { id: 201, name: '夏季芒果', price: 220, image: 'chinese-pear.png', seller: '玉井果園' },
      { id: 202, name: '夏季西瓜', price: 180, image: 'chinese-pear.png', seller: '大湖農場' },
    ],
    autumn: [
      { id: 301, name: '秋季文旦', price: 260, image: 'chinese-pear.png', seller: '柚子伯' },
      { id: 302, name: '秋季栗子南瓜', price: 90, image: 'chinese-pear.png', seller: '阿誠農園' },
    ],
    winter: [
      { id: 401, name: '冬季高麗菜', price: 70, image: 'chinese-pear.png', seller: '清境農場' },
      { id: 402, name: '冬季大蒜', price: 110, image: 'chinese-pear.png', seller: '阿吉伯' },
    ]
  }
  const filteredSeasonProducts = computed(() =>
    seasonProducts[currentSeason.value] || []
  )
  function setSeason(season) {
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