<template>
  <TopBar
    title="蔬果小學堂"
    :buttons="knowledgeButtons"
    searchPlaceholder="搜尋商品知識..."
    @selectButton="switchKnowledge"
    @search="handleSearch"
  />
  <template v-if="article">
    <div class="knowledgeDetailView">
      <h4>{{ article.title }}</h4>
      <div class="detailCOntainer">
        <div class="detailBox">
          <div class="pictureBox">
            <img :src="article.img" :alt="article.title" />
          </div>
          <div class="textBox">
            <p>{{ article.content.intro }}</p>
            <div
              v-for="(para, index) in article.content.paragraphs"
              :key="index" 
              class="paragraph"
            >
              <h6 class="detailQuestion">{{ para.question }}</h6>
              <p class="detailAnswer">{{ para.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="extra">
      <h5>{{ article.content.relatedProducts.title }}</h5>
      <div class="containerCards">
        <Card
          v-for="(item,index) in article.relatedCardItems"
          :key="index"
          :status="item.status"
          :porductTitle="item.productTitle"
          :sellerName="item.sellerName"
          :unit="item.unit"
          :price="item.price"
          :imgUrl="item.imgUrl"
        />
      </div>
    </div>
  </template>
  <div v-else class="notFound">
    <p>找不到這篇文章，請回到<RouterLink to="/knowledge">蔬果小學堂</RouterLink>瀏覽。</p>
  </div>
  <AsideButton />
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '@/components/common/TopBar.vue'
import Card from '@/components/common/Card.vue'
import AsideButton from '@/components/common/AsideButton.vue'
import { useKnowledgeStore } from '@/stores/knowledge'
const route = useRoute()
const router = useRouter()
const stord = useKnowledgeStore()
const article = computed(() => store.getById(route.params.id))
const knowledgeButtons = [
  { label:'所有文章',value:'all' },
  { label:'農業知識',value:'farming' },
  { label:'蔬果處理',value:'vegetable_handling' },
  { label:'飲食知識',value:'dietary_knowledge' },
  { label:'食譜',value:'recipes' },
]
const switchKnowledge = (value) => {
  store.setCategory(value)
  router.push({ name:'knowledge' })
}
const handleSearch = (keyword) => {
  store.setSearch(keyword)
  router.push({ name: 'knowledge' })
}
</script>
<style scoped>
.knowledgeDetailView{
  width: 90%;
  max-width: 1200px;
  margin: 2em auto;
  text-align: center;
  position: relative;
}
.knowledgeDetailView h4{
  text-align: justify;
}
.detailContainer{
  position: relative;
  width: 100%;
  margin: auto 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2em;
}
.detailBox{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.pictureBox img{
  width: 100%;
  height: auto;
}
.textBox{
  width: 100%;
  text-align: justify;
  padding: 0 1em;
}
.extra{
  width: 90%;
  position: relative;
  margin: 0 auto;
}
.extra h5{
  text-align: justify;
  color: var(--firstColor);
  padding: 1em 0;
}
.extra .containerCards{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2em;
  height: auto;
}
.paragraph {
  margin-top: 1.5em;
}
.notFound {
  width: 90%;
  max-width: 1200px;
  margin: 4em auto;
  text-align: center;
  color: #888;
}
.notFound a {
  color: var(--firstColor);
  text-decoration: underline;
}
@media(width > 768px){
  .detailBox{
    flex-flow: row nowrap;
  }
  .pictureBox{
    max-width: 30%;
  }
  .extra{
    max-width: 1200px;
  }
  .extra h5{
    padding: 1em 0 1em 2em;
  }
  .extra .containerCards{
    flex-flow: row nowrap;
  }
}
</style>