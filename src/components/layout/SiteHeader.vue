<template>
  <header>
    <div class="container">
      <div class="headerUp">
        <RouterLink
          to="/"
          class="logo"
          :style="{ backgroundImage: `url(${BASE}image/Logo.png)` }"
          @click="handleLogoClick"
        ></RouterLink>
        <div class="searchBox webSearch">
          <input type="text" placeholder="我想要買..." />
          <button type="submit" id="searchButtonWeb" class="searchButton">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div class="headButton">
          <div class="member">
            <a @click.prevent="goMember">
              <span class="iconChangeUser">
                <i class="fa-regular fa-user defultUser"></i>
                <i class="fa-solid fa-user hoverUser"></i>
              </span>
              <span class="iconWord">會員中心</span>
            </a>
          </div>
          <div class="cart">
            <a @click.prevent="goCart">
              <span class="iconChangeCart">
                <i class="fa-solid fa-cart-shopping defultCart"></i>
                <i class="fa-solid fa-cart-arrow-down hoverCart"></i>
              </span>
              <span
                class="cartCount"
                :class="{ bump: isBumping }"
                v-if="cart.itemTypesCount > 0"
              >
                {{ cart.itemTypesCount }}
              </span>
              <span class="iconWord">購物車</span>
            </a>
          </div>

          <!-- 通知鈴鐺 -->
          <div class="bell" @click.stop="toggleNotification" ref="bellRef">
            <span class="iconChangeBell">
              <i class="fa-regular fa-bell defultBell"></i>
              <i class="fa-solid fa-bell hoverBell"></i>
            </span>
            <span class="unreadBadge" v-if="notifStore.unreadCount > 0">
              {{ notifStore.unreadCount > 9 ? '9+' : notifStore.unreadCount }}
            </span>
            <span class="iconWord">通知</span>
          </div>
        </div>
      </div>
      <div class="searchBox mobileSearch">
        <input type="text" placeholder="我想要買..." />
        <button type="submit" id="searchButtonMobile" class="searchButton">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <!-- 通知下拉面板 -->
    <Transition name="notif-drop">
      <div
        v-if="showNotif"
        class="notifPanel"
        ref="panelRef"
        @click.stop
      >
        <div class="notifHeader">
          <span class="notifTitle">通知</span>
          <button
            class="markAllBtn"
            @click="notifStore.markAllAsRead()"
            v-if="notifStore.unreadCount > 0"
          >
            全部標為已讀
          </button>
        </div>
        <ul class="notifList">
          <li
            v-for="n in notifStore.notifications"
            :key="n.id"
            class="notifItem"
            :class="{ unread: !n.read }"
            @click="notifStore.markAsRead(n.id)"
          >
            <div class="notifIconWrap" :class="`type-${n.type}`">
              <i :class="n.icon"></i>
            </div>
            <div class="notifBody">
              <p class="notifItemTitle">{{ n.title }}</p>
              <p class="notifItemBody">{{ n.body }}</p>
              <span class="notifTime">{{ n.time }}</span>
            </div>
            <span class="unreadDot" v-if="!n.read"></span>
          </li>
        </ul>
        <div class="notifFooter" v-if="notifStore.notifications.length === 0">
          <i class="fa-regular fa-bell-slash"></i>
          <p>目前沒有通知</p>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'

const BASE     = import.meta.env.BASE_URL
const route    = useRoute()
const router   = useRouter()
const cart     = useCartStore()
const notifStore = useNotificationStore()

// ── 購物車數量動畫 ──────────────────────────────────────────────────────
const isBumping = ref(false)
watch(
  () => cart.itemTypesCount,
  (newVal) => {
    if (newVal === 0) return
    isBumping.value = false
    requestAnimationFrame(() => { isBumping.value = true })
    setTimeout(() => { isBumping.value = false }, 300)
  }
)

// ── 通知面板開關 ─────────────────────────────────────────────────────────
const showNotif = ref(false)
const bellRef   = ref(null)
const panelRef  = ref(null)

function toggleNotification() {
  showNotif.value = !showNotif.value
}

// 點擊面板外部關閉
function handleOutsideClick(e) {
  if (
    showNotif.value &&
    panelRef.value && !panelRef.value.contains(e.target) &&
    bellRef.value  && !bellRef.value.contains(e.target)
  ) {
    showNotif.value = false
  }
}

onMounted(()    => document.addEventListener('click', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick))

// ── 路由切換時關閉面板 ────────────────────────────────────────────────────
watch(() => route.path, () => { showNotif.value = false })

// ── 導航 ─────────────────────────────────────────────────────────────────
const goCart   = () => router.push({ name: 'cart' })
const goMember = () => router.push({ name: 'member' })

const handleLogoClick = () => {
  // Logo 點擊回首頁不觸發 Loading 動畫，Vue Router 直接切換
}
</script>

