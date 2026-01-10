<template>
  <TopBar 
    title="蔬果小學堂"
    :buttons="knowledgeButtons"
    searchPlaceholder="搜尋商品知識..."
    @selectButton="switchKnowledge"
    @search="handleSearch"
  />
  <div class="knowledgeDetailView">
    <h4>裂果蓮霧更好吃？原來是熟到剛剛好！教你安心吃的處理方法</h4>
    <div class="detailContainer">
      <div class="detailBox">
        <div class="pictureBox"><img src="/image/S__20611108.png" alt=""></div>
        <div class="textBox">
          <p>走進果園或市場，你或許會看到一些「裂果」的蓮霧──表皮出現自然的裂痕，不如市售光滑漂亮的果實那樣討喜。但其實，這些裂果蓮霧往往是最甜、最剛好熟成的美味代表！</p>
          <div class="paragraph">
            <h6 class="detailQuestion">為什麼蓮霧會裂果？</h6>
            <p class="detailAnswer">裂果多半發生在蓮霧成熟期遇到雨水，果實吸水過多、膨脹迅速，導致表皮來不及延展而自然開裂。這不是病蟲害，也不是腐爛的象徵，而是一種天然的「熟成指標」。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="extra">
    <h5>來這裡購買蓮霧：</h5>
    <div class="containerCards">
      <Card
        v-for="(item, index) in cardItems"
        :key="index"
        :status="item.status"
        :productTitle="item.productTitle"
        :sellerName="item.sellerName"
        :unit="item.unit"
        :price="item.price"
        :imageUrl="item.imageUrl"
      />
    </div>
  </div>
  <AsideButton />
</template>
<script setup>
import { useRoute } from 'vue-router'
import TopBar from '../../components/common/TopBar.vue'
import Card from '../../components/common/Card.vue'
import AsideButton from '../../components/common/AsideButton.vue'
const route = useRoute()
const title = '蓮霧清洗與保存技巧'
const image = '/image/S__20611108.jpg'
const tags = [
  { label: '蔬果處理', to: '/tag/produce' },
  { label: '蓮霧', to: '/tag/wax-apple' }
]
const knowledgeButtons = [
  { label: '所有文章', value: 'all' },
  { label: '農業知識', value: 'farming' },
  { label: '蔬果處理', value: 'vegetable_handling' },
  { label: '飲食知識', value: 'dietary_knowledge' },
  { label: '食譜', value: 'recipes' }
]
const cardItems = [
  {
    status: 'New',
    productTitle: '黑珍珠蓮霧',
    sellerName: '王建國果園',
    unit: '6 顆 / 盒',
    price: '180',
    imageUrl: '/image/chinese-pear.png'
  },
  {
    status: 'Hot',
    productTitle: '大武蓮霧',
    sellerName: '林家果園',
    unit: '10 顆 / 箱',
    price: '420',
    imageUrl: '/image/chinese-pear.png'
  },
  {
    status: 'New',
    productTitle: '蜜甜蓮霧',
    sellerName: '陳媽媽水果舖',
    unit: '12 顆 / 箱',
    price: '390',
    imageUrl: '/image/chinese-pear.png'
  }
]
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
@media screen and (min-width:768px){
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
