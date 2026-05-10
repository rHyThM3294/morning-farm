<template>
  <div v-show="visible" class="commOverlay" ref="overlayRef" @click.self="closePanel">
    <div class="commPanel" ref="panelRef">
      <div class="commContent">
        <p>晨間農場致力於提供最新鮮的有機農產品，從田間直送到您的餐桌。我們的農夫每天清晨採收，確保每一樣蔬果都充滿生命力與營養。選擇我們，就是選擇健康、自然與永續的生活方式。</p>
      </div>
      <div class="commFooter">
        <button type="button" class="confirmButton" @click="closePanel">確定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  visible: Boolean,
  originRect: Object
})

const emit = defineEmits(['close'])

const overlayRef = ref(null)
const panelRef = ref(null)

watch(() => props.visible, async (val) => {
  if (!val) return
  await nextTick()
  if (!panelRef.value || !props.originRect) return

  const { x, y, width, height } = props.originRect

  // 計算按鈕中心點相對於視窗的位置
  const btnCenterX = x + width / 2
  const btnCenterY = y + height / 2

  // 取得 panel 的尺寸，計算 panel 中心
  const panelRect = panelRef.value.getBoundingClientRect()
  const panelCenterX = window.innerWidth / 2
  const panelCenterY = window.innerHeight / 2

  // 偏移量：從按鈕中心到 panel 正中間的差距
  const offsetX = btnCenterX - panelCenterX
  const offsetY = btnCenterY - panelCenterY

  // overlay 淡入
  gsap.set(overlayRef.value, { opacity: 0 })
  gsap.to(overlayRef.value, { opacity: 1, duration: 0.3, ease: 'power2.out' })

  // panel 從按鈕位置縮放展開到正中間
  gsap.set(panelRef.value, { clearProps: 'all' })
  gsap.set(panelRef.value, {
    x: offsetX,
    y: offsetY,
    scale: 0.15,
    opacity: 0,
    transformOrigin: '50% 50%'
  })
  gsap.to(panelRef.value, {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 0.45,
    ease: 'power3.out'
  })
})

function closePanel() {
  if (!panelRef.value || !props.originRect) {
    emit('close')
    return
  }

  const { x, y, width, height } = props.originRect
  const btnCenterX = x + width / 2
  const btnCenterY = y + height / 2
  const panelCenterX = window.innerWidth / 2
  const panelCenterY = window.innerHeight / 2

  const offsetX = btnCenterX - panelCenterX
  const offsetY = btnCenterY - panelCenterY

  // overlay 淡出
  gsap.to(overlayRef.value, { opacity: 0, duration: 0.3, ease: 'power2.in' })

  // panel 從正中間縮放消失到按鈕位置
  gsap.to(panelRef.value, {
    x: offsetX,
    y: offsetY,
    scale: 0.15,
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
    onComplete() {
      gsap.set(panelRef.value, { clearProps: 'all' })
      emit('close')
    }
  })
}
</script>

<style scoped>
.commOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.commPanel {
  background: var(--white);
  border-radius: 1em;
  padding: 1.5em;
  width: 90%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.commContent p {
  font-size: 1em;
  line-height: 1.8;
  color: var(--black);
  margin: 0;
}

.commFooter {
  display: flex;
  justify-content: flex-end;
}

.confirmButton {
  padding: 0.6em 2em;
  border: none;
  border-radius: 2em;
  background-color: var(--mainColor);
  color: var(--white);
  font-size: 1em;
  cursor: pointer;
  transition: var(--transitionNormal);
}

.confirmButton:hover {
  opacity: 0.85;
}
</style>