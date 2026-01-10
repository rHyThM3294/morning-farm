<template>
  <section class="seasonBlock">
    <div class="seasonButtons">
      <button
        v-for="s in seasonList"
        :key="s.value"
        class="seasonBtn"
        :class="{ active: currentSeason === s.value }"
        @click="selectSeason(s.value)"
      >
        {{ s.label }}
      </button>
    </div>
    <SeasonChart
      :seasonChartData="seasonChartData"
      @selectProduct="handleProductClick"
    />
    <div ref="cardsContainer" class="seasonCards" v-if="displayProducts.length > 0">
      <Card
        v-for="p in displayProducts"
        :key="p.id"
        :ref="el => { if (el) productRefs[p.id] = el }"
        :id="String(p.id)"
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
    <p v-else class="noProducts">目前此季節暫無產品 🌱</p>
  </section>
</template>
<script setup>
import { ref, computed, watch, nextTick, onBeforeUpdate, onMounted } from 'vue'
import gsap from "gsap";
import Card from '@/components/common/Card.vue'
import SeasonChart from './SeasonChart.vue'
import { useProductStore } from '@/stores/product'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
const productStore = useProductStore()
const props = defineProps({
  selectedProductId: String
})
const emit = defineEmits(['productSelected'])
const seasonChartData = computed(() => productStore.seasonChartData)
onMounted(() => {
  console.log('🔍 SeasonBlock mounted')
  console.log('📊 seasonChartData:', seasonChartData.value)
  console.log('🛒 allProducts count:', productStore.allProducts.length)
})
const seasonList = [
  { label: '春', value: 'spring' },
  { label: '夏', value: 'summer' },
  { label: '秋', value: 'autumn' },
  { label: '冬', value: 'winter' }
]
const currentSeason = ref('spring')
const selectedProduct = ref(null)
function selectSeason(season) {
  currentSeason.value = season;
  selectedProduct.value = null;
  emit('productSelected', null);
  nextTick(() => {
    scrollToCards(-200);
  });
}
const displayProducts = computed(() => {
  if (selectedProduct.value) {
    return productStore.getProductsBySeries(selectedProduct.value)
  }
  const bySeason = productStore.getProductsBySeason(currentSeason.value)
  if (bySeason.length > 0) return bySeason  
  return []
})
const cardsContainer = ref(null)
const productRefs = {}
onBeforeUpdate(() => {
  Object.keys(productRefs).forEach(key => delete productRefs[key])
})
function handleProductClick(item){
  selectedProduct.value = item.id
  emit('productSelected', item.id)
  nextTick(() => {
    scrollToCards()
  })
}
function scrollToCards(offset = -200){
  nextTick(() => {
    const el = cardsContainer.value;
    if (!el) {
      console.warn("scrollToCards：找不到 cardsContainer");
      return;
    }
    const rect = el.getBoundingClientRect();
    const targetY = window.scrollY + rect.top + offset;
    gsap.to(window,{
      duration: 0.8,
      scrollTo: targetY,
      ease: "power3.out",
    });
  });
}
watch(() => props.selectedProductId, (newVal) => {
  if (newVal) {
    selectedProduct.value = newVal
  }
})
</script>

<style scoped>
.seasonBlock{
  width: 100%;
  margin: 0 auto;
  padding: 1.5em 0;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}
.seasonButtons{
  display: flex;
  justify-content: center;
  gap: 1em;
  flex-wrap: wrap;
}
.seasonBtn{
  padding: 0.5em 1.5em;
  border: 1px solid var(--mainColor);
  background: var(--white);
  border-radius: 999px;
  cursor: pointer;
  color: var(--mainColor);
  transition: var(--transitionNormal);
}
.seasonBtn.active{
  background: var(--mainColor);
  color: var(--white);
  font-weight: 700;
}
.seasonBtn:hover:not(.active){
  background: var(--backgroundColor);
}
.seasonCards{
  padding:0;
  margin: 0;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  scroll-margin-top: 100px;
}
.noProducts{
  text-align: center;
  margin-top: 1em;
  color:var(--gray);
}
@media(min-width: 768px){
  .seasonCards{
    flex-flow: row wrap;
    justify-content: center;
  }
}
</style>