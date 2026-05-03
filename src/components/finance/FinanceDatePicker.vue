<template>
  <div class="dateRangePicker">
    <input
      type="date"
      class="dateInput"
      :value="startDate"
      @input="emit('updateStart', $event.target.value)"
    />
    <span class="rangeText">~</span>
    <input
      type="date"
      class="dateInput"
      :value="endDate"
      @input="emit('updateEnd', $event.target.value)"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  startDate: String,
  endDate: String
})
const emit = defineEmits(['updateStart', 'updateEnd'])
</script>
<style scoped>
    .dateRangePicker{
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.5em;
    }
</style>