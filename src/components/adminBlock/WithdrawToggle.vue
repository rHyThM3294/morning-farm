<template>
  <div class="withdrawToggle">
    <span class="slider" :class="modelValue"></span>
    <button
      type="button"
      class="toggleButton"
      :class="{ active: modelValue === 'pending' }"
      @click="change('pending')"
      :disabled="modelValue === 'pending'"
    >
      待退訂單
      <span v-if="pendingCount !== undefined" class="count">
        ({{ pendingCount }})
      </span>
    </button>
    <button
      type="button"
      class="toggleButton"
      :class="{ active: modelValue === 'done' }"
      @click="change('done')"
      :disabled="modelValue === 'done'"
    >
      已退訂單
    </button>
    <span class="indicator" :class="modelValue"></span>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'pending',
  },
  pendingCount: {
    type: Number,
    default: undefined,
  },
})
const emit = defineEmits(['update:modelValue'])
function change(status){
  if (status !== props.modelValue) {
    emit('update:modelValue', status)
  }
}
</script>
<style scoped>
.withdrawToggle{
  position: relative;
  display: flex;
  border: 1px solid var(--firstColor);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 24px;
}
.slider{
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: var(--firstColor);
  transition: transform 0.35s ease;
  z-index: 0;
}
.slider.done{
  transform: translateX(100%);
}
.toggleButton{
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 12px 0;
  font-size: 1em;
  color: var(--firstColor);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: var(--transitionNormal);
}
.toggleButton.active{
  color: var(--white);
  font-weight: 600;
}
.toggleButton:disabled{
  cursor: default;
}
.count{
  margin-left: 4px;
  font-size: 14px;
}
</style>
