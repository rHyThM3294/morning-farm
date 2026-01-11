<template>
  <div class="homeView">
    <section class="banner" :style="bannerStyle">
      <div class="bannerWords">
        <h3 class="right">從田間到餐桌</h3>
        <h3 class="left">每一口都是用心</h3>
      </div>
    </section>
    <Partition />
    <section class="category">
      <Lead />
      <Produce />
    </section>
    <section class="thisWeekFresh">
      <h2>本週新鮮現採</h2>
      <div class="containerCard">
        <Card
          v-for="(product, i) in weekProducts"
          :key="product.id"
          v-bind="product"
        />
      </div>
      <div class="moreProducts">
          <button 
            type="button" 
            class="toAllproducts" 
            @click="goAllProducts"
          >
            我想看更多&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-arrow-right-long"></i>
          </button>
      </div>
    </section>
    <Partition />
    <FarmerSection />
    <WeekFarmerIntroduction />
    <Question />
    <AsideButton />
  </div>
</template>
<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useProductStore } from '../../stores/product'
import Card from '../../components/common/Card.vue';
import Partition from '../../components/ui/Partition.vue';
import FarmerSection from '../../components/farmer/FarmerSection.vue';
import Lead from '../../components/common/lead.vue';
import Produce from '../../components/common/Produce.vue';
import WeekFarmerIntroduction from '../../components/farmer/WeekFarmerIntroduction.vue';
import Question from '../../components/product/question.vue';
import AsideButton from '../../components/common/AsideButton.vue';

const BASE = import.meta.env.BASE_URL || "/";
const bannerStyle = computed(() => ({
  backgroundImage: `url(${BASE}image/bannerHero.png)`,
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}));

const router = useRouter()
const productStore = useProductStore()
const handleKey = (e) => {
  if (e.key.toLowerCase() === 'l'){
    router.push('/admin/login') 
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
const weekProducts = computed(() => {
  return [...productStore.allProducts]
    .filter(p => p.stock > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
})
function goAllProducts(){
  router.push({ name: "products" });
}
</script>
<style scoped>
  /* section banner */
section.banner {
    background-size: cover;
    width: 100%;
    height: 100vh;
    position: relative;
}
section.banner .bannerWords {
    color: var(--backgroundColor);
    position: absolute;
    top: 25%;
    right: 1.5em;
    writing-mode: vertical-rl;
    /* 文字由上往下，從右到左 */
    text-orientation: upright;
    /* 每個字保持正立，不旋轉 */
    line-height: 1em;
}
/* .bannerWords h3{} */
.bannerWords h3.left {
    margin: 1.2em 1.2em 0 0;
}
.thisWeekFresh{
  width: 90%;
  position: relative;
  margin: 0 auto 10em auto;
}
.thisWeekFresh h2{
  text-align: center;
  color: var(--firstColor);
  margin: 0.5em 0;
}
.containerCard{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
}
.moreProducts{
  width: 100%;
  height: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toAllproducts{
  cursor: pointer;
  padding: 0.8em 2.5em;
  border: 0;
  border-radius: var(--radiusLarge);
  color: var(--black);
  background-color: var(--backgroundColor);
  transition: var(--transitionNormal);
}
@media screen and (min-width:768px){
  .thisWeekFresh{
    max-width: 1200px;
  }
  .containerCard{
    flex-flow: row nowrap;
  }
  .toAllproducts:hover{
    color: var(--white);
    background-color: var(--mainColor);
  }
}
</style>