<template>
  <div class="produceWrapper">
    <div class="produce" ref="produceRef">
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="rice produceItem">
          <img src="/image/rice.png" alt="米">
          <p>米</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'festival' } }"
        class="produceLink"
      >
        <div class="fruit produceItem">
          <img src="/image/mango.png" alt="水果">
          <p>水果</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="vegetable produceItem">
          <img src="/image/pak-choi.png" alt="葉菜">
          <p>葉菜</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="dessert produceItem">
          <img src="/image/cookies-2.png" alt="點心">
          <p>點心</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="drinks produceItem">
          <img src="/image/juice-2.png" alt="飲料">
          <p>飲料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="seasoning produceItem">
          <img src="/image/soy-3.png" alt="調味料">
          <p>調味料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="rhizome produceItem">
          <img src="/image/potato.png" alt="根莖">
          <p>根莖</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="rice produceItem">
          <img src="/image/rice.png" alt="米">
          <p>米</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'festival' } }"
        class="produceLink"
      >
        <div class="fruit produceItem">
          <img src="/image/mango.png" alt="水果">
          <p>水果</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="vegetable produceItem">
          <img src="/image/pak-choi.png" alt="葉菜">
          <p>葉菜</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="dessert produceItem">
          <img src="/image/cookies-2.png" alt="點心">
          <p>點心</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="drinks produceItem">
          <img src="/image/juice-2.png" alt="飲料">
          <p>飲料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="seasoning produceItem">
          <img src="/image/soy-3.png" alt="調味料">
          <p>調味料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="rhizome produceItem">
          <img src="/image/potato.png" alt="根莖">
          <p>根莖</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="rice produceItem">
          <img src="/image/rice.png" alt="米">
          <p>米</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'festival' } }"
        class="produceLink"
      >
        <div class="fruit produceItem">
          <img src="/image/mango.png" alt="水果">
          <p>水果</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="vegetable produceItem">
          <img src="/image/pak-choi.png" alt="葉菜">
          <p>葉菜</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="dessert produceItem">
          <img src="/image/cookies-2.png" alt="點心">
          <p>點心</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="drinks produceItem">
          <img src="/image/juice-2.png" alt="飲料">
          <p>飲料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="seasoning produceItem">
          <img src="/image/soy-3.png" alt="調味料">
          <p>調味料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="rhizome produceItem">
          <img src="/image/potato.png" alt="根莖">
          <p>根莖</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="rice produceItem">
          <img src="/image/rice.png" alt="米">
          <p>米</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'festival' } }"
        class="produceLink"
      >
        <div class="fruit produceItem">
          <img src="/image/mango.png" alt="水果">
          <p>水果</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="vegetable produceItem">
          <img src="/image/pak-choi.png" alt="葉菜">
          <p>葉菜</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="dessert produceItem">
          <img src="/image/cookies-2.png" alt="點心">
          <p>點心</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'process' } }"
        class="produceLink"
      >
        <div class="drinks produceItem">
          <img src="/image/juice-2.png" alt="飲料">
          <p>飲料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'longTime' } }"
        class="produceLink"
      >
        <div class="seasoning produceItem">
          <img src="/image/soy-3.png" alt="調味料">
          <p>調味料</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'products', query: { category: 'vegetarianism' } }"
        class="produceLink"
      >
        <div class="rhizome produceItem">
          <img src="/image/potato.png" alt="根莖">
          <p>根莖</p>
        </div>
      </RouterLink>
    </div>
    <div
      class="edgeHint left"
      :style="{ opacity: showLeft ? 1 : 0 }"
    ></div>
    <div
      class="edgeHint right"
      :style="{ opacity: showRight ? 1 : 0 }"
    ></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const produceRef = ref(null)
const showLeft = ref(false)
const showRight = ref(true)
onMounted(() => {
  const el = produceRef.value
  if (!el) return
  const updateHint = () => {
    showLeft.value = el.scrollLeft > 10
    showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10
  }
  updateHint()
  el.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        const speed = 2 
        el.scrollLeft += e.deltaY * speed
      }
    },
    { passive: false }
  )
})
</script>
<style scoped>
.produceWrapper{
  position: relative;
  overflow: hidden;
}
.edgeHint{
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  pointer-events: none;
  transition: opacity 0.3s;
}
.edgeHint.left{
  left: 0;
  background: linear-gradient(to right, var(--backgroundColor), transparent);
}
.edgeHint.right{
  right: 0;
  background: linear-gradient(to left, var(--backgroundColor), transparent);
}
.produce{
  width: 100%;
  padding: 4em 0;
  display: flex;
  gap: 2em;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.produce::-webkit-scrollbar{
  display: none;
}
.produceLink{
  flex: 0 0 auto;
  width: 100px;
}
.produce a{
    display: inline-block;
    width: 100px;
}
.produceItem{
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    width: 100%;
}
.produceItem img{
    height: 80px;
}
@media(width>=768px){}
</style>
