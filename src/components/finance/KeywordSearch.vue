<template>
  <div class="keywordSearch">
    <input
      class="searchInput"
      type="text"
      placeholder="輸入訂單編號..."
      :value="keyword"
      @input="emit('updateKeyword', $event.target.value)"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  keyword: String
})
const emit = defineEmits(['updateKeyword'])
</script>
<style scoped>
.keywordSearch{
  width: 100%;
}
.searchInput{
  width: 90%;
  max-width: 300px;
  padding: 0.5em 1em;
  border-radius: var(--radiusLarge);
  border: 1px solid var(--mainColor);
}
@media(width>=768px){
}
</style>