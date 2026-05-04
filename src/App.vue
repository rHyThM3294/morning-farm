<template>
  <div class="app">
    <Loading />
    <SiteHeader v-if="!hideLayout" />
    <main :class="{ fullScreen:isLoginPage }">
      <RouterView :key="$route.fullPath" />
    </main>
    <SiteFooter v-if="!hideLayout" />
    <Tosat />
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Loading from './views/customer/Loading.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import Toast from './components/common/Toast.vue'
const route = useRoute()
const hideLayout = computed(() => 
  route.path.startsWith('/admin') || route.path === 'loading'
)
const isLoadingPage = computed(() => 
  route.path === '/admin/login' || route.path === 'loading'
)
</script>
<style scoped>
.app{
  display: flex;
  flex-flow: nowrap column;
  min-height: 100vh;
}
main{
  flex-grow: 1;
  min-height: 60vh;
}
main.fullScreen{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: var(--white);
}
</style>