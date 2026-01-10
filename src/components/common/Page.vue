<template>
  <div class="pagination">
    <button 
      class="navButton"
      :disabled="currentPage === 1"
      @click="handleClick(currentPage - 1)"
    >
      ‹
    </button>
    <button 
      class="pageNumber"
      :class="{ active: currentPage === 1 }"
      @click="handleClick(1)"
    >
      1
    </button>
    <span class="dots" v-if="showPrevDots">...</span>
    <button
      v-if="middlePage !== null"
      class="pageNumber"
      :class="{ active: currentPage === middlePage }"
      @click="handleClick(middlePage)"
    >
      {{ middlePage }}
    </button>
    <span class="dots" v-if="showNextDots">...</span>
    <button
      v-if="totalPages > 1"
      class="pageNumber"
      :class="{ active: currentPage === totalPages }"
      @click="handleClick(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button 
      class="navButton"
      :disabled="currentPage === totalPages"
      @click="handleClick(currentPage + 1)"
    >
      ›
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  totalPages: { type: Number, required: true },
  modelValue: { type: Number, required: true }
});
const emit = defineEmits(["update:modelValue", "pageChanged"]);
const currentPage = computed(() => props.modelValue);
function handleClick(n){
  if (n < 1 || n > props.totalPages) return;
  emit("update:modelValue", n);
  emit("pageChanged", n);  
}
const showPrevDots = computed(() => currentPage.value > 2);
const middlePage = computed(() => {
  if (props.totalPages <= 2) return null;
  if (currentPage.value <= 2) return 2;
  if (currentPage.value >= props.totalPages - 1) return props.totalPages - 1;
  return currentPage.value;
});
const showNextDots = computed(() => 
  currentPage.value < props.totalPages - 1
);
</script>
<style scoped>
.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
}
.pageNumber, .navButton{
  cursor: pointer;
  padding: 0.4em 0.8em;
  font-size: 0.9em;
  min-width: 36px;
  transition: var(--transitionNormal);
}
.pageNumber.active{
  color: var(--addColor);
}
.navButton:disabled{
  opacity: 0.3;
  cursor: not-allowed;
}
.pagination button{
  border: 0;
  color: var(--black);
  background-color: transparent;
}
.dots{
  color: var(--black);
  font-size: 1em;
}
@media (width>=768px){
  .pageNumber, .navButton{
    font-size: 1em;
    min-width: 40px;
  }
  .pagination button:hover{
    color: var(--mainColor);
  }
}
</style>
