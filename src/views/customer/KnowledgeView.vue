<template>
  <TopBar 
    title="蔬果小學堂"
    :buttons="knowledgeButtons"
    searchPlaceholder="搜尋商品知識..."
    @selectButton="switchKnowledge"
    @search="handleSearch"
  />
  <div class="knowledgeBlock">
    <KnowledgeCard
      v-for="item in list"
      :key="item.id"
      :to="{ name: 'knowledge-detail', params: { id: item.id } }"
      :imageUrl="item.image"
      :word="item.title"
      :tags="item.tags"
    />
  </div>
  <AsideButton />
</template>
<script setup>
import { ref } from 'vue'
import TopBar from '../../components/common/TopBar.vue'
import AsideButton from '../../components/common/AsideButton.vue'
import Page from '../../components/common/Page.vue'   
import KnowledgeCard from '../../components/common/KnowledgeCard.vue'
const totalPages = ref(4)
const currentPage = ref(1)
const knowledgeButtons = [
  { label: '所有文章', value: 'all' },
  { label: '農業知識', value: 'farming' },
  { label: '蔬果處理', value: 'vegetable_handling' },
  { label: '飲食知識', value: 'dietary_knowledge' },
  { label: '食譜', value: 'recipes' }
]
const list = [
  {
    id: 1,
    title: '裂果蓮霧更好吃？原來是熟到剛剛好！教你安心吃的處理方法',
    image: `${import.meta.env.BASE_URL}image/S__20611108.png`,
    tags: [
      { label: '蔬果處理', to: '/tag/produce' },
      { label: '蓮霧', to: '/tag/wax-apple' }
    ]
  },
  {
    id: 2,
    title: '芭樂挑選與冷藏方法',
    image: `${import.meta.env.BASE_URL}image/S__20611108.png`,
    tags: [
      { label: '蔬果處理', to: '/tag/produce' },
      { label: '芭樂', to: '/tag/guava' }
    ]
  }
]
const switchKnowledge = (value) => {
  console.log('切換分類：', value)
}
const handleSearch = (keyword) => {
  console.log('搜尋關鍵字：', keyword)
}
</script>
<style scoped>
.knowledgeBlock{
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1.5em auto;
  width: 90%;
  max-width: 1200px;
}
.paginationBlock{
  margin: 2em auto;
  text-align: center;
}
</style>
