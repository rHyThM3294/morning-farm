<template>
  <div class="favoritePage">
    <h5 class="title">最愛清單</h5>
    <div v-if="favorites.items.length === 0" class="empty">
      <p>目前沒有收藏的商品</p>
    </div>
    <div v-else class="favoriteList">
      <Card
        v-for="item in favorites.items"
        :key="item.id"
        v-bind="item"
      />
    </div>
    <div class="allProduct">
      <button 
        type="button" 
        class="goAllProduct"
        @click="goAllProduct"
      >
        查看所有商品
      </button>
    </div>
  </div>
</template>
<script setup>
import { useFavoriteStore } from "@/stores/favorite";
import Card from "@/components/common/Card.vue";
import { useRouter } from "vue-router";
const favorites = useFavoriteStore();
const router = useRouter();
function goAllProduct(){
  router.push({ name: "products" });
}
</script>
<style scoped>
.favoritePage{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
}
.title{
  margin: 0 0 2em 0;
  color: var(--black);
  border-bottom: 1px solid var(--black);
}
.empty{
  width: 100%;
  padding: 3em 0;
  text-align: center;
  color: var(--black);
}
.favoriteList{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
}
.allProduct{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4em 0 2em 0;
}
.allProduct button{
  cursor: pointer;
  padding: 0.8em 2em;
  color: var(--black);
  background-color: var(--backgroundColor);
  border-radius: var(--radiusLarge);
  border: 0;
  transition: var(--transitionNormal);
}
@media (min-width: 768px) {
  .favoriteList {
    flex-flow: row wrap;
  }
  .allProduct button:hover{
    color: var(--white);
    background-color: var(--mainColor);
  }
}
</style>
