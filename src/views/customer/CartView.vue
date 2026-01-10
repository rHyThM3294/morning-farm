<template>
  <div class="cartContainer">
    <div class="cartProduct">
      <div
        class="buyProduct"
        v-for="item in cart.items"
        :key="item.id"
        :id="'cart-' + item.id"
      >
        <div class="productList">
          <div class="productPhoto">
            <img :src="resolveImage(item.imageUrl)" />
          </div>
          <div class="productDetail">
            <div class="productText">
              <h6 class="title" @click="goDetail(item)">
                {{ item.productTitle }}
              </h6>
              <p class="attention">{{ item.sellerName }}</p>
              <p class="stand">{{ item.unit }}</p>
            </div>
            <div class="cartIcon">
              <i
                :class="[
                  favorites.isFavorited(item.id)
                    ? 'fa-solid fa-heart'
                    : 'fa-regular fa-heart',
                  { 'favorite-animate': item.favoriteAnimating }
                ]"
                @click="toggleFavorite(item)"
              ></i>
              <i
                class="fa-solid fa-xmark"
                @click="deleteCheck(item)"
              ></i>
            </div>
          </div>
        </div>
        <div class="priceList">
          <div class="much">
            <div class="word">價格</div>
            <div class="number">NT$ {{ item.price }}</div>
          </div>
          <div class="many">
            <button @click="decrease(item)">-</button>
            <input
              type="number"
              min="1"
              :value="item.quantity"
              @input="updateQuantity(item, $event.target.value)"
            />
            <button @click="increase(item)">+</button>
          </div>
          <div class="howMuch">
            <div class="word">小計</div>
            <div class="number">NT$ {{ item.price * item.quantity }}</div>
          </div>
        </div>
      </div>
      <div class="listeningWord">
        <h6>請提前知悉</h6>
        <p>訂單一旦確認，將無法更改（顏色、尺寸、數量、付款方式 、點數、優惠券使用等）。</p>
        <p>如果您購買預購商品或需要特別訂購的商品，配送時間可能會比平常慢。</p>
      </div>
    </div>
    <div class="cartPrice">
      <div class="box1">
        <div class="productPrice">
          <p class="word">商品價格</p>
          <p class="number">NT$ {{ productTotal }}</p>
        </div>
        <div class="productPriceDiscount">
          <p class="word">商品折扣</p>
          <p class="number"></p>
        </div>
        <div class="freight">
          <p class="word">運費</p>
          <p class="number">NT$ {{ shipping }}</p>
        </div>
        <div class="freightDiscount">
          <p class="word">運費折扣</p>
          <p class="number"></p>
        </div>
      </div>
      <div class="box2">
        <div class="allPrice">
          <p class="word">總付款金額</p>
          <p class="number">NT$ {{ productTotal + shipping }}</p>
        </div>
      </div>
      <div class="box3">
        <div class="point">
          <p class="word">可獲得點數</p>
          <p class="number"></p>
        </div>
      </div>
      <div class="box4">
        <div class="inputAccount">
          <label for="">帳號</label>
          <input type="text" placeholder="輸入帳號">
        </div>
        <div class="imputPassword">
          <label for="">密碼</label>
          <input type="password" placeholder="輸入密碼">
        </div>
        <div class="forget">
          <button type="button" class="forgot">忘記帳號或密碼</button>
        </div>
        <div class="buttonBox">
          <button type="button" class="login">登入繼續結帳</button>
          <button type="button" class="register">註冊會員繼續結帳</button>
        </div>
      </div>
    </div>
  </div>
  <div class="keep">
    <button class="keepShopping" @click="goProducts">
      繼續逛逛
    </button>
  </div>
  <Partition />
  <div class="recommendSection" v-if="relatedProducts.length > 0">
    <h3 class="recommendTitle">猜你喜歡</h3>
    <div class="recommendList">
      <Card
        v-for="p in relatedProducts"
        :key="p.id"
        :id="p.id"
        :productTitle="p.productTitle"
        :sellerName="p.sellerName"
        :price="p.price"
        :unit="p.unit"
        :imageUrl="p.imageUrl"
        :category="p.category"
        :stock="p.stock"
      />
    </div>
  </div>
  <AsideButton />
