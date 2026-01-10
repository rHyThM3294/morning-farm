<template>
  <section class="map-season-page container">
    <MapSeasonToggle :activeTab="activeTab" @changeTab="switchTab" />
    <div class="city-selector" v-if="activeTab === 'map'">
      <label for="city"></label>
      <select
        class="selectCity"
        id="city"
        v-model="selectedCity"
        @change="handleSelectChange"
      >
        <option
          v-for="city in allCities"
          :key="city"
          :value="city"
        >
          {{ city }}
        </option>
      </select>
    </div>
    <div class="content-block">
      <TaiwanMap
        ref="taiwanMapRef"
        v-if="activeTab === 'map'"
        @citySelected="handleCitySelect"
        @svgReady="handleMapReady"
      />
      <SeasonBlock 
        v-else 
        @selectProduct="handleSeasonProduct"
      />
    </div>
    <section
      v-if="activeTab === 'map'"
      ref="productSection"
      class="product-section"
    >
      <h2 class="cityName">
        {{ selectedCity }}
      </h2>
      <div v-if="filteredProducts.length > 0" class="card-container">
        <Card
          v-for="p in filteredProducts"
          :key="p.id"
          :id="String(p.id)"
          :productTitle="p.name"
          :price="p.price"
          :imageUrl="p.image"
          :sellerName="'劉申權'"
          :unit="'12顆/箱'"
          :category="'all'"
          :stock="100"
          :useHorizontal="true"
        />
      </div>
      <p v-else class="no-products">目前此地區暫無產品資料 🌱</p>
    </section>
    <section 
      v-if="activeTab === 'season' && selectedSeasonProduct"
      class="product-section"
    >
      <h2 class="cityName">
        {{ selectedSeasonProduct.name }} 的相關商品
      </h2>
      <div v-if="seasonStoreProducts.length > 0" class="card-container">
        <Card
          v-for="p in seasonStoreProducts"
          :key="p.id"
          :id="p.id"
          :productTitle="p.productTitle"
          :price="p.price"
          :imageUrl="p.imageUrl"
          :sellerName="p.sellerName"
          :unit="p.unit"
          :category="p.category"
          :stock="p.stock"
          :useHorizontal="true"
        />
      </div>
      <p v-else class="no-products">此商品目前尚無相關產品 🌱</p>
    </section>
    <AsideButton />
  </section>
</template>
<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router'
import MapSeasonToggle from '@/components/mapSeason/MapSeasonToggle.vue'
import TaiwanMap from '@/components/mapSeason/TaiwanMap.vue'
import SeasonBlock from '@/components/mapSeason/SeasonBlock.vue'
import AsideButton from '@/components/common/AsideButton.vue'
import Card from '@/components/common/Card.vue'
const activeTab = ref('map')
const selectedProductId = ref(null)
const selectedCity = ref('新北市')
const productSection = ref(null)
const taiwanMapRef = ref(null)
const isMapReady = ref(false)
const route = useRoute()
onMounted(() => {
  if (route.path === '/map') activeTab.value = 'map'
  if (route.path === '/season') activeTab.value = 'season'
})
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
  selectedSeasonProduct.value = null
}
function handleMapReady(){
  isMapReady.value = true
  if (taiwanMapRef.value?.selectCity) {
    taiwanMapRef.value.selectCity(selectedCity.value)
  }
}
const handleCitySelect = async (cityName) => {
  selectedCity.value = cityName
  await nextTick()
  scrollToProducts()
}
const scrollToProducts = async (offset = -125) => {
  await nextTick();
  const el = productSection.value;
  if (!el){
    console.warn("scrollToProducts: 找不到 productSection");
    return;
  }
  const rect = el.getBoundingClientRect();
  const targetY = window.scrollY + rect.top + offset;
  gsap.to(window,{
    duration: 0.8,
    scrollTo: targetY,
    ease: "power3.out"
  });
};
const handleSelectChange = async () => {
  await nextTick()
  if (isMapReady.value && taiwanMapRef.value?.selectCity){
    taiwanMapRef.value.selectCity(selectedCity.value)
  }
  scrollToProducts()
}
const selectedSeasonProduct = ref(null)
function handleSeasonProduct(item){
  selectedSeasonProduct.value = item
}
const productStore = useProductStore()
const seasonStoreProducts = computed(() => {
  if (!selectedSeasonProduct.value) return []
  return productStore.allProducts.filter(p =>
    p.productTitle.includes(selectedSeasonProduct.value.name)
  )
})
</script>
<style scoped>
.map-season-page{
  text-align: center;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
}
.content-block{
  width: 100%;
  max-width: 1200px;
}
.category{
  width: 1000%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.city-selector{
  margin: 1em 0;
  font-size: 1rem;
}
#city{
  position: relative;
  margin: 0 auto;
  width: 300px;
  border-radius: var(--radiusLarge);
  border: 1px solid var(--mainColor);
}
.city-selector label{
  margin-right: 0.5em;
  font-weight: 600;
}
.city-selector select{
  padding: 0.4em 0.6em;
  border-radius: 8px;
  border: 1px solid var(--mainColor);
  font-size: 1rem;
  outline: none;
}
.selectCity{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 35px 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center; /* 箭頭位置 */
  background-size: 14px;
  background-color:var(--white);
}
.selectCity:focus{
  outline: none;
  border-color: var(--addColor);
}
.no-products{
  font-size: 1.2em;
  color:var(--gray);
  margin-top: 1em;
}
.cityName{
  text-align: center;
  color: var(--firstColor);
  margin:0 0 1em 0;
}
.product-section{
  width: 100%;
  max-width: 1000px;
  scroll-margin-top: 10px;
}
.card-container{
  width: 100%;
  text-align: left;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
@media (width >= 768px){
  .card-container{
    flex-flow: row wrap;
    max-width: 1200px;
  }
}
</style>
