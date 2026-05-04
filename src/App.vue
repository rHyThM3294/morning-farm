<template>
  <div class="app">
    <Loading />
    <SiteHeader v-if="!hideLayout" />
    <main :class="{ fullScreen: hideLayout }">
      <RouterView :key="$route.fullPath" />
    </main>
    <SiteFooter v-if="!hideLayout" />
    <Toast />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Loading from './views/customer/Loading.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import Toast from './components/common/Toast.vue'
const route = useRoute()
const hideLayout = computed(() =>
  route.path.startsWith('/admin') || route.path === '/loading'
)
</script>
<style>
.app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main{
  /* flex: 1 會讓 main 高度固定在 viewport，使 sticky 的滾動空間變成 0    */
  /* 改為 flex-grow: 1 + 不限制高度，讓 main 隨內容自然撐高                */
  /* 這樣 sticky 的祖先容器高度 > viewport，window 才有真正的滾動空間       */
  flex-grow: 1;
  min-height: 60vh;
}
main.fullScreen{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;           
  overflow: hidden;      
  padding: 0;
  margin: 0;
  background-color: var(--white);     
}
</style>