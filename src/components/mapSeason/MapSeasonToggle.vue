<template>
  <div class="toggle-buttons">
    <button
      :disabled="activeTab === 'map'"
      :class="{ active: activeTab === 'map' }"
      @click="$emit('changeTab', 'map')"
    >
      <h5>地區</h5>
    </button>
    <button
      :disabled="activeTab === 'season'"
      :class="{ active: activeTab === 'season' }"
      @click="$emit('changeTab', 'season')"
    >
      <h5>季節</h5>
    </button>
    <div 
      class="underline" 
      :class="{ 'move-right': activeTab === 'season' }"
    ></div>
  </div>
</template>
<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'map'
  }
})
</script>
<style scoped>
.toggle-buttons{
  position: relative;
  padding: 6em 0 0 0;
  display: flex;
  justify-content: center;
  gap: 12px;
}
button{
  margin: 0;
  padding: 0 2em;
  border: none;
  cursor: pointer;
  background: transparent;
  color: var(--gray);
  transition: var(--transitionNormal);
  position: relative;
}
button.active{
  color: var(--mainColor);
}
button:disabled{
  cursor: default;
  pointer-events: none;
  opacity: 1;
}
.underline{
  position: absolute;
  bottom: -8px;
  left: 0;
  height: 3px;
  background: var(--mainColor);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: calc(50% - 6px);
}
.underline.move-right{
  left: calc(50% + 6px);
}
@media(width>=768px){
  button:not(:disabled):hover {
    color: var(--firstColor);
  }
}
</style>