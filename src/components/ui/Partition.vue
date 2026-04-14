<template>
  <div
    class="partition"
    :style="partitionStyle"
    aria-hidden="true"
  ></div>
</template>
<script setup>
import { computed } from 'vue'
const BASE = import.meta.env.BASE_URL || '/'
const partitionStyle = computed(() => ({
  backgroundImage: `url(${BASE}image/banner.png)`
}))
</script>
<style scoped>
.partition{
  width: 100%;
  height: 90px;
  margin-top: -50px;
  background-repeat: repeat-x;
  background-position: center center;
  background-size: auto 100%;
  overflow: hidden;
  position: relative;
  z-index: 2;
  pointer-events: none;
}
@media(width>768px){
  .partition{
    height: 140px;
    margin-top: -80px;
  }
}
</style>