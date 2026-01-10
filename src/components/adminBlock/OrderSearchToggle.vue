<template>
  <div class="tabWindow">
    <button
        type="button"
        class="tabButton"
        :class="{ active: activeType === 'orderId' }"
        :disabled="activeType === 'orderId'"
        @click="changeType('orderId')"
        >
        <h5>從訂單編號</h5>
    </button>
    <button
        type="button"
        class="tabButton"
        :class="{ active: activeType === 'date' }"
        :disabled="activeType === 'date'"
        @click="changeType('date')"
        >
        <h5>從訂單日期</h5>
    </button>
    <span
      class="tabIndicator"
      :class="activeType"
    ></span>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  activeType: {
    type: String,
    default: 'orderId',
  },
})
const emit = defineEmits(['change'])
function changeType(type) {
  if (type === props.activeType) return
  emit('change', type)
}
</script>
<style scoped>
.tabWindow {
  position: relative;
  display: flex;
  border-bottom: 2px solid #e5e5e5;
  margin-bottom: 1.2em;
}
.tabButton {
  position: relative;
  flex: 1;
  background: none;
  border: none;
  padding: 0.8em 0;
  cursor: pointer;
  color:var(--gray);
  transition: var(--transitionNormal);
}
.tabButton h5 {
  margin: 0;
}
.tabButton.active {
  color:var(--mainColor);
  font-weight: 600;
}
.tabButton:disabled {
  cursor: default;
}
.tabIndicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 2px;
  background-color:var(--mainColor);
  transition: var(--transitionNormal);
}
.tabIndicator.orderId {
  transform: translateX(0%);
}
.tabIndicator.date {
  transform: translateX(100%);
}
@media(width>=768px){
  .tabWindow .tabButton:not(:disabled):hover {
    color: var(--mainColor);
  }
}
</style>
