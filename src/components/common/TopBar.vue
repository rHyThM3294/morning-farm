<template>
  <section class="top">
    <h2 class="title">{{ title }}</h2>
    <div class="action-bar">
      <div class="btn-group">
        <button
          v-for="(btn, i) in buttons"
          :key="i"
          type="button"
          class="main-btn"
          :class="{ active: activeButton === btn.value }"
          @click="selectButton(btn.value)"
        >
          {{ btn.label }}
        </button>
      </div>
      <div class="search">
        <input
          type="text"
          :placeholder="searchPlaceholder"
          v-model="searchValue"
          @input="emit('search', searchValue)"
        />
        <button type="button" class="search-btn" @click="emit('search', searchValue)">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  title: { type: String, default: '標題區塊' },
  buttons: {
    type: Array,
    default: () => [] 
  },
  searchPlaceholder: {
    type: String,
    default: '搜尋內容...'
  }
})
const emit = defineEmits(['selectButton', 'search'])
const searchValue = ref('')
const activeButton = ref('')
function selectButton(value){
  activeButton.value = value
  emit('selectButton', value)
}
</script>
<style scoped>
.top{
  width: 100%;
  padding: 8em 1em 1em 1em;
  text-align: center;
  background-color: var(--backgroundColor, #f8f8f8);
  border-bottom: 1px solid #ddd;
}
.title{
  color: var(--secondColor);
  margin: 1em 0;
}
.action-bar{
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  align-items: center;
}
.btn-group{
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
}
.main-btn{
  border: none;
  background: var(--backgroundColor);
  color:var(--mainColor,);
  border-radius: var(--radiusLarge);
  padding: 0.5em 1.2em;
  cursor: pointer;
  transition: var(--transitionNormal);
  width: 150px;
}
.main-btn:hover,
.main-btn.active{
  background: var(--mainColor);
  color: var(--white);
}
.search{
  display: flex;
  align-items: center;
  gap: 0.4em;
  width: 100%;
  max-width: 320px;
}
.search input{
  flex: 1;
  padding: 0.5em 0.8em;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9em;
}
.search-btn{
  border: none;
  background: var(--firstColor);
  color: var(--white);
  border-radius: 8px;
  padding: 0.5em 0.8em;
  cursor: pointer;
  transition: 0.2s;
}
.search-btn:hover{
  background: var(--mainColor);
}
@media screen and (min-width: 768px){}
</style>
