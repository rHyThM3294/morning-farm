<template>
  <div class="memberView">
    <Bread :paths="breadcrumb" />
    <div class="mobileHeader">
      <button class="menuBtn" @click="drawerOpen = true">
        <i class="fa-solid fa-bars"></i> 功能選單
      </button>
      <h3>會員中心</h3>
    </div>
    <div class="memberContainer">
      <div
        v-if="drawerOpen"
        class="drawerOverlay"
        @click="drawerOpen = false"
      ></div>
      <aside
        class="drawer"
        :class="{ open: drawerOpen }"
      >
        <button class="closeBtn" @click="drawerOpen = false">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="drawerMenu">
          <button 
            :class="{ active: isActive('personal') }"
            :disabled="isActive('personal')"
            @click="switchTab('personal')"
          >個人資料</button>
          <button 
            :class="{ active: isActive('password') }"
            :disabled="isActive('password')"
            @click="switchTab('password')"
          >修改密碼</button>
          <button 
            :class="{ active: isActive('credit') }"
            :disabled="isActive('credit')"
            @click="switchTab('credit')"
          >信用卡管理</button>
          <button 
            :class="{ active: isActive('address') }"
            :disabled="isActive('address')"
            @click="switchTab('address')"
          >收貨地址</button>
          <button 
            :class="{ active: isActive('searchList') }"
            :disabled="isActive('searchList')"
            @click="switchTab('searchList')"
          >訂單查詢</button>
          <button 
            :class="{ active: isActive('favorite') }"
            :disabled="isActive('favorite')"
            @click="switchTab('favorite')"
          >最愛清單</button>
        </div>
      </aside>
      <aside class="desktopMenu">
        <button 
          :class="{ active: isActive('personal') }"
          :disabled="isActive('personal')"
          @click="switchTab('personal')"
        >個人資料</button>
        <button 
          :class="{ active: isActive('password') }"
          :disabled="isActive('password')"
          @click="switchTab('password')"
        >修改密碼</button>
        <button 
          :class="{ active: isActive('credit') }"
          :disabled="isActive('credit')"
          @click="switchTab('credit')"
        >信用卡管理</button>
        <button 
          :class="{ active: isActive('address') }"
          :disabled="isActive('address')"
          @click="switchTab('address')"
        >收貨地址</button>
        <button 
          :class="{ active: isActive('searchList') }"
          :disabled="isActive('searchList')"
          @click="switchTab('searchList')"
        >訂單查詢</button>
        <button 
          :class="{ active: isActive('favorite') }"
          :disabled="isActive('favorite')"
          @click="switchTab('favorite')"
        >最愛清單</button>
      </aside>
      <section class="contentArea">
        <component
          :is="currentComponent"
          :order="selectedOrder"   
          @openOrderDetail="openOrderDetail"
          @goBackSearchList="switchTab('searchList')"
        />
      </section>
    </div>
    <AsideButton />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Bread from "@/components/common/Bread.vue";
import AsideButton from "@/components/common/AsideButton.vue";
import Personal from "@/components/member/personal.vue";
import Password from "@/components/member/password.vue";
import Address from "@/components/member/address.vue";
import SearchList from "@/components/member/searchList.vue";
import SearchListDetail from "@/components/member/searchListDetail.vue";
import Favorite from "@/components/member/favorite.vue";
const currentTab = ref("personal");
const orderDetailMode = ref(false);
const selectedOrder = ref(null);
gsap.registerPlugin(ScrollTrigger);
const drawerOpen = ref(false);
function isActive(tab){
  return currentTab.value === tab
}
const currentComponent = computed(() => {
  if (currentTab.value === "searchList" && orderDetailMode.value)
    return SearchListDetail;
  const map = {
    personal: Personal,
    password: Password,
    credit: Personal,
    address: Address,
    searchList: SearchList,
    favorite: Favorite,
  };
  return map[currentTab.value];
});
function switchTab(tab){
  currentTab.value = tab
  orderDetailMode.value = false
  drawerOpen.value = false

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}
function openOrderDetail(order){
  selectedOrder.value = order
  orderDetailMode.value = true

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}
const breadcrumb = computed(() => {
  const map = {
    personal: "個人資料",
    password: "修改密碼",
    credit: "信用卡管理",
    address: "收貨地址",
    searchList: "訂單查詢",
    favorite: "最愛清單",
  };
  if (currentTab.value === "searchList" && orderDetailMode.value)
  return ["會員中心", "訂單查詢", "訂單內容"];
  return ["會員中心", map[currentTab.value]];
});
</script>
<style scoped>
.memberView{
  position: relative;
  width: 100%;
  margin: 10em auto 2em auto;
  max-width: 1200px;
  min-height: 100vh;
  overflow: visible;
}
.mobileHeader{
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 1em;
}
.menuBtn{
  border: none;
  background: var(--mainColor);
  color:var(--white);
  padding: 0.5em 1em;
  border-radius: 6px;
}
.desktopMenu{display: none;}
.drawerOverlay{
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 50;
}
.drawer{
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background: var(--white);
  transform: translateX(-100%);
  transition: var(--transitionNormal);
  z-index: 99;
  padding: 9em 1em 1em 1em;
  display: flex;
  flex-direction: column;
}
.drawer.open{
  transform: translateX(0);
}
.closeBtn{
  background: none;
  border: none;
  font-size: 20px;
  align-self: flex-end;
  color: var(--firstColor);
}
.drawerMenu{
  display: flex;
  flex-direction: column;
  margin: 1em 0 0 0;
}
.drawerMenu button{
  padding: 1.5em 0;
  background-color: var(--backgroundColor);
  color: var(--black);
  border: 0;
  border-bottom: 1px solid var(--black);
}
.contentArea{
  padding: 1em;
  flex: 1;
}
.desktopMenu button:disabled,.drawerMenu button:disabled{
  pointer-events: none;
  opacity: 0.65;
  cursor: default;
}
.desktopMenu button.active,.drawerMenu button.active{
  background-color: var(--addColor);
  color: var(--black);
  font-weight: 600;
}
@media (width >= 768px){
  .mobileHeader{
    display: none;
  }
  .drawer,.drawerOverlay{
    display: none;
  }
  .memberContainer{
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 1.5em;
    padding: 1em;
    align-items: start; 
  }
  .desktopMenu{
    position: sticky;
    top: 120px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: 5em 0 0 0;
    align-self: start;
  }
  .desktopMenu button{
    padding: 1em 1em;
    background-color: var(--backgroundColor);
    color: var(--black);
    cursor: pointer;
    border: 0;
    transition: var(--transitionNormal);
    &:hover{
      background-color: var(--addColor);
    }
  }
  .contentArea{
    padding: 1em;
    flex: 1;
    min-height: 100vh;
  }
}
</style>