<template>
  <section class="weekFresh">
    <h2 class="title">{{ title }}</h2>
    <div class="commodity">
      <i class="fa-solid fa-angle-left"></i>
      <div class="container">
        <div class="commodityCard">
          <div class="cardUp">
            <p>New</p>
            <div class="circlePicture">
              <img src="/public/image/頭貼.png" alt="">
            </div>
          </div>
          <div class="cardBottom">
            <div class="cardTitle">
              <h5>寶島甘露梨</h5>
              <button type="button" class="heart">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <p class="name">劉申權</p>
            <p class="unit">12顆/箱</p>
            <h5 class="price">NT$999</h5>
            <div class="intoCartButton">
              <button type="button" class="intoCart">
                加入購物車 <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="commodityCard">
          <div class="cardUp">
            <p>New</p>
            <div class="circlePicture">
              <img src="/public/image/頭貼.png" alt="">
            </div>
          </div>
          <div class="cardBottom">
            <div class="cardTitle">
              <h5>寶島甘露梨</h5>
              <button type="button" class="heart">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <p class="name">劉申權</p>
            <p class="unit">12顆/箱</p>
            <h5 class="price">NT$999</h5>
            <div class="intoCartButton">
              <button type="button" class="intoCart">
                加入購物車 <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="commodityCard">
          <div class="cardUp">
            <p>New</p>
            <div class="circlePicture">
              <img src="/public/image/頭貼.png" alt="">
            </div>
          </div>
          <div class="cardBottom">
            <div class="cardTitle">
              <h5>寶島甘露梨</h5>
              <button type="button" class="heart">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <p class="name">劉申權</p>
            <p class="unit">12顆/箱</p>
            <h5 class="price">NT$999</h5>
            <div class="intoCartButton">
              <button type="button" class="intoCart">
                加入購物車 <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right"></i>
    </div>
    <button type="button" class="lookMore">我想看更多</button>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
defineProps({
  title: {
    type: String,
    default: '本週新鮮現採' 
  }
})
onMounted(() => {
  console.log('WeekFresh 區塊已載入')
})
</script>
<style scoped>
</style>
