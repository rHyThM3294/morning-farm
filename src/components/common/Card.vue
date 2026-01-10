<template>
  <div 
    class="commodityCard" 
    :class="{ horizontal: useHorizontal }"
    @click="goDetail"
  >
    <div class="cardUp" :style="{ backgroundImage: `url(${bgUrl})` }">
      <p>{{ status }}</p>
      <div class="circlePicture">
        <img :src="avatarUrl" :alt="sellerName" />
      </div>
    </div>
    <div class="cardBottom">
      <div class="cardTitle" @click.stop="goDetail">
        <h5>{{ productTitle }}</h5>
        <button
          type="button"
          class="heart"
          @click.stop="toggleHeart"
          :class="{ animate: isAnimating }"
        >
          <i :class="heartIcon"></i>
        </button>
      </div>
      <p class="name">{{ sellerName }}</p>
      <p class="unit">{{ unit }}</p>
      <h6 class="price">NT$ {{ price }}</h6>
      <div class="intoCartButton">
        <button class="intoCart" @click.stop="addToCart">
          加入購物車 <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite";
import { useToastStore } from "@/stores/toast";
import { useCartStore } from "@/stores/cart";
const favorites = useFavoriteStore();
const toast = useToastStore();
const cart = useCartStore();
const emit = defineEmits(["toggleHeart"]);
const props = defineProps({
  id: { type: String, required: true },
  status: { type: String, default: "New" },
  productTitle: { type: String, required: true },
  sellerName: { type: String, required: true },
  unit: { type: String, required: true },
  price: { type: [Number, String], required: true },
  imageUrl: { type: String, default: "chinese-pear.png" },
  category: { type: String, default: "all" },
  stock: { type: Number, default: 100 },
  useHorizontal: { type: Boolean, default: false }
});
const BASE = import.meta.env.BASE_URL || "/";
const DEFAULT_IMG = `${BASE}image/chinese-pear.png`;
const bgUrl = computed(() => {
  const u = props.imageUrl;
  if (!u) return DEFAULT_IMG;
  if (/^https?:\/\//.test(u)) return u;
  if (u.startsWith(`${BASE}image/`)) return u;
  if (u.startsWith("/image/") || u.startsWith("image/")) {
    return `${BASE}${u.replace(/^\/+/, "")}`;
  }
  return `${BASE}image/${u}`;
});
const avatarUrl = `${BASE}image/頭貼.png`;
const isAnimating = ref(false);
const isFavorited = computed(() => favorites.isFavorited(props.id));
const heartIcon = computed(() =>
  isFavorited.value ? "fa-solid fa-heart" : "fa-regular fa-heart"
);
function toggleHeart() {
  isAnimating.value = true;
  setTimeout(() => (isAnimating.value = false), 300);
  const product = {
    id: props.id,
    status: props.status,
    productTitle: props.productTitle,
    sellerName: props.sellerName,
    unit: props.unit,
    price: props.price,
    imageUrl: props.imageUrl,
    category: props.category,
    stock: props.stock
  };
  const added = favorites.toggle(product);
  if (added) {
    toast.success("已加入最愛");
  } else {
    toast.info("已取消最愛");
  }
  emit("toggleHeart", product);
}
function addToCart() {
  cart.addItem({
    id: props.id,
    productTitle: props.productTitle,
    price: Number(props.price),
    imageUrl: props.imageUrl,
    sellerName: props.sellerName,
    unit: props.unit,
    category: props.category,
    stock: props.stock,
    quantity: 1,
  });
  toast.success("成功加入購物車！");
}
const router = useRouter();
const route = useRoute();
function goDetail() {
  router.push({
    name: "productDetail",
    params: { 
      category: props.category || "all",
      id: props.id
    }
  });
}
</script>
<style scoped>
.commodityCard{
  min-width: 313px;
  max-width: 330px;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  border: 1px solid var(--mainColor);
  border-radius: 2em;
  overflow: hidden;
  padding: 0;
  transition: var(--transitionNormal);
  cursor: pointer;
}
.commodityCard:hover{
  transform: translateY(-4px);
}
.cardUp{
  position: relative;
  width: 100%;
  height: 233px;
  border-radius: 32px 0 0 32px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.cardUp p{
  background-color: var(--secondColor);
  color: var(--white);
  position: absolute;
  padding: 0.2em 0.5em;
  top: 10px;
  right: 1em;
  border-radius: var(--radiusNormal);
}
.circlePicture{
  border-radius: 50%;
  border: 1px solid var(--mainColor);
  text-align: center;
  position: absolute;
  left: 0.4em;
  bottom: 0.4em;
  overflow: hidden;
}
.circlePicture img{
  scale: 1.1;
}
.cardBottom{
  width: 100%;
  text-align: left;
  position: relative;
  padding: 0.5em;
  line-height: 1;
  overflow: hidden;
  height: 233px;
}
.cardTitle{ 
  text-align: justify;
  color: var(--firstColor);
  overflow: hidden;
  position: relative;
  margin: 0;
}
.cardTitle h5{
  margin: 0;
  padding: 1.5em 0 0 0;
}
.heart{
  cursor: pointer;
  position: absolute;
  width: 32px;
  height: 32px;
  top: 0;
  right: 0;
  font-size: 1em;
  transition: var(--transitionNormal);
  color: var(--secondColor);
  background-color: transparent;
  border: 0;
}
.heart i{
  transform: center center;
}
.heart.animate{
  animation: pop 0.3s ease;
}
@keyframes pop{
  0% { transform: scale(1); }
  50% { transform: scale(1.4); }
  100% { transform: scale(1); }
}
.name{
  padding: 0.5em 0;
  color: var(--black);
  line-height: 1.2;
  margin: 0;
}
.unit{
  color: var(--black);
  margin: 0;
}
.price{
  padding: 0.5em 0;
  color: var(--secondColor);
  margin: 0;
}
.intoCartButton{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.intoCart{
  cursor: pointer;
  padding: 0.5em 1.5em;
  margin: 2em 0 0 0;
  color: var(--backgroundColor);
  background-color: var(--mainColor);
  border-radius: var(--radiusLarge);
  border: 0;
  transition: var(--transitionNormal);
}
@media screen and (min-width: 768px){
  .commodityCard {
    min-width: 296px;
    flex-flow: column nowrap;
  }
  .cardUp{
    width: 100%;
    border-radius: 32px 32px 0 0;
  }
  .cardBottom{
    height: auto;
  }
  .cardTitle h5{
    padding: 0;
  }
  .intoCart:hover{
    color: var(--mainColor);
    background-color: var(--backgroundColor);
  }
}
</style>
