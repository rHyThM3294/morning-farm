<template>
  <TopBar 
    title="合作小農"
    :buttons="farmerButtons"
    searchPlaceholder="搜尋商品知識..."
    @selectButton="switchFarmer"
    @search="handleSearch"
  />
  <section class="farmerSectionWrapper">
    <div class="sortBar">
      <label for="sortSelect">排序方式：</label>
      <select id="sortSelect" v-model="sortOption">
        <option value="date">依照開始合作日期</option>
        <option value="likes">依照讚數排序</option>
      </select>
    </div>
    <FarmerSection
      title=""
      buttonText="認識小農"
      :farmers="pagedFarmers"
      :showMoreButton="false"
    />
  </section>
  <div class="paginationBlock">
    <Page 
      :totalPages="totalPages" 
      v-model="currentPage" 
      @pageChanged="scrollToFarmerTop"
    />
    <p>目前頁數：{{ currentPage }}</p>
  </div>
  <AsideButton />
</template>
<script setup>
import { ref, computed } from 'vue'
import TopBar from '../../components/common/TopBar.vue'
import AsideButton from '../../components/common/AsideButton.vue'
import FarmerSection from '../../components/farmer/FarmerSection.vue'
import Page from '../../components/common/Page.vue'
const totalPages = ref(0)
const currentPage = ref(1)
const perPage = 9 
const sortOption = ref('date')
const base = import.meta.env.BASE_URL
const allFarmers = ref([
  { farmerName: '陳阿明', crop: '日照番茄', likes: 720, date: '2024-05-12', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '李春花', crop: '蜜香木瓜', likes: 680, date: '2024-06-01', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '林志成', crop: '青龍辣椒', likes: 500, date: '2024-02-15', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '黃文發', crop: '紅肉火龍果', likes: 950, date: '2024-03-28', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '王建國', crop: '高山萵苣', likes: 320, date: '2024-07-20', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '林秀蘭', crop: '蜜香蓮霧', likes: 888, date: '2024-08-10', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '張育成', crop: '甜玉米', likes: 340, date: '2024-01-25', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '李美華', crop: '香水芭樂', likes: 777, date: '2024-04-02', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '陳建興', crop: '青江菜', likes: 260, date: '2024-03-15', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '高麗珍', crop: '南瓜', likes: 599, date: '2024-07-05', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '蔡文強', crop: '胡蘿蔔', likes: 921, date: '2024-02-01', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '鍾美玲', crop: '小黃瓜', likes: 432, date: '2024-06-25', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` }
])
const sortedFarmers = computed(() => {
  if(sortOption.value === 'likes'){
    return[...allFarmers.value].sort((a, b) => b.likes - a.likes)
  } else{
    return[...allFarmers.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})
const pagedFarmers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  totalPages.value = Math.ceil(sortedFarmers.value.length / perPage)
  return sortedFarmers.value.slice(start, end)
})
function scrollToFarmerTop() {
  const el = document.querySelector(".farmerSectionWrapper");
  if(el){
    const top = el.getBoundingClientRect().top + window.scrollY - 80; 
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }
}
const farmerButtons = [
  { label: '所有小農', value: 'all' },
  { label: '北部', value: 'northFarmer' },
  { label: '中部', value: 'centerFarmer' },
  { label: '南部', value: 'southFarmer' },
  { label: '東部', value: 'eastFarmer' }
]
const switchFarmer = (value) => {
  console.log('切換分類：', value)
}
const handleSearch = (keyword) => {
  console.log('搜尋關鍵字：', keyword)
}
</script>
<style scoped>
.farmerSectionWrapper{
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.sortBar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1em 0;
  gap: 0.5em;
}

.sortBar label{
  font-weight: bold;
  color: var(--firstColor);
}

.sortBar select{
  padding: 0.4em 1.2em;
  border: 1px solid var(--mainColor);
  border-radius: var(--radiusLarge);
  background-color: var(--white);
  color: var(--secondColor);
  cursor: pointer;
  font-size: 1em;
  transition: var(--transitionNormal);
}
.paginationBlock {
  margin: 2em auto;
  text-align: center;
}
@media screen and (min-width:768px){
    .sortBar select:hover {
      background-color: var(--mainColor);
      color: var(--white);
    }
}
</style>
