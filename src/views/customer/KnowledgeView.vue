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
      v-for="item in filteredList"
      :key="item.id"
      :to="{ name: 'knowledge-detail', params: { id: item.id } }"
      :imageUrl="base + item.image"
      :word="item.title"
      :tags="item.tags"
    />
    <p v-if="filteredList.length === 0" class="emptyHint">目前沒有符合條件的文章</p>
  </div>
  <AsideButton />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import TopBar from '@/components/common/TopBar.vue'
import AsideButton from '@/components/common/AsideButton.vue'
import KnowledgeCard from '@/components/common/KnowledgeCard.vue'
import { useKnowledgeStore } from '@/stores/knowledge'

const base = import.meta.env.BASE_URL

const store = useKnowledgeStore()
const { filteredList } = storeToRefs(store)

const knowledgeButtons = [
  { label: '所有文章', value: 'all' },
  { label: '農業知識', value: 'farming' },
  { label: '蔬果處理', value: 'vegetable_handling' },
  { label: '飲食知識', value: 'dietary_knowledge' },
  { label: '食譜', value: 'recipes' }
]

const switchKnowledge = (value) => {
  store.setCategory(value)
}

const handleSearch = (keyword) => {
  store.setSearch(keyword)
}
</script>

<style scoped>
.knowledgeBlock {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1.5em auto;
  width: 90%;
  max-width: 1200px;
}
.emptyHint {
  text-align: center;
  color: #999;
  padding: 2em 0;
}
</style>