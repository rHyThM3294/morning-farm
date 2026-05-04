<template>
  <Transition name="loading-fade">
    <section
      v-if="showLoading"
      class="loading-overlay"
      :class="{ 'is-expanding': isExpanding, 'morning-mode': showMorning }"
    >
      <div class="content-layer" ref="contentLayerEl">
        <div class="text-container good-container" v-show="!showMorning" ref="goodEl">
          <span class="text-good">Good</span>
        </div>
        <div class="text-container morning-container" v-show="showMorning">
          <span class="text-morning">morning</span>
        </div>
      </div>
    </section>
  </Transition>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
// 用 useRouter 取得 currentRoute，比 useRoute() 在跨元件監聽更可靠
const router         = useRouter()
const goodEl         = ref(null)
const contentLayerEl = ref(null)
const showLoading    = ref(false)
const showMorning    = ref(false)
const isExpanding    = ref(false)
let timeouts         = []
const clearAllTimeouts = () => { timeouts.forEach(clearTimeout); timeouts = [] }
const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}
// ── 結束動畫 ─────────────────────────────────────────────────────────────
// 播完主動清 flag → 讓下一次重整可以再播
const finishLoading = () => {
  showLoading.value = false
  unlockScroll()
  sessionStorage.removeItem('loadingPlayed')
}
// ── 動畫主體 ─────────────────────────────────────────────────────────────
const startLoadingAnimation = () => {
  // 防止重複觸發
  if (showLoading.value) return
  showLoading.value = true
  showMorning.value = false
  isExpanding.value = false
  clearAllTimeouts()
  lockScroll()
  const MORPH_START            = 1500  // ms
  const GOOD_FADE_DURATION     = 1.0   // gsap 秒
  const MORNING_DELAY          = 1000  // ms
  const MORNING_SCALE_DURATION = 0.6   // gsap 秒
  timeouts.push(setTimeout(() => {
    if (!goodEl.value) return
    gsap.to(goodEl.value, { opacity: 0, duration: GOOD_FADE_DURATION })
  }, MORPH_START))
  timeouts.push(setTimeout(() => {
    showMorning.value = true
    nextTick(() => {
      if (!contentLayerEl.value) return
      gsap.fromTo(
        contentLayerEl.value,
        { '--mask-scale': 0.2 },
        { '--mask-scale': 1, duration: MORNING_SCALE_DURATION, ease: 'back.out(0.5)' }
      )
    })
  }, MORPH_START + MORNING_DELAY))
  timeouts.push(setTimeout(() => { isExpanding.value = true }, 4000))
  timeouts.push(setTimeout(() => { finishLoading() }, 5000))
}
// ── 鍵盤跳過（按 K） ─────────────────────────────────────────────────────
const skipHandler = (e) => {
  if (e.key && e.key.toLowerCase() === 'k') {
    clearAllTimeouts()
    finishLoading()
  }
}
// ── 觸發邏輯 ─────────────────────────────────────────────────────────────
//
// 設計原則：
//   只有在首頁（/）才播放 Loading 動畫
//   播完後清掉 flag → 下次重整沒有 flag → 再播 → 形成「每次重整都播」的效果
//
// 觸發時機 A：頁面第一次載入 / 重整（onMounted）
// 觸發時機 B：從後台登出，切回首頁（watch router.currentRoute）
// 用 router.afterEach 來監聽路由切換，比 watch(route) 更可靠
// 因為 afterEach 是在路由切換完成後觸發，route.path 已是新值
let routeUnwatch = null
onMounted(() => {
  window.addEventListener('keydown', skipHandler)
  // 觸發時機 A：重整 / 首次進入
  const currentPath = router.currentRoute.value.path
  if (currentPath === '/'){
    const alreadyPlayed = sessionStorage.getItem('loadingPlayed')
    if (!alreadyPlayed){
      sessionStorage.setItem('loadingPlayed', 'true')
      startLoadingAnimation()
    }
  }
  // 觸發時機 B：用 router.afterEach 監聽「切換到首頁」的動作
  // afterEach 在路由完成後觸發，比 watch(route.path) 時序更穩定
  routeUnwatch = router.afterEach((to) => {
    if (to.path === '/'){
      const shouldPlay = sessionStorage.getItem('playHomeLoading')
      if (shouldPlay === 'true'){
        sessionStorage.removeItem('playHomeLoading')
        sessionStorage.removeItem('loadingPlayed') // 清掉防重播 flag
        nextTick(() => {
          startLoadingAnimation()
        })
      }
    }
  })
})
onBeforeUnmount(() => {
  clearAllTimeouts()
  unlockScroll()
  window.removeEventListener('keydown', skipHandler)
  if (routeUnwatch) routeUnwatch() // 取消 afterEach 監聽
})
</script>
<style scoped>
.loading-overlay{
  isolation: isolate;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 10000;
  pointer-events: all;
}
.loading-fade-enter-active,.loading-fade-leave-active{
  transition: opacity 0.3s ease;
}
.loading-fade-enter-from,.loading-fade-leave-to{
  opacity: 0;
}
.content-layer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backgroundColor);
  --mask-scale: 1;
}
.loading-overlay.morning-mode .content-layer{
  -webkit-mask-image:
    linear-gradient(var(--white), var(--white)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400"><text x="500" y="240" text-anchor="middle" dominant-baseline="middle" font-size="180" font-weight="700" font-family="Georgia, serif">morning</text></svg>');
  mask-image:
    linear-gradient(var(--white), var(--white)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400"><text x="500" y="240" text-anchor="middle" dominant-baseline="middle" font-size="180" font-weight="700" font-family="Georgia, serif">morning</text></svg>');
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  -webkit-mask-size: cover, calc(100% * var(--mask-scale));
  mask-size: cover, calc(100% * var(--mask-scale));
  -webkit-mask-position: center, center;
  mask-position: center, center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
.text-container{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.good-container{
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.text-good{
  font-size: clamp(48px, 12vw, 96px);
  font-weight: 300;
  letter-spacing: 0.05em;
  color: #333;
  font-family: 'Georgia', 'Times New Roman', serif;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #333;
  width: 0;
  animation:
    typing 1s steps(4, end) forwards,
    blinkCursor 0.75s step-end infinite;
}
@keyframes typing{
  from { width: 0; }
  to   { width: 4ch; }
}
@keyframes blinkCursor{
  0%, 100% { border-color: #333; }
  50%       { border-color: transparent; }
}
.morning-container{
  opacity: 0;
  pointer-events: none;
}
.text-morning{
  font-size: clamp(60px, 15vw, 180px);
  font-weight: 700;
  font-family: 'Georgia', 'Times New Roman', serif;
  color: transparent;
}
.loading-overlay.is-expanding .content-layer{
  animation: morningExpand 1s ease-in forwards;
}
@keyframes morningExpand {
  0%   { transform: scale(1); }
  100% { transform: scale(10); }
}
@media (width >= 768px){
  .text-good    { font-size: clamp(64px, 8vw, 120px); }
  .text-morning { font-size: clamp(80px, 12vw, 200px); }
}
@media (width >= 1024px){
  .text-good    { font-size: clamp(80px, 6vw, 140px); }
  .text-morning { font-size: clamp(100px, 10vw, 240px); }
}
</style>
