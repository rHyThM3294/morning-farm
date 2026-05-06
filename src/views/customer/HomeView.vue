<template>
  <div class="homeView">
    <section class="banner" :style="bannerStyle">
      <div ref="bannerWordsRef" class="bannerWords">
        <h3>從田間到餐桌</h3>
        <h3>每一口都是用心</h3>
      </div>
    </section>
    <Partition />
    <section ref="categoryRef" class="category">
      <Lead />
      <Produce />
    </section>
    <section class="thisWeekFresh">
      <h2 ref="weekTitleRef">本週新鮮現採</h2>
      <div ref="containerCardRef" class="containerCard">
        <Card
          v-for="(product, i) in weekProducts"
          :key="product.id"
          v-bind="product"
        />
      </div>
      <div ref="moreProductsRef" class="moreProducts">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useProductStore } from '@/stores/product'
import Card from '@/components/common/Card.vue';
import Partition from '@/components/ui/Partition.vue';
import FarmerSection from '@/components/farmer/FarmerSection.vue';
import Lead from '@/components/common/Lead.vue';
import Produce from '@/components/common/Produce.vue';
import WeekFarmerIntroduction from '@/components/farmer/WeekFarmerIntroduction.vue';
import Question from '@/components/product/Question.vue';
import AsideButton from '@/components/common/AsideButton.vue';

// ── Scroll Reveal ──────────────────────────────────────────────────────────
const bannerWordsRef   = ref(null)
const categoryRef      = ref(null)
const weekTitleRef     = ref(null)
const containerCardRef = ref(null)
const moreProductsRef  = ref(null)

useScrollReveal(bannerWordsRef,   { y: 30, duration: 0.8, start: 'top 90%' })
useScrollReveal(categoryRef,      { childSelector: ':scope > *', stagger: 0.15 })
useScrollReveal(weekTitleRef,     { y: 24 })
useScrollReveal(containerCardRef, { childSelector: ':scope > *', stagger: 0.12 })
useScrollReveal(moreProductsRef,  { y: 20 })
// ──────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL || "/";
const bannerStyle = computed(() => ({
  backgroundImage: `url(${BASE}image/bannerHero.png)`,
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}));

const router = useRouter()
const productStore = useProductStore()
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
    top: 50%;
    right: 2em;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 1em;
    writing-mode: vertical-rl;
    text-orientation: upright;
    line-height: 1.4;
    letter-spacing: 0.08em;
}
.bannerWords h3 {
    margin: 0;
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