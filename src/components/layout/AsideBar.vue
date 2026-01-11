<template>
  <div class="app-container">
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
          window.open("https://www.google.com/maps", "_blank");
          break;
        case "銷售報表":
          emit("switch-view", "finance");
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
      if (!isDesktop.value) {
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
      if (!isDesktop.value) {
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
@keyframes slideInLeft{
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0);
  }
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