<template>
  <TopBar
    title="所有商品"
    :buttons="categoryButtons"
    searchPlaceholder="搜尋商品"
    @selectButton="switchCategory"
    @search="handleSearch"
  />
  <Produce />
  <div class="productContainer">
    <div class="sortBar">
      <label>排序方式：</label>
      <select v-model="sortOption">
        <option value="date">依照上架日期</option>
        <option value="farmer">依照小農</option>
        <option value="category">依照種類</option>
        <option value="price">依照價格</option>
      </select>
    </div>
    <div class="containerCards">
      <Card
        v-for="item in paginatedItems"
        :key="item.id"
        v-bind="item"
      />
    </div>
  </div>
  <div class="paginationBlock">
    <Page
      :totalPages="totalPages"
      v-model="currentPage"
      @pageChanged="scrollToTop"
    />
    <p>目前頁數：{{ currentPage }}</p>
  </div>
  <AsideButton />
</template>
<script setup>
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useProductStore } from "@/stores/product"
const productStore = useProductStore()
import TopBar from "@/components/common/TopBar.vue"
import Produce from "@/components/common/Produce.vue"
import Card from "@/components/common/Card.vue"
import Page from "@/components/common/Page.vue"
import AsideButton from "@/components/common/AsideButton.vue"
const route = useRoute()
const currentPage = ref(1)
const itemsPerPage = 9
const searchQuery = ref("")
const selectedCategory = ref("all")
const sortOption = ref("date")
const categoryButtons = [
  { label: "所有商品", value: "all" },
  { label: "可長久保存", value: "longTime" },
  { label: "素食", value: "vegetarianism" },
  { label: "加工食品", value: "process" },
  { label: "過節禮盒", value: "festival" }
]
const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const c = selectedCategory.value
  return productStore.allProducts.filter((item) => {
    const matchCategory = c === "all" || item.category === c
    const matchSearch =
      !q ||
      item.productTitle.toLowerCase().includes(q) ||
      item.sellerName.toLowerCase().includes(q)
    return matchCategory && matchSearch
  })
})
const sortedItems = computed(() => {
  const items = [...filteredItems.value]
  switch (sortOption.value){
    case "price":
      return items.sort((a, b) => a.price - b.price)
    case "farmer":
      return items.sort((a, b) =>
        a.sellerName.localeCompare(b.sellerName, "zh-Hant")
      )
    case "category":
      return items.sort((a, b) =>
        a.category.localeCompare(b.category, "zh-Hant")
      )

    case "date":
    default:
      return items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
  }
})
const totalPages = computed(() =>
  Math.ceil(sortedItems.value.length / itemsPerPage)
)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedItems.value.slice(start, start + itemsPerPage)
})
function scrollToTop(){
  const el = document.querySelector(".containerCards")
  if (el){
    const top = el.getBoundingClientRect().top + window.scrollY - 80; 
    window.scrollTo({ top, behavior: "smooth" });
  }
}
function switchCategory(c){
  selectedCategory.value = c
  currentPage.value = 1
}
function handleSearch(keyword){
  searchQuery.value = keyword
  currentPage.value = 1
}
watch(
  () => route.query.category,
  (val) => {
    if (val) {
      selectedCategory.value = val
      currentPage.value = 1
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.productContainer{
    width: 90%;
    margin: 0 auto;
    position: relative;
}
.containerCards{
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 1.5em;
    justify-content: center;
    align-items: center;
}
.sortBar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1em 0;
  gap: 0.5em;
}
.sortBar label{
  font-weight: bold;
  color: var(--firstColor);
}
.sortBar select{
  padding: 0.4em 1.2em;
  border: 1px solid var(--mainColor);
  border-radius: var(--radiusLarge);
  background-color: var(--white);
  color: var(--secondColor);
  cursor: pointer;
  font-size: 1em;
  transition: var(--transitionNormal);
}
.sortBar select:focus{
  outline: none;
}
.paginationBlock{
  margin: 2em auto;
  text-align: center;
}
@media screen and (min-width:768px){
    .containerCards{
        max-width: 1200px;
        flex-flow: row wrap;
    }
    .sortBar select:hover{
      background-color: var(--mainColor);
      color: var(--white);
    }
}
</style>