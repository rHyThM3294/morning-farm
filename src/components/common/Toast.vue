<template>
  <div class="toastWrapper" v-if="toasts.length">
    <div
      v-for="t in toasts"
      :key="t.id"
      :class="['toast', `toast--${t.type}`]"
      @click="toastStore.remove(t.id)" 
    >
      {{ t.message }}
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'
const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
</script>
<style scoped>
.toastWrapper{
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toast{
  background: var(--mainColor);
  color: var(--backgroundColor);
  padding: 0.8em 1.2em;
  border-radius: var(--radiusNormal);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  animation: fadein 0.3s ease, fadeout 0.3s ease 1.7s forwards;
  cursor: pointer;
}
.toast--success{
  background: var(--addColor);
}
.toast--error{
  background:var(--warningColor);
}
.toast--info{
  background: var(--mainColor);
}
@keyframes fadein{
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeout{
  from { opacity: 1; }
  to   { opacity: 0; transform: translateY(-10px); }
}
</style>
