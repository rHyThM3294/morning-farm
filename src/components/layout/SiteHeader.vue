<template>
  <header>
    <div class="container">
      <div class="headerUp">
        <RouterLink to="/" class="logo"
          :style="{ backgroundImage: `url(${BASE}image/Logo.png)` }"
        ></RouterLink>
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
          <div class="bell" @click="goAdmin">
            <span class="iconChangeBell">
              <i class="fa-regular fa-bell defultBell"></i>
              <i class="fa-solid fa-bell hoverBell"></i>
            </span>
            <span class="iconWord">通知</span>
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
const BASE = import.meta.env.BASE_URL
const router = useRouter()
const cart = useCartStore()
const isBumping = ref(false)
const goCart = () => {
  router.push({ name: "cart" })
}
const goMember = () => {
  router.push({ name: "member" })
}
const goAdmin = () => {
  router.push({ name: "adminLogin" })
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
  /* header */
.webSearch{
    display: none;
}
header{
    width: 100%;
    height: auto;
    padding: 1em 0;
    position: fixed;
    z-index: 500;
    /*玻璃效果*/
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
    justify-content:space-between;
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
header .headButton .iconWord{
    display: none;
}
header .headButton i{
    font-size: 1.2em;
}
.member{
    width: 1.5em;
    text-align: center;
    cursor: pointer;
}
.cart{
    width: 1.5em;
    text-align: center;
}
.bell{
    width: 1.5em;
    text-align: center;
}
.hoverUser{
    display: none;
}
.hoverCart{
    display: none;
}
.hoverBell{
    display: none;
}
header .searchBox{
    position: relative;
    width: 80%;
}
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

@media(width>=768px){
    .mobileSearch{
        display: none;
    }
    .webSearch{
        display: block;
    }
    header .headerUp{
        width: 100%;
        justify-content: space-between;
        gap: 0;
    }
    header .logo{
        width: 292px;
        height: 60px;
        transform: scale(75%);
    }
    header .headButton{
        gap: 0;
        padding: 0;
        font-size: 1em;
    }
    .member{
        min-width: 110px;
    }
    .cart{
        min-width: 90px;
    }
    .bell{
        min-width: 80px;
    }
    .member:hover .defultUser{
        display: none;
    }
    .member:hover .hoverUser{
        display: inline-block;
    }
    .cart:hover .defultCart{
        display: none;
    }
    .cart:hover .hoverCart{
        display: inline-block;
    }
    .bell:hover .defultBell{
        display: none;
    }
    .bell:hover .hoverBell{
        display: inline-block;
    }
    header .headButton .iconWord{
        display: inline;
    }
    header .searchBox{
        width: 25%;
    }
}
</style>