</template>
<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useCartStore } from '@/stores/cart'
import Partition from '@/components/ui/Partition.vue'
import Card from '@/components/common/Card.vue'
import AsideButton from '@/components/common/AsideButton.vue'
import { useFavoriteStore } from "@/stores/favorite"
import { useToastStore } from "@/stores/toast"
const toast = useToastStore()
const cart = useCartStore();
const router = useRouter();
const favorites = useFavoriteStore();
function goDetail(item){
  router.push({
    name: 'productDetail',
    params: { category: item.category, id: item.id }
  })
}
const BASE = import.meta.env.BASE_URL || '/'
const DEFAULT_IMG = `${BASE}image/chinese-pear.png`
function resolveImage(u){
  if(!u) return DEFAULT_IMG
  if(/^https?:\/\//.test(u)) return u
  if(u.startsWith(`${BASE}image/`)) return u
  if(u.startsWith('/image/') || u.startsWith('image/')){
    return `${BASE}${u.replace(/^\/+/, '')}`
  }
  return `${BASE}image/${u}`
}
const increase = (item) => item.quantity++
const decrease = (item) => item.quantity > 1 && item.quantity--
const updateQuantity = (item, v) => {
  const qty = parseInt(v)
  if (qty >= 1) item.quantity = qty
}
const productTotal = computed(() =>
  cart.items.reduce((s, i) => s + i.price * i.quantity, 0)
)
const shipping = computed(() => (cart.items.length > 0 ? 120 : 0))
function toggleFavorite(item){
  const product = {
    id: item.id,
    productTitle: item.productTitle,
    sellerName: item.sellerName,
    price: item.price,
    imageUrl: item.imageUrl,
    unit: item.unit,
    category: item.category,
    stock: item.stock
  }
  const added = favorites.toggle(product)
  if (added) toast.success("已加入最愛")
  else toast.info("已取消最愛")
  item.favoriteAnimating = true
  setTimeout(() => (item.favoriteAnimating = false), 300)
}
function deleteCheck(item){
  if (!confirm(`確定要刪除「${item.productTitle}」嗎？`)) return
  const el = document.getElementById('cart-' + item.id)
  gsap.to(el, {
    opacity: 0,
    scale: 0.6,
    duration: 0.3,
    onComplete: () => cart.removeItem(item.id)
  })
}
function goProducts() {
  router.push('/products')
}
const productStore = useProductStore()
const relatedProducts = computed(() => {
  if (cart.items.length === 0) return []
  const mainCategory = computed(() => {
    const count = {};
    cart.items.forEach(i => {
      count[i.category] = (count[i.category] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
  });

  let list = productStore.getProductsByCategory(mainCategory)
  if(list.length === 0) {
    list = productStore.allProducts
  }
  return list
    .filter(p => !cart.items.find(i => i.id === p.id))
    .slice(0, 6)
})
</script>
<style scoped>
    .cartContainer{
        width: 90%;
        position: relative;
        margin: 10em auto 0 auto;
        display: flex;
        flex-flow: row wrap;
        gap: 2em;
    }
    .cartProduct{
        width: 100%;
        position: relative;
    }
    .buyProduct{
        width: 100%;
        padding: 1em;
        border-bottom: 1px solid var(--black);
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        gap: 1em;
    }
    .productList{
        width: 100%;
        position: relative;
        text-align: justify;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .priceList{
        width: 100%;
        padding: 1em;
        border-radius: 2em;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .productPhoto{
        width: 150px;
        height: 166.67px;
        overflow: hidden;
        border-radius: 2em;
        position: relative;
    }
    .productPhoto img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
    }
    .productDetail{
        width: 100%;
    }
    .productDetail h6.title{
        color: var(--black);
    }
    .productDetail p.attention{
        color: var(--warningColor);
    }
    .productDetail p.stand{
        color: var(--warningColor);
    }
    .priceList .much{
        width: 100%;
        text-align: center;
        color: var(--black);
    }
    .priceList .many{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .priceList .many button{
        width: 32px;
        height: 32px;
        cursor: pointer;
        color: var(--black);
        background-color: var(--backgroundColor);
        border:0;
        border-radius: 50%;
        font-size: 1.2em;
        transition: var(--transitionNormal);
    }
    .priceList .many button:active{
        transform: scale(0.85);
    }
    .priceList .many input{
        width: 70px;
        color: var(--black);
        background-color: var(--backgroundColor);
        border: 0;
        margin:0 1em;
        text-align: center;
        line-height: 2em;
    }
    .priceList .howMuch{
        text-align: center;
    }
    .word{
        width: 100%;
        background-color: var(--backgroundColor);
    }
    .cartIcon{
      position: absolute;
      right: 1em;
      top: 1em;
      font-size: 1.2em;
      display: flex;
      gap: 0.5em;
    }
    .cartIcon .fa-xmark{
      cursor: pointer;
      color: var(--black);
    }
    .cartIcon .fa-heart{
      cursor: pointer;
      color: var(--secondColor);
      transform-origin: center center;
      display: inline-block;
    }
    .cartPrice{
        width: 100%;
        position: relative;
        margin: 0 auto;
        padding: 1em;
        border-radius: 2em;
        background-color: var(--backgroundColor);
    }
    .box1{
        width: 100%;
        border-bottom: 1px solid var(--black);
        padding: 1em 0;
    }
    .productPrice{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--black);
    }
    .productDiscount{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--secondColor);
    }
    .freight{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--black);
    }
    .freightDiscount{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--secondColor);
    }
    .box2{
        width: 100%;
        border-bottom: 1px solid var(--black);
        padding: 1em 0;
    }
    .allPrice{
        font-weight: 700;
        font-size: 1.1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--black);
    }
    .box3{
        width: 100%;
        padding: 1em 0;
    }
    .pt{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cartPrice .word{
        width: 100%;
    }
    .cartPrice .number{
        width: 100%;
        text-align: end;
    }
    .box4{
        padding: 1em 0;
        position: relative;
    }
    .box4 .buttonBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }
    .box4 input{
        width: calc(100% - 5em);
        padding:0 0 0 0.4em;
        line-height: 2.5em;
        background-color: var(--gray);
        border: 0;
        border-bottom: 1px solid var(--black);
        margin: 1em;
    }
    .box4 button{cursor: pointer;}
    .box4 .forget{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 1em 0;
    }
    .box4 .forgot{
        background-color: transparent;
        border: 0;
        color: var(--gray);
        transition: var(--transitionNormal);
    }
    .box4 .login{
        width: 80%;
        padding: 1em;
        background-color: var(--mainColor);
        color: var(--backgroundColor);
        transition: var(--transitionNormal);
        border-radius: var(--radiusLarge);
        border:0;
    }
    .box4 .register{
        width: 80%;
        padding: 1em;
        background-color: var(--mainColor);
        color: var(--backgroundColor);
        transition: var(--transitionNormal);
        border-radius: var(--radiusLarge);
        border:0;
    }
    .keep{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
    .keepShopping{
        width: 80%;
        max-width: 300px;
        cursor: pointer;
        margin: 5em 0;
        padding: 0.5em 1.5em;
        background-color: var(--backgroundColor);
        color: var(--mainColor);
        border: 0;
        border-radius: var(--radiusLarge);
        font-size: 1.2em;
        transition: var(--transitionNormal);
    }
    .favorite-animate {
      animation: heartBeat 0.3s ease-in-out;
    }
    @keyframes heartBeat {
      0%{
        transform: scale(1);
      }
      40%{
        transform: scale(1.4);
      }
      100%{
        transform: scale(1);
      }
    }
    .recommendTitle{
      text-align: center;
      margin: 2em 0;
    }
    .recommendList{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2em;
    }
    @media screen and (min-width:768px){
        .cartContainer{
            max-width: 1200px;
            flex-flow: row nowrap;
            gap: 1em;
        }
        .cartProduct{
            width: 60%;
        }
        .buyProduct{
            flex-direction: column;
        }
        .productPhoto{
            width: 200px;
            height: 166.67px;
        }
        .productList{
            width: 100%;
            display: flex;
            flex-direction: row;
        }
        .priceList{
            width: 100%;
            flex-direction: row;
            gap: 0;
        }
        .priceList .much{width: 50%;}
        .priceList .many{
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
        }
        .priceList .howMuch{width: 50%;}
        .cartPrice{
            width: 30%;
        }
        .priceList .many button:hover{
            background-color: var(--mainColor);
            color: var(--backgroundColor);
        }
        .box4 .forgot:hover{
            text-decoration: underline;
            color: var(--warningColor);
        }
        .box4 .login:hover{
            color: var(--white);
            background-color: var(--addColor);
        }
        .box4 .register:hover{
            color: var(--white);
            background-color: var(--addColor);
        }
        .keepShopping:hover{
            color: var(--backgroundColor);
            background-color: var(--mainColor);
        }
        .recommendSection{
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
        }
        .recommendList{
          flex-flow: row wrap;
          width: 100%;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
        }
    }
</style>