<style scoped>
/* ── 原有樣式（不動） ──────────────────────────────────────────────────── */
.webSearch{ display: none; }
header{
  width: 100%;
  height: auto;
  padding: 1em 0;
  position: fixed;
  z-index: 500;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
header .headerUp{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
header .container{
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  gap: 1em;
}
header .logo{
  width: 136px;
  height: 28px;
  background-size: cover;
}
header .headButton{
  display: flex;
  font-size: 1.3em;
  gap: 0.8em;
  justify-content: center;
  align-items: center;
  transition: var(--transitionNormal);
}
header .headButton .iconWord{ display: none; }
header .headButton i{ font-size: 1.2em; }
.member{ width: 1.5em; text-align: center; cursor: pointer; }
.cart{   width: 1.5em; text-align: center; }
.bell{   width: 1.5em; text-align: center; cursor: pointer; position: relative; }
.hoverUser{ display: none; }
.hoverCart{ display: none; }
.hoverBell{ display: none; }
header .searchBox{ position: relative; width: 80%; }
header .searchBox input{
  width: 90%;
  border: 1px solid var(--mainColor);
  border-radius: var(--radiusLarge);
  padding: 0.8em 0.4em;
}
header .searchButton{
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 8%;
  font-size: 1.2em;
  background: transparent;
  border: 0;
}
.cart{ cursor: pointer; position: relative; }
.cartCount{
  position: absolute;
  top: -6px;
  right: -6px;
  color: var(--white);
  background-color: var(--warningColor);
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartCount.bump{ animation: bump 0.3s ease; }
@keyframes bump{
  0%   { transform: scale(1); }
  40%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}

/* ── 通知紅點 badge ─────────────────────────────────────────────────────── */
.unreadBadge{
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--secondColor);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  pointer-events: none;
}

/* ── 通知面板 ──────────────────────────────────────────────────────────── */
.notifPanel{
  position: fixed;
  top: 70px;
  right: 1em;
  width: min(380px, calc(100vw - 2em));
  max-height: 480px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  z-index: 9000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.notifHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.2em 0.7em;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.notifTitle{
  font-size: 1.1em;
  font-weight: 700;
  color: var(--black);
}
.markAllBtn{
  background: none;
  border: none;
  color: var(--mainColor);
  font-size: 0.82em;
  cursor: pointer;
  padding: 0;
  font-weight: 600;
}
.markAllBtn:hover{ text-decoration: underline; }

.notifList{
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}
.notifItem{
  display: flex;
  align-items: flex-start;
  gap: 0.85em;
  padding: 0.9em 1.2em;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid #f7f7f7;
  position: relative;
}
.notifItem:last-child{ border-bottom: none; }
.notifItem:hover{ background: var(--backgroundColor); }
.notifItem.unread{ background: #fffbf5; }
.notifItem.unread:hover{ background: var(--backgroundColor); }

/* 圖示圈圈 */
.notifIconWrap{
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  margin-top: 2px;
}
.notifIconWrap.type-order  { background: #e8f5e9; color: #388e3c; }
.notifIconWrap.type-promo  { background: #fff3e0; color: #f57c00; }
.notifIconWrap.type-system { background: #e3f2fd; color: #1976d2; }

.notifBody{ flex: 1; min-width: 0; }
.notifItemTitle{
  font-size: 0.9em;
  font-weight: 700;
  color: var(--black);
  margin: 0 0 0.25em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.notifItemBody{
  font-size: 0.82em;
  color: #666;
  margin: 0 0 0.35em;
  line-height: 1.5;
  /* 最多顯示兩行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.notifTime{
  font-size: 0.75em;
  color: var(--gray);
}

/* 未讀藍點 */
.unreadDot{
  flex-shrink: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--mainColor);
  align-self: center;
  margin-left: auto;
}

/* 空狀態 */
.notifFooter{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 2.5em;
  color: var(--gray);
  font-size: 0.9em;
}
.notifFooter i{ font-size: 2em; }

/* ── 下拉動畫 ─────────────────────────────────────────────────────────── */
.notif-drop-enter-active{ transition: opacity 0.18s ease, transform 0.18s ease; }
.notif-drop-leave-active{ transition: opacity 0.14s ease, transform 0.14s ease; }
.notif-drop-enter-from  { opacity: 0; transform: translateY(-8px) scale(0.97); }
.notif-drop-leave-to    { opacity: 0; transform: translateY(-8px) scale(0.97); }

/* ── RWD ─────────────────────────────────────────────────────────────── */
@media(width >= 768px){
  .mobileSearch{ display: none; }
  .webSearch{ display: block; }
  header .headerUp{ width: 100%; justify-content: space-between; gap: 0; }
  header .logo{ width: 292px; height: 60px; transform: scale(75%); }
  header .headButton{ gap: 0; padding: 0; font-size: 1em; }
  .member{ min-width: 110px; }
  .cart{   min-width: 90px; }
  .bell{   min-width: 80px; }
  .member:hover .defultUser{ display: none; }
  .member:hover .hoverUser { display: inline-block; }
  .cart:hover .defultCart  { display: none; }
  .cart:hover .hoverCart   { display: inline-block; }
  .bell:hover .defultBell  { display: none; }
  .bell:hover .hoverBell   { display: inline-block; }
  header .headButton .iconWord{ display: inline; }
  header .searchBox{ width: 25%; }
  .notifPanel{ top: 80px; }
}
</style>