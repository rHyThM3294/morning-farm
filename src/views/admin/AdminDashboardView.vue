<template>
  <div class="admin-dashboard">
    <div class="logout-bar">
      <span>{{ farmerName }}，您好!</span>
      <button class="logout-btn" @click="handleLogout">由此登出</button>
    </div>
    <AsideBar @switch-view="switchView" />
    <main class="admin-main" ref="adminMainRef">
      <component
        :is="currentView"
        :editing-id="editingProductId"
        @scroll-to-order-detail="scrollToOrderDetail"
        @edit-product="handleEditProduct"
        @back="goList"
      />
    </main>
  </div>
  <AsideButton />
</template>
<script setup>
import { ref, shallowRef, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AsideBar from "@/components/layout/AsideBar.vue";
import AddCommodityDetail from "@/components/adminBlock/AddCommodityDetail.vue";
import Commodity from "@/components/adminBlock/Commodity.vue";
import CheckOrder from "@/components/adminBlock/CheckOrder.vue";
import Withdraw from "@/components/adminBlock/Withdraw.vue";
import AsideButton from "@/components/common/AsideButton.vue";
import Finance from '@/components/adminBlock/Finance.vue'
import SalesReport from '@/components/adminBlock/SalesReport.vue'
import ProductSales from '@/components/adminBlock/ProductSales.vue'
const router = useRouter();
const authStore = useAuthStore();
const adminMainRef = ref(null);
const farmerName = "小農";
const currentView = shallowRef(Commodity);
const editingProductId = ref(null);
function switchView(viewName){
  switch (viewName) {
    case "add-commodity":
      editingProductId.value = null;
      currentView.value = AddCommodityDetail;
      break;
    case "commodity":
      editingProductId.value = null;
      currentView.value = Commodity;
      break;
    case "check-order":
      currentView.value = CheckOrder;
      break;
    case "withdraw":
      currentView.value = Withdraw;
      break;
  case "finance":
    currentView.value = Finance;
    break;
  case "sales-report":
    currentView.value = SalesReport;
    break;
  case "product-sales":
    currentView.value = ProductSales;
    break;
    default:
      currentView.value = Commodity;
  }
}
function scrollToElement(el){
  nextTick(() => {
    if (!el || !adminMainRef.value) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function handleEditProduct(id){
  editingProductId.value = id;
  currentView.value = AddCommodityDetail;
}
function goList(){
  editingProductId.value = null;
  currentView.value = Commodity;
}
function scrollToOrderDetail(el){
  nextTick(() => {
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
async function handleLogout(){
  await authStore.logout()
  sessionStorage.setItem('playHomeLoading', 'true')
  router.push('/admin/login')
}
</script>
<style scoped>
.admin-dashboard{
  overflow-x: hidden;
}
.admin-main{
  overflow-x: hidden;
}
.logout-bar{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1em;
  padding: 0 1.2em;
  height: 44px;
  background-color: var(--backgroundColor);
  border-bottom: 2px solid var(--mainColor);
  font-size: 12px;
  color: var(--gray);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.logout-btn{
  background: none;
  border: none;
  color: #dc2626;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
}
.logout-btn:hover{
  text-decoration: underline;
}
label{
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
}
input[type="radio"]{
  order: -1;
  accent-color: var(--addColor);
  margin: 0;
}
.admin-dashboard{
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  min-height: 100vh;
  position: relative;
}
.admin-main{
  flex: 1;
  background-color: var(--white);
  padding: calc(44px + 1.5em) 1.2em 2em;
  overflow-y: auto;
}
@media (width>=768px){
  .logout-bar{
    font-size: 14px;
    background-color: var(--backgroundColor);
  }
  .admin-main {
    padding: calc(44px + 2em) 2em 2em calc(200px + 2em);
  }
}
</style>