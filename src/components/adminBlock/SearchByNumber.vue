<template>
  <div class="searchByNumber">
    <div class="rowOne">
      <label>訂單編號</label>
      <input
        type="text"
        class="fromNumber"
        placeholder="輸入訂單編號"
        v-model="orderKeyword"
        @keydown.enter="submitSearch"
      />
    </div>
    <div class="rowTwo">
      <button
        type="button"
        class="enterNumber"
        :disabled="!orderKeyword"
        @click="submitSearch"
      >
        查詢
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['search'])
const orderKeyword = ref('')
function submitSearch() {
  if (!orderKeyword.value) return
  emit('search', {
    type: 'orderId',
    keyword: orderKeyword.value
  })
}
</script>
<style scoped>
.searchByNumber{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 2em;
}
.rowOne{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.rowOne input{
    width: calc(100% - 100px);
    color: var(--black);
    background-color: var(--backgroundColor);
    border: 0;
    border-bottom: 1px solid var(--black);
    padding: 0.8em 0.2em;
}
.rowOne input:focus{
    outline: none;
}
.rowTwo{
    display: flex;
    justify-content: center;
    align-items: center;
}
.enterNumber{
    cursor: pointer;
    background-color: var(--backgroundColor);
    color: var(--black);
    border: 0;
    width: 150px;
    padding: 1em;
    margin: 1.5em 0;
    border-radius: var(--radiusNormal);
    transition: var(--transitionNormal);
}
@media(width>=768px){
    .enterNumber:hover{
        background-color: var(--mainColor);
        color: var(--white);
    }
}
</style>