<template>
  <section class="weekFresh" ref="productGridSection">
    <h2 class="title">{{ currentCity }}</h2>
    <div v-if="products.length" class="commodity">
      <div class="container">
        <div
          v-for="p in products"
          :key="p.id"
          class="commodityCard"
        >
          <div class="cardUp" :style="{ backgroundImage: `url(${p.image})` }">
            <p>New</p>
            <div class="circlePicture">
              <img src="/public/image/頭貼.png" alt="農民頭貼" />
            </div>
          </div>
          <div class="cardBottom">
            <div class="cardTitle">
              <h5>{{ p.name }}</h5>
              <button type="button" class="heart">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <p class="name">劉申權</p>
            <p class="unit">12顆/箱</p>
            <h5 class="price">NT$ {{ p.price }}</h5>
            <div class="intoCartButton">
              <button type="button" class="intoCart">
                加入購物車<i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="empty">此地區暫無商品</p>
  </section>
</template>
<script setup>
import { ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)
const props = defineProps({
  products: { type: Array, default: () => [] },
  currentCity: { type: String, default: '台北市' },
  autoScroll: { type: Boolean, default: false }
})
const productGridSection = ref(null)
watch(
  () => props.autoScroll,
  (val) => {
    if (val && productGridSection.value) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: productGridSection.value, offsetY: 80 },
        ease: 'power2.inOut'
      })
    }
  }
)
</script>
<style scoped>
.empty{
  text-align: center;
  color:var(--gray);
  font-size: 1.2em;
  margin: 2em 0;
}
.commodity .cardUp{
  position: relative;
  width: 35%;
}
.commodity .cardBottom{
  width: 65%;
  text-align: justify;
}
.commodity .cardBottom button.intoCart{
  margin: 0;
}
@media screen and (min-width: 768px){
  .commodity{
    width: 100%;
    max-width: 1440px;
  }
  .commodity .container{
    width: 100%;
    max-width: 1440px;
  }
  .commodity .cardUp{
    width: 100%;
  }
  .commodity .cardBottom{
  width: 100%;
}
}
</style>
