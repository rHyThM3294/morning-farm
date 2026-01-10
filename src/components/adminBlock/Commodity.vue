<template>
  <div class="commodityList">
    <AdminCard
      v-for="p in productStore.products"
      :key="p.id"
      v-bind="p"
      @edit="handleEdit"
    />
  </div>
</template>
<script setup>
import AdminCard from "@/components/adminBlock/AdminCard.vue";
import { useAdminProductStore } from "@/stores/adminProduct";
import { defineEmits } from "vue";
const productStore = useAdminProductStore();
const emit = defineEmits(["edit-product"]);
function handleEdit(id) {
  emit("edit-product", id);
}
</script>
<style scoped>
.commodityList{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  gap: 1em;
}
@media(width>=768px){
  .commodityList{
    padding: 2em 2em 2em 250px;
    max-width: 1250px;
    flex-flow: row wrap;
  }
}
</style>
