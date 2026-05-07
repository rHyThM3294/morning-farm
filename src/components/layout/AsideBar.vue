<template>
  <div class="app-container">
    <!-- 列印訂單 Modal -->
    <Teleport to="body">
      <div v-if="showPrintModal" class="print-modal-backdrop" @click.self="closePrintModal">
        <div class="print-modal">
          <h3 class="print-modal-title">列印訂單清單</h3>
          <div class="print-modal-body">
            <p>這裡是列印訂單的相關說明文字，後續可以替換成實際內容。</p>
            <p>訂單編號：A202500001</p>
            <p>訂單編號：A202500002</p>
            <p>訂單編號：A202500003</p>
            <p>訂單編號：A202500004</p>
            <p>訂單編號：A202500005</p>
            <p>商品名稱：有機草莓 x2</p>
            <p>商品名稱：台農57號地瓜 x1</p>
            <p>商品名稱：玉荷包荔枝 x3</p>
            <p>商品名稱：高山烏龍茶 x1</p>
            <p>商品名稱：牛番茄 x5</p>
            <p>出貨日期：2025/05/10</p>
            <p>出貨日期：2025/05/11</p>
            <p>出貨日期：2025/05/12</p>
            <p>收件地址：台北市大安區復興南路一段</p>
            <p>收件地址：新北市板橋區文化路二段</p>
            <p>收件人：王小明</p>
            <p>收件人：李小華</p>
            <p>聯絡電話：0912-345-678</p>
            <p>聯絡電話：0923-456-789</p>
            <p>付款方式：信用卡一次付清</p>
            <p>付款方式：超商代碼繳費</p>
            <p>訂單金額：NT$ 1,280</p>
            <p>訂單金額：NT$ 560</p>
            <p>訂單狀態：處理中</p>
            <p>訂單狀態：已出貨</p>
            <p>備註：請勿過度冷藏</p>
            <p>備註：需要附發票</p>
            <p>小農：清晨農鋪合作小農</p>
            <p>小農：山頂有機農場</p>
            <p>配送方式：常溫宅配</p>
            <p>配送方式：低溫冷藏配送</p>
            <p>預計送達：2025/05/13</p>
            <p>預計送達：2025/05/14</p>
            <p>目前共有 32 筆訂單待列印。</p>
            <p>系統產生時間：2025/05/07 10:30:00</p>
            <p>請確認以上資料無誤後按下確定進行列印。</p>
          </div>
          <button class="print-modal-confirm" @click="closePrintModal">確定</button>
        </div>
      </div>
    </Teleport>
    <button
      class="navButton"
      :class="{ hidden: isNavOpen }"
      @click="handleNavButtonClick"
    >
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>
    <div
      ref="overlayRef"
      class="nav-overlay"
      :class="{ visible: isNavOpen && !isDesktop }"
      @click="handleOverlayClick"
    ></div>
    <nav ref="navBlockRef" class="navBlock" :class="{ open: isNavOpen }">
      <button
        v-if="isNavOpen && !isDesktop"
        class="nav-close"
        @click="handleCloseClick"
      >
        ✕
      </button>
      <div v-for="item in menuItems" :key="item.key">
        <button class="nav-menu-item" @click="toggleMenu(item.key)">
          {{ item.name }}
        </button>
        <div
          class="submenu-container"
          :class="{ open: openMenu === item.key }"
        >
          <button
            v-for="submenu in item.submenu"
            :key="submenu"
            class="submenu-item"
            @click="handleSubmenuClick(submenu)"
          >
            {{ submenu }}
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
export default {
  name: "SidebarNav",
  emits: ["switch-view"],
  setup(props, { emit }){
    const isNavOpen = ref(false);
    const openMenu = ref(null);
    const isDesktop = ref(window.innerWidth >= 768);
    const showPrintModal = ref(false);
    const closePrintModal = () => { showPrintModal.value = false; };
    const navBlockRef = ref(null);
    const overlayRef = ref(null);
    const menuItems = [
      {
        name: "商品管理",
        key: "product",
        submenu: ["新增商品", "商品編輯"],
      },
      {
        name: "訂單處理",
        key: "order",
        submenu: ["查詢訂單", "退貨與退款", "列印訂單"],
      },
      {
        name: "營收管理",
        key: "finance",
        submenu: ["銷售報表","販售統計","金流管理"],
      },
    ];
    const handleSubmenuClick = (submenu) => {
      switch (submenu) {
        case "新增商品":
          emit("switch-view", "add-commodity");
          break;
        case "商品編輯":
          emit("switch-view", "commodity");
          break;
        case "查詢訂單":
          emit("switch-view", "check-order");
          break;
        case "退貨與退款":
          emit("switch-view", "withdraw");
          break;
        case "列印訂單":
          showPrintModal.value = true;
          break;
        case "銷售報表":
          emit("switch-view", "sales-report");
          break;
        case "販售統計":
          emit("switch-view", "finance");
          break;
        case "金流管理":
          emit("switch-view", "finance");
          break;
        default:
          console.log("clicked:", submenu);
      }
      if (!isDesktop.value){
        isNavOpen.value = false;
        openMenu.value = null;
      }
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    };
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      isDesktop.value = desktop;
      if (desktop) isNavOpen.value = true;
    };
    const toggleMenu = (menuName) => {
      openMenu.value = openMenu.value === menuName ? null : menuName;
    };
    const handleNavButtonClick = () => (isNavOpen.value = true);
    const handleCloseClick = () => {
      isNavOpen.value = false;
      openMenu.value = null;
    };
    const handleOverlayClick = () => {
      if (!isDesktop.value){
        isNavOpen.value = false;
        openMenu.value = null;
      }
    };
    onMounted(() => window.addEventListener("resize", handleResize));
    onUnmounted(() => window.removeEventListener("resize", handleResize));
    return {
      isNavOpen,
      openMenu,
      isDesktop,
      navBlockRef,
      overlayRef,
      menuItems,
      showPrintModal,
      closePrintModal,
      toggleMenu,
      handleNavButtonClick,
      handleCloseClick,
      handleOverlayClick,
      handleSubmenuClick,
    };
  },
};
</script>
<style scoped>
.navButton{
  position: fixed;
  top: 20px;
  left: 20px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--mainColor);
  background-color: var(--white);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  z-index: 999;
  transition: opacity 0.3s;
}
.navButton:hover{
  opacity: 0.8;
}
.navButton.hidden{
  display: none;
}
.hamburger-line{
  width: 16px;
  height: 2px;
  background-color: var(--mainColor);
}
.nav-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
}
.nav-overlay.visible{
  pointer-events: auto;
}
.navBlock{
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;                   
  background-color: var(--black);
  color: var(--mainColor);
  z-index: 9999;                   
  overflow-y: auto;                
  overflow-x: hidden;
  scrollbar-width: thin;           
  scrollbar-color: var(--mainColor) transparent;
  padding-top: 4em;
  transform: translateX(-100%);
  transition: transform 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.navBlock::-webkit-scrollbar{
  width: 6px;
}
.navBlock::-webkit-scrollbar-thumb{
  background-color: var(--mainColor);
  border-radius: 3px;
}
.navBlock::-webkit-scrollbar-track{
  background: transparent;
}
.navBlock.open{
  transform: translateX(0);
}
.nav-close{
  position: absolute;
  top: 15px;
  right: 15px;
  color: var(--mainColor);
  font-size: 30px;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 1001;
  transition: opacity 0.3s ease;
}
.nav-close:hover {
  opacity: 0.7;
}
.nav-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
}
.nav-overlay.visible{
  opacity: 1;
  pointer-events: auto;
}
.main-content.with-sidebar{
  margin-left: 200px;
  transition: margin-left 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.nav-menu-item{
  width: 100%;
  height: 50px;
  font-size: 1.2em;
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--mainColor);
  transition: border-bottom 0.3s;
}
.nav-menu-item:hover{
  border-bottom: 1px solid var(--mainColor);
}
.submenu-container{
  margin-left: 4px;
  text-align: right;
  padding-right: 1em;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.submenu-container.open{
  max-height: 500px;
  transition: max-height 0.3s ease-in;
}
.submenu-item{
  font-size: 1em;
  padding: 10px 8px;
  cursor: pointer;
  background: none;
  border: none;
  color: var(--mainColor);
  width: 100%;
  text-align: right;
  transition: border-bottom 0.3s;
}
.submenu-item:hover{
  border-bottom: 1px solid var(--mainColor);
}
.main-content{
  flex: 1;
  padding: 40px;
  margin-left: 0;
  transition: margin-left 0.3s;
  display: flex;
  justify-content: center;
}
.main-content.with-sidebar{
  margin-left: 200px;
  transition: margin-left 1s cubic-bezier(0.77, 0, 0.175, 1);
}
.content-placeholder{
  background-color:var(--white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  max-width: 1200px;
  width: 100%;
}
.nav-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s ease;
}
.nav-overlay.visible{
  opacity: 1;
  pointer-events: auto;
}
/* ── 列印訂單 Modal ── */
.print-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.print-modal {
  background-color: var(--backgroundColor);
  border-radius: var(--radiusNormal);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 2em 2.5em;
  width: min(480px, 90vw);
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 1.2em;
}
.print-modal-title {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--black);
  border-bottom: 2px solid var(--mainColor);
  padding-bottom: 0.5em;
}
.print-modal-body {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  color: var(--black);
  font-size: 0.95em;
  line-height: 1.7;
  scrollbar-width: thin;
  scrollbar-color: var(--mainColor) transparent;
}
.print-modal-body::-webkit-scrollbar {
  width: 5px;
}
.print-modal-body::-webkit-scrollbar-thumb {
  background-color: var(--mainColor);
  border-radius: 3px;
}
.print-modal-confirm {
  align-self: flex-end;
  padding: 0.5em 2em;
  background-color: var(--mainColor);
  color: var(--white);
  border: none;
  border-radius: var(--radiusNormal);
  font-size: 1em;
  cursor: pointer;
  transition: var(--transitionNormal);
}
.print-modal-confirm:hover {
  background-color: var(--addColor);
  color: var(--black);
}
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0);
  }
@keyframes slideOutLeft{
  from{
    transform: translateX(0);
  }
  to{
    transform: translateX(-100%);
  }
}
@keyframes fadeIn{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes fadeOut{
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
@media (width>=768px){
  .main-content{
    padding: 20px;
  }
  .main-content.with-sidebar{
    margin-left: 0;
  }
  .navButton{
    display: none;
  }
  .nav-close{
    display: none;
  }
  .navBlock{
      position: fixed;
      top: 0;
      left: 0;
      transform: translateX(0);
      animation: none;
      height: 100vh;
      width: 200px;  
      overflow-y: auto; 
      z-index: 9999;
    }
  .nav-close{
    display: none;
  }
  .nav-overlay{
    display: none;
  }
  .main-content.with-sidebar{
    margin-left: 200px;
  }
  .nav-overlay{
    display: none;
  }
  .main-content.with-sidebar{
    margin-left: 150px;
  }
}
</style>