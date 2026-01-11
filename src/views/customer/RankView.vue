<template>
  <section class="rank-page">
    <TopBar
      title="暢銷排行榜"
      :buttons="rankButtons"
      searchPlaceholder="搜尋商品名稱..."
      @selectButton="switchRanking"
      @search="handleSearch"
    />
    <div class="container">
      <Card
        v-for="(item, index) in filteredProducts"
        :key="item.id"
        :id="item.id"
        :status="item.status"
        :productTitle="item.productTitle"
        :sellerName="item.sellerName"
        :unit="item.unit"
        :price="item.price"
        :imageUrl="item.imageUrl"
      />
    </div>
  </section>
  <AsideButton />
</template>
<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import TopBar from '@/components/common/TopBar.vue'
import Card from '@/components/common/Card.vue'
import AsideButton from '@/components/common/AsideButton.vue'
const productStore = useProductStore()
const rankButtons = [
  { label: '日排行', value: 'day' },
  { label: '週排行', value: 'week' },
  { label: '月排行', value: 'month' },
  { label: '年排行', value: 'year' }
]
const currentRank = ref('day')
const searchText = ref('')
const rankedProducts = computed(() => {
  const list = [...productStore.allProducts]
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  if (currentRank.value === 'day')   return list.slice(0, 6)
  if (currentRank.value === 'week')  return list.slice(6, 12)
  if (currentRank.value === 'month') return list.slice(12, 18)
  if (currentRank.value === 'year')  return list.slice(18, 24)
  return list
})
const filteredProducts = computed(() => {
  if (!searchText.value) return rankedProducts.value
  return rankedProducts.value.filter(p =>
    p.productTitle.includes(searchText.value) ||
    p.sellerName.includes(searchText.value)
  )
})
function switchRanking(type){
  currentRank.value = type
}
function handleSearch(keyword){
  searchText.value = keyword
}
</script>
<style scoped>
.rank-page{
  width: 100%;
  text-align: center;
  padding-bottom: 4em;
  overflow-x: hidden;
}
.container{
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 2em;
  margin-top: 2em;
}
@media(width>=768px){
  .container{
    max-width: 1200px;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
  }
}
</style>
