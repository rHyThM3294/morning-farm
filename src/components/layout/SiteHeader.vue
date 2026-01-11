<template>
  <header>
    <div class="container">
      <div class="headerUp">
        <RouterLink to="/" class="logo">
          <div class="logo"></div>
        </RouterLink>
        <div class="searchBox webSearch">
          <input type="text" placeholder="我想要買..." />
          <button type="submit" id="searchButton" class="searchButton">
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
          <div class="bell">
            <a href="">
              <span class="iconChangeBell">
                <i class="fa-regular fa-bell defultBell"></i>
                <i class="fa-solid fa-bell hoverBell"></i>
              </span>
              <span class="iconWord">通知</span>
            </a>
          </div>
        </div>
      </div>
      <div class="searchBox mobileSearch">
        <input type="text" placeholder="我想要買..." />
        <button type="submit" id="searchButton" class="searchButton">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart"
const router = useRouter()
const cart = useCartStore()
const isBumping = ref(false)
const goCart = () => {
  router.push({ name: "cart" })
}
const goMember = () => {
  router.push({ name: "member" })
}
watch(
  () => cart.itemTypesCount,
  (newVal, oldVal) => {
    if (newVal === 0) return
    isBumping.value = false
    requestAnimationFrame(() => {
      isBumping.value = true
    })
    setTimeout(() => {
      isBumping.value = false
    }, 300)
  }
)
</script>
<style scoped>
.cart{
    cursor: pointer;
  position: relative;
}
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
.cartCount.bump{
  animation: bump 0.3s ease;
}
@keyframes bump{
  0% { transform: scale(1); }
  40% { transform: scale(1.4); }
  100% { transform: scale(1); }
}
</style>
