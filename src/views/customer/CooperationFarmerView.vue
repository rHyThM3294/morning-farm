<template>
  <TopBar
    title="合作小農"
    :buttons="farmerButtons"
    searchPlaceholder="搜尋小農..."
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
import TopBar from '@/components/common/TopBar.vue'
import AsideButton from '@/components/common/AsideButton.vue'
import FarmerSection from '@/components/farmer/FarmerSection.vue'
import Page from '@/components/common/Page.vue'
import { useFarmerStore } from '@/stores/farmer'

const farmerStore  = useFarmerStore()
const currentPage  = ref(1)
const perPage      = 9
const sortOption   = ref('date')
const searchQuery  = ref('')

// 排序
const sortedFarmers = computed(() => {
  const list = farmerStore.allFarmers
  if (sortOption.value === 'likes') {
    return [...list].sort((a, b) => b.likes - a.likes)
  }
  return [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
})

// 搜尋篩選
const filteredFarmers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return sortedFarmers.value
  return sortedFarmers.value.filter(
    f => f.farmerName.includes(q) || f.crop.toLowerCase().includes(q)
  )
})

// 分頁
const totalPages = computed(() =>
  Math.ceil(filteredFarmers.value.length / perPage)
)
const pagedFarmers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredFarmers.value.slice(start, start + perPage)
})

function scrollToFarmerTop() {
  const el = document.querySelector('.farmerSectionWrapper')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const farmerButtons = [
  { label: '所有小農', value: 'all' },
  { label: '北部', value: 'northFarmer' },
  { label: '中部', value: 'centerFarmer' },
  { label: '南部', value: 'southFarmer' },
  { label: '東部', value: 'eastFarmer' },
]

function switchFarmer(value) {
  console.log('切換分類：', value)
  currentPage.value = 1
}

function handleSearch(keyword) {
  searchQuery.value = keyword
  currentPage.value = 1
}
</script>

<style scoped>
.farmerSectionWrapper {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
.sortBar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1em 0;
  gap: 0.5em;
}
.sortBar label {
  font-weight: bold;
  color: var(--firstColor);
}
.sortBar select {
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
@media screen and (min-width: 768px) {
  .sortBar select:hover {
    background-color: var(--mainColor);
    color: var(--white);
  }
}
</style>