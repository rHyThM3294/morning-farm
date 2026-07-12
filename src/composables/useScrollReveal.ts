// src/composables/useScrollReveal.ts
import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  childSelector?: string
  y?: number
  duration?: number
  stagger?: number
  start?: string
}

/**
 * Scroll 進場動畫 composable（fade-in + slide-up）
 *
 * 單一區塊：
 *   const sectionRef = ref(null)
 *   useScrollReveal(sectionRef)
 *
 * Grid stagger（子項目錯開飛入）：
 *   const gridRef = ref(null)
 *   useScrollReveal(gridRef, { childSelector: ':scope > *' })
 */
export function useScrollReveal(target: Ref<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const {
    childSelector,
    y = 40,
    duration = 0.65,
    stagger = 0.1,
    start = 'top 88%',
  } = options

  let triggers: ScrollTrigger[] = []

  onMounted(() => {
    if (!target.value) return
    const els = childSelector
      ? Array.from(target.value.querySelectorAll(childSelector))
      : [target.value]
    if (!els.length) return

    gsap.set(els, { opacity: 0, y })

    const st = ScrollTrigger.create({
      trigger: target.value,
      start,
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          clearProps: 'all',
        })
      },
    })
    triggers.push(st)
  })

  onUnmounted(() => {
    triggers.forEach(t => t.kill())
    triggers = []
  })
}
