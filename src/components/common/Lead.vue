<template>
  <div class="container">
    <RouterLink to="/map">
      <div class="map categoryItem">
        <div><i class="fa-regular fa-map"></i></div>
        <p class="inMobile">地圖</p>
        <p class="inWeb">從地區開始逛</p>
      </div>
    </RouterLink>
    <RouterLink to="/season">  
      <div class="season categoryItem">
        <div class="icon"><i class="fa-regular fa-calendar"></i></div>
        <p class="inMobile">季節</p>
        <p class="inWeb">從季節開始逛</p>
      </div>
    </RouterLink>
    <RouterLink to="/ranking">
      <div class="ranking categoryItem">
        <div class="icon"><i class="fa-solid fa-ranking-star"></i></div>
        <p class="inMobile">排行榜</p>
        <p class="inWeb">排行榜</p>
      </div>
    </RouterLink>
    <RouterLink to="/knowledge">
      <div class="knowledge categoryItem">
        <div class="icon"><i class="fa-regular fa-lightbulb"></i></div>
        <p class="inMobile">小學堂</p>
        <p class="inWeb">蔬果小學堂</p>
      </div>
    </RouterLink>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
<style scoped>
</style>