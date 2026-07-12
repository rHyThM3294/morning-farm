<template>
  <Transition name="loading-fade">
    <section
      v-if="showLoading"
      class="loading-overlay"
      ref="overlayEl"
    >
      <!-- 夜空 → 晨光 兩層背景交叉淡化 -->
      <div class="sky sky-night"></div>
      <div class="sky sky-day" ref="skyDayEl"></div>

      <!-- 星星，隨天空亮起淡出 -->
      <div class="stars" ref="starsEl">
        <span
          v-for="s in stars"
          :key="s.id"
          class="star"
          :style="{ left: s.left + '%', top: s.top + '%', animationDelay: s.delay + 's' }"
        ></span>
      </div>

      <!-- 太陽，從地平線緩緩升起 -->
      <div class="sun" ref="sunEl"></div>
      <div class="horizon"></div>

      <!-- 品牌文字，逐字浮現 -->
      <div class="brand" ref="brandEl">
        <span class="brand-title">
          <span
            v-for="(ch, i) in titleChars"
            :key="'t' + i"
            class="char"
          >{{ ch }}</span>
        </span>
        <span class="brand-sub" ref="subEl">MORNING FARM</span>
      </div>
    </section>
  </Transition>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router      = useRouter()
const overlayEl   = ref(null)
const skyDayEl    = ref(null)
const starsEl     = ref(null)
const sunEl       = ref(null)
const brandEl     = ref(null)
const subEl       = ref(null)
const showLoading = ref(false)
const titleChars  = [...'清晨農鋪']

// 星星隨機分布，只在掛載時算一次
const stars = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 65,
  delay: Math.random() * 2,
}))

let tl = null

const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

// ── 結束動畫 ─────────────────────────────────────────────────────────────
const finishLoading = () => {
  showLoading.value = false
  unlockScroll()
  sessionStorage.removeItem('loadingPlayed')
  window.dispatchEvent(new CustomEvent('loading-done'))
}

// ── 動畫主體：單一 timeline，日出 → 品牌字浮現 → 光圈擴散轉場 ──────────────
const startLoadingAnimation = async () => {
  if (showLoading.value) return
  showLoading.value = true
  lockScroll()
  await nextTick()
  if (!overlayEl.value) return
  // 每次播放前重置狀態
  gsap.set(overlayEl.value, { '--iris-r': 150 })
  gsap.set(sunEl.value, { top: '92%', opacity: 0 })
  gsap.set(skyDayEl.value, { opacity: 0 })
  gsap.set(starsEl.value, { opacity: 1 })
  gsap.set(brandEl.value.querySelectorAll('.char'), { opacity: 0, y: 24 })
  gsap.set(subEl.value, { opacity: 0, y: 10, letterSpacing: '0.05em' })

  tl = gsap.timeline({ onComplete: finishLoading })

  tl.to(sunEl.value, { opacity: 1, duration: 0.4 }, 0)
    .to(sunEl.value, { top: '38%', duration: 1.8, ease: 'power2.out' }, 0)
    .to(skyDayEl.value, { opacity: 1, duration: 1.8, ease: 'power1.inOut' }, 0)
    .to(starsEl.value, { opacity: 0, duration: 0.8, ease: 'power1.in' }, 0)
    .to(
      brandEl.value.querySelectorAll('.char'),
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' },
      0.9
    )
    .to(subEl.value, { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.7, ease: 'power2.out' }, 1.3)
    // 停留 0.6s 讓畫面被看見，再以太陽為中心光圈擴散轉場
    .to(overlayEl.value, { '--iris-r': 0, duration: 0.9, ease: 'power3.inOut' }, '+=0.6')
}

// ── 鍵盤跳過（按 K） ─────────────────────────────────────────────────────
const skipHandler = (e) => {
  if (e.key && e.key.toLowerCase() === 'k') {
    tl?.kill()
    finishLoading()
  }
}

// ── 觸發邏輯：只有首頁、且這個 session 還沒播過才播 ─────────────────────
onMounted(() => {
  window.addEventListener('keydown', skipHandler)
  const currentPath = router.currentRoute.value.path
  if (currentPath === '/') {
    const alreadyPlayed = sessionStorage.getItem('loadingPlayed')
    if (!alreadyPlayed) {
      sessionStorage.setItem('loadingPlayed', 'true')
      startLoadingAnimation()
    }
  }
})
onBeforeUnmount(() => {
  tl?.kill()
  unlockScroll()
  window.removeEventListener('keydown', skipHandler)
})
</script>
<style scoped>
.loading-overlay{
  --iris-r: 150;
  isolation: isolate;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 10000;
  pointer-events: all;
  clip-path: circle(calc(var(--iris-r) * 1%) at 50% 42%);
}
.loading-fade-enter-active,.loading-fade-leave-active{
  transition: opacity 0.3s ease;
}
.loading-fade-enter-from,.loading-fade-leave-to{
  opacity: 0;
}

/* ── 天空 ────────────────────────────────────────────── */
.sky{
  position: absolute;
  inset: 0;
}
.sky-night{
  background: linear-gradient(180deg, #0b1026 0%, #1b2a4a 55%, #2b3a5c 100%);
}
.sky-day{
  background: linear-gradient(180deg, #ff9a56 0%, #ffb56b 35%, #ffd89b 70%, #fff3d6 100%);
}

/* ── 星星 ────────────────────────────────────────────── */
.stars{
  position: absolute;
  inset: 0;
}
.star{
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #fff;
  animation: twinkle 2.4s ease-in-out infinite;
}
@keyframes twinkle{
  0%, 100% { opacity: 0.25; }
  50%      { opacity: 1; }
}

/* ── 太陽 ────────────────────────────────────────────── */
.sun{
  position: absolute;
  left: 50%;
  top: 92%;
  width: clamp(90px, 16vw, 180px);
  height: clamp(90px, 16vw, 180px);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at 35% 35%, #fff6e0, #ffcf70 55%, #ff9d4d 100%);
  box-shadow: 0 0 60px 20px rgba(255, 190, 110, 0.55), 0 0 140px 60px rgba(255, 160, 90, 0.35);
}
.horizon{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4%;
  background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.12));
}

/* ── 品牌文字 ────────────────────────────────────────── */
.brand{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6em;
  text-align: center;
}
.brand-title{
  display: flex;
  font-size: clamp(48px, 10vw, 96px);
  font-weight: 700;
  color: #3b2412;
  font-family: 'Georgia', 'Times New Roman', serif;
  text-shadow: 0 2px 24px rgba(255, 255, 255, 0.5);
}
.char{
  display: inline-block;
}
.brand-sub{
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 600;
  color: #6b4a28;
  letter-spacing: 0.05em;
}

@media (width >= 768px){
  .sun{ top: 90%; }
}
</style>
