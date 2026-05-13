<template>
  <div class="homeView">
    <section class="banner" :style="bannerStyle">
      <div ref="bannerWordsRef" class="bannerWords">
        <h3 ref="line1Ref">
          <span v-for="(char, i) in line1Chars" :key="'l1-'+i" class="char-span">{{ char }}</span>
        </h3>
        <h3 ref="line2Ref">
          <span v-for="(char, i) in line2Chars" :key="'l2-'+i" class="char-span">{{ char }}</span>
        </h3>
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useProductStore } from '@/stores/product'
import gsap from 'gsap'
import Card from '@/components/common/Card.vue';
import Partition from '@/components/ui/Partition.vue';
import FarmerSection from '@/components/farmer/FarmerSection.vue';
import Lead from '@/components/common/Lead.vue';
import Produce from '@/components/common/Produce.vue';
import WeekFarmerIntroduction from '@/components/farmer/WeekFarmerIntroduction.vue';
import Question from '@/components/product/Question.vue';
import AsideButton from '@/components/common/AsideButton.vue';
// ── 文字拆字 ───────────────────────────────────────────────────────────────
const line1Chars = '從田間到餐桌'.split('')
const line2Chars = '每一口都是用心'.split('')
// ── Refs ───────────────────────────────────────────────────────────────────
const bannerWordsRef   = ref(null)
const line1Ref         = ref(null)
const line2Ref         = ref(null)
const categoryRef      = ref(null)
const weekTitleRef     = ref(null)
const containerCardRef = ref(null)
const moreProductsRef  = ref(null)
// bannerWords 不套 ScrollReveal，改由 Loading 結束事件驅動
useScrollReveal(categoryRef,      { childSelector: ':scope > *', stagger: 0.15 })
useScrollReveal(weekTitleRef,     { y: 24 })
useScrollReveal(containerCardRef, { childSelector: ':scope > *', stagger: 0.12 })
useScrollReveal(moreProductsRef,  { y: 20 })
// ──────────────────────────────────────────────────────────────────────────
const BASE = import.meta.env.BASE_URL || "/";
const bannerImageUrl = `${BASE}image/bannerHero.png`
const bannerLoaded = ref(false)
const runBannerAnimation = async () => {
  const words = bannerWordsRef.value
  if (!words) return
  const allSpans = words.querySelectorAll('.char-span')
  // ── 階段一：橫向打字 ──────────────────────────────────────────────────
  // 切換成橫向
  words.classList.add('is-horizontal')
  gsap.set(allSpans, { opacity: 0 })
  const TYPING_DURATION   = 0.18   // 每個字淡入時長 (s)
  const TYPING_STAGGER    = 0.13   // 每個字之間間距 (s)，可讓整體打字感更真實
  const LINE2_DELAY       = 1.1    // 第二行延遲開始 (s)，讓兩行加起來共 ~2.5s
  const line1Spans = line1Ref.value?.querySelectorAll('.char-span') ?? []
  gsap.to(line1Spans, {
    opacity: 1,
    duration: TYPING_DURATION,
    stagger: TYPING_STAGGER,
    ease: 'none',
  })
  const line2Spans = line2Ref.value?.querySelectorAll('.char-span') ?? []
  gsap.to(line2Spans, {
    opacity: 1,
    duration: TYPING_DURATION,
    stagger: TYPING_STAGGER,
    ease: 'none',
    delay: LINE2_DELAY,
  })
  // 等打字動畫播完
  await new Promise(r => setTimeout(r, 2500))
  // ── 階段二：FLIP 歸位（橫→縱）──────────────────────────────────────────
  // Step 1：記錄每個字在橫排下的螢幕位置（起點）
  const startRects = Array.from(allSpans).map(el => el.getBoundingClientRect())
  // Step 2：切換回縱向排版，讓瀏覽器算出最終排版
  words.classList.remove('is-horizontal')
  // Step 3：等 Vue / 瀏覽器完成 layout
  await nextTick()
  // 強制 reflow 確保 getBoundingClientRect 拿到新位置
  void words.offsetHeight
  // Step 4：記錄縱排下每個字的位置（終點）
  const endRects = Array.from(allSpans).map(el => el.getBoundingClientRect())
  // Step 5：計算每個字需要從哪裡出發（起點相對終點的偏移），
  //         用 GSAP 瞬間把字放回「起點視覺位置」，再 animate 到 0
  allSpans.forEach((el, i) => {
    const dx = startRects[i].left - endRects[i].left
    const dy = startRects[i].top  - endRects[i].top
    gsap.fromTo(
      el,
      { x: dx, y: dy, opacity: 1 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        // 最後清掉 inline transform，讓縱向 CSS 完全接管
        clearProps: 'transform',
      }
    )
  })
}
// ── Loading 結束事件監聽 ─────────────────────────────────────────────────
// Loading.vue 的 finishLoading() 會 dispatch 'loading-done' CustomEvent
// 若沒有 Loading 動畫（如從後臺回來第二次），直接啟動
let loadingDoneHandler = null
onMounted(() => {
  const img = new Image()
  img.onload  = () => { bannerLoaded.value = true }
  img.onerror = () => { bannerLoaded.value = true }
  img.src = bannerImageUrl
  // char-span 的 opacity:0 已由 CSS 預設處理，不需在這裡用 JS 補設
  // 這樣可避免 nextTick 前短暫閃現的問題
  loadingDoneHandler = () => { runBannerAnimation() }
  window.addEventListener('loading-done', loadingDoneHandler)
  // Loading.vue 在 onMounted 時會設定 'bannerShouldWait' 旗標，
  // 代表本次頁面載入有 Loading 動畫，HomeView 應等待 loading-done 事件。
  // 若沒有 'bannerShouldWait'，代表是從其他頁切回來，直接播動畫。
  const shouldWait = sessionStorage.getItem('bannerShouldWait')
  if (!shouldWait) {
    setTimeout(() => { runBannerAnimation() }, 300)
  }
})
onBeforeUnmount(() => {
  if (loadingDoneHandler){
    window.removeEventListener('loading-done', loadingDoneHandler)
  }
})
// ──────────────────────────────────────────────────────────────────────────
const bannerStyle = computed(() => ({
  backgroundImage: bannerLoaded.value ? `url(${bannerImageUrl})` : 'none',
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: bannerLoaded.value ? 'transparent' : 'var(--firstColor, #5c7a4e)',
  transition: 'background-image 0.3s ease'
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
/*
  打字階段的橫向排版：
  - writing-mode 切回水平，讓兩行文字橫向顯示在畫面中央
  - 動畫結束後由 JS 移除此 class，恢復縱向
*/
section.banner .bannerWords.is-horizontal {
    writing-mode: horizontal-tb;
    text-orientation: mixed;
    right: unset;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: flex-start;
    gap: 0.4em;
    letter-spacing: 0;
}
/* h3 本身也要明確覆寫 writing-mode，否則會繼承父層縱排影響寬度計算 */
section.banner .bannerWords.is-horizontal h3 {
    writing-mode: horizontal-tb;
    white-space: nowrap;
    word-spacing: normal;
    /* 375px 裝置：7字 × 最小字體需 ≤ 53px，clamp 確保不換行 */
    font-size: clamp(20px, 8.5vw, 32px);
}
/* 每個字的 span：FLIP 動畫時 transform 由 GSAP 控制，需要 inline-block */
.bannerWords h3 {
    margin: 0;
    word-spacing: -1em;
}
.bannerWords h3 .char-span {
    word-spacing: normal;
    display: inline-block;
    /* 預設隱藏，由 GSAP 控制出場，避免 JS onMounted 前短暫閃現 */
    opacity: 0;
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