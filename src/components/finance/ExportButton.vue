<template>
  <div class="exportWrapper">
    <button class="exportButton" @click="exportData">
      匯出
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  records: Array
})
function exportData(){
  console.log('匯出資料:', props.records)
}
</script>
<style scoped>
.exportWrapper{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exportButton{
  cursor: pointer;
  margin: 1em 0;
  padding: 0.5em 2em;
  border-radius: var(--radiusLarge);
  border: none;
  background: var(--backgroundColor);
  color: var(--black);
  transition: var(--transitionNormal);
}
@media(width>=768px){
  .exportWrapper{
    width: 150px;
  }
  .exportButton:hover{
    color: var(--white);
    background-color: var(--mainColor);
  }
}
</style>