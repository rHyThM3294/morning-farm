<template>
  <div class="detailPage">
    <Bread />
    <section class="productSection">
      <div class="gallery">
        <!-- 主圖是這個頁面的首屏內容，不加 lazy -->
        <div class="mainImage">
          <img :src="currentImage" :alt="product.productTitle" />
        </div>
        <div class="thumbs">
          <button
            v-for="(img, i) in product.gallery"
            :key="i"
            class="thumbBtn"
            :class="{ active: currentImage === img }"
            @click="currentImage = img"
          >
            <img :src="img" :alt="`${product.productTitle}-image-${i+1}`" loading="lazy" />
          </button>
        </div>
      </div>
      <div class="info">
        <span class="tag" :data-type="product.status">{{ product.status }}</span>
        <div class="desc">
          <p>{{ product.description }}</p>
        </div>
        <div class="titleRow">
          <h4 class="title">{{ product.productTitle }}</h4>
          <button
            class="heart"
            :class="{ active: isFavorited, animate: isAnimating }"
            @click="toggleHeart"
          >
            <i :class="heartIcon"></i>
          </button>
        </div>
        <div class="meta">
          <span class="price">NT$ {{ product.price }}</span>
        </div>
        <div class="specs">
          <p class="label">選擇規格：</p>
          <div class="specButtons">
            <button
              v-for="(s, i) in product.specs"
              :key="i"
              class="specBtn"
              :class="{ selected: selectedSpec === s.value }"
              @click="selectedSpec = s.value"
            >
              {{ s.label }}
            </button>
          </div>
        </div>
        <div class="quantityRow">
          <p class="label">數量：</p>
          <div class="qtyControl">
            <button class="qtyBtn" @click="decQty" :disabled="quantity <= 1">-</button>
            <input
              class="qtyInput"
              type="text"
              v-model="qtyInput"
              @input="onQtyInput"
              @blur="onQtyBlur"
              @keydown="blockNonNumber"
              @wheel.prevent
            />
            <button class="qtyBtn" @click="incQty" :disabled="quantity >= maxGroupCount">
              +
            </button>
          </div>
          <span class="stock">
            庫存：{{ maxGroupCount }} 組（共 {{ totalStock }} ）
          </span>
          <span v-if="quantity > maxGroupCount" class="warn">
            此規格可購買組數僅剩 {{ maxGroupCount }} 組
          </span>
        </div>
        <div class="actions">
          <button class="buyNow" @click="buyNow" :disabled="!canCheckout">
            直接購買 <i class="fa-solid fa-cart-shopping"></i>
          </button>
          <button class="addCart" @click="addToCart" :disabled="!canCheckout">
            加入購物車 <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </section>
    <section class="farmerSection">
      <div class="farmerCard">
        <h4 class="farmerName">【{{ product.sellerName }}】</h4>
        <div class="farmerInfo">
          <img class="avatar" :src="avatarSrc" :alt="product.productTitle" loading="lazy" />
          <p class="farmerDesc">{{ product.farmerDescription }}</p>
        </div>
        <button class="viewAllButton" @click="goFarmerAll">
          查看 {{ product.sellerName }} 的所有商品
        </button>
      </div>
    </section>
    <AsideButton />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Bread from "@/components/common/Bread.vue";
import AsideButton from "@/components/common/AsideButton.vue";
import { useProductStore } from "@/stores/product";
import { useFavoriteStore } from "@/stores/favorite";
import { useCartStore } from "@/stores/cart";
import { useToastStore } from "@/stores/toast";

const productStore = useProductStore();
const favorites = useFavoriteStore();
const cart = useCartStore();
const toast = useToastStore();
const route = useRoute();
const router = useRouter();
const BASE = import.meta.env.BASE_URL || "/";

// ─── 從 store 取得原始資料（隨 route.params.id 自動更新）─────────────────
const storeProduct = computed(() => productStore.getProductById(route.params.id));

// ─── SVG 佔位圖工具 ──────────────────────────────────────────────────────
function svgPlaceholder(n, bg = "#f0f0f0", fg = "#555") {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g${n}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g${n})"/>
    <text x="50%" y="50%" font-size="120" font-family="system-ui" fill="${fg}"
      text-anchor="middle" dominant-baseline="middle">#${n}</text>
  </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const placeholderGallery = [
  svgPlaceholder(1, "#E3F2FD", "#0D47A1"),
  svgPlaceholder(2, "#E8F5E9", "#1B5E20"),
  svgPlaceholder(3, "#FFF3E0", "#E65100"),
  svgPlaceholder(4, "#F3E5F5", "#4A148C"),
];

const defaultSpecs = [
  { label: "6 顆 / 盒", value: 6 },
  { label: "10 顆 / 箱", value: 10 },
  { label: "12 顆 / 箱", value: 12 },
];

// ─── 解析圖片路徑工具 ────────────────────────────────────────────────────
function resolveImg(url) {
  if (!url) return `${BASE}image/chinese-pear.webp`;
  if (/^(https?:|data:|blob:)/.test(url)) return url;
  const clean = String(url).replace(/^\/+/, "");
  if (clean.startsWith("image/")) return `${BASE}${clean}`;
  return `${BASE}image/${clean}`;
}

// ─── 主要商品資料：改用 computed，隨 route 自動重算 ──────────────────────
// 修正重點：原本用 reactive({ ...storeProduct.value }) 只讀一次，
// 切換商品時資料不更新，導致點卡片顯示錯誤商品。
const product = computed(() => {
  const s = storeProduct.value;
  const mainImg = resolveImg(s?.imageUrl);
  return {
    id:               s?.id               ?? "temp-1",
    productTitle:     s?.productTitle     ?? "寶島甘露梨",
    sellerName:       s?.sellerName       ?? "王建國果園",
    price:            s?.price            ?? 420,
    status:           s?.status           ?? "New",
    category:         s?.category         ?? "all",
    imageUrl:         mainImg,
    gallery:          s?.gallery          ?? [mainImg, placeholderGallery[1], placeholderGallery[2], placeholderGallery[3]],
    description:      s?.description      ?? "以自然農法種植，果肉脆甜多汁，冷藏風味更佳。下單後新鮮採收直送。",
    specs:            s?.specs            ?? defaultSpecs,
    sellerAvatarUrl:  s?.sellerAvatarUrl  ?? "image/sandPear.webp",
    farmerDescription: s?.farmerDescription ?? `${s?.sellerName ?? ""} 使用自然農法栽培，堅持以友善方式種植。`,
    stock:            s?.stock            ?? 500,
  };
});

// ─── 依賴 product computed 的衍生 ref（商品換掉時一起重置）────────────────
const currentImage = ref(product.value.gallery[0]);
const totalStock   = ref(product.value.stock);
const selectedSpec = ref(product.value.specs?.[0]?.value ?? null);

// 監聽 product 變化（route 切換時），重置所有頁面狀態
watch(
  () => product.value.id,
  () => {
    currentImage.value = product.value.gallery[0];
    totalStock.value   = product.value.stock;
    selectedSpec.value = product.value.specs?.[0]?.value ?? null;
    quantity.value     = 1;
    qtyInput.value     = "1";
  }
);

// ─── 收藏 ────────────────────────────────────────────────────────────────
const isFavorited = computed(() => favorites.isFavorited(product.value.id));
const isAnimating  = ref(false);
const heartIcon    = computed(() =>
  isFavorited.value ? "fa-solid fa-heart" : "fa-regular fa-heart"
);
function toggleHeart() {
  isAnimating.value = true;
  setTimeout(() => (isAnimating.value = false), 300);
  const added = favorites.toggle({
    id:           product.value.id,
    productTitle: product.value.productTitle,
    sellerName:   product.value.sellerName,
    price:        product.value.price,
    imageUrl:     product.value.imageUrl,
    category:     product.value.category,
  });
  if (added) toast.success("已加入最愛");
  else toast.info("已取消最愛");
}

// ─── 規格 & 數量 ─────────────────────────────────────────────────────────
const unitPerGroup  = computed(() => Number(selectedSpec.value) || 1);
const maxGroupCount = computed(() => Math.floor(totalStock.value / unitPerGroup.value));
const quantity  = ref(1);
const qtyInput  = ref("1");

function normalize(n) {
  const num = Number.isFinite(Number(n)) ? Number(n) : 1;
  return Math.max(1, Math.min(maxGroupCount.value, Math.floor(num)));
}
function onQtyInput()  { qtyInput.value = qtyInput.value.replace(/[^\d]/g, ""); }
function onQtyBlur()   { quantity.value = normalize(qtyInput.value || "1"); qtyInput.value = String(quantity.value); }
function incQty()      { quantity.value = Math.min(quantity.value + 1, maxGroupCount.value); qtyInput.value = String(quantity.value); }
function decQty()      { quantity.value = Math.max(quantity.value - 1, 1); qtyInput.value = String(quantity.value); }
function blockNonNumber(e) {
  const ok = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
  if (ok.includes(e.key) || /^\d$/.test(e.key)) return;
  e.preventDefault();
}
watch(quantity, () => (qtyInput.value = String(quantity.value)), { immediate: true });

const canCheckout = computed(() => quantity.value >= 1 && quantity.value <= maxGroupCount.value);

// ─── 購物車 ──────────────────────────────────────────────────────────────
function addToCart() {
  if (!canCheckout.value) return;
  // stockLimit = 此規格下真正可購買的組數上限（庫存 ÷ 每組顆數）
  // 購物車的 +/- 必須以此為上限，而非原始庫存數
  cart.addItem({
    id:           product.value.id,
    productTitle: product.value.productTitle,
    price:        product.value.price,
    imageUrl:     product.value.imageUrl,
    sellerName:   product.value.sellerName,
    unit:         `${unitPerGroup.value} 顆 / 組`,
    category:     product.value.category,
    stock:        maxGroupCount.value,   // ← 傳「組數上限」而非原始庫存
    quantity:     quantity.value,
    pieces:       quantity.value * unitPerGroup.value,
  });
  toast.success("成功加入購物車！");
}
function buyNow() {
  toast.info("尚未開放直接購買");
}

// ─── 農夫頁跳轉 ──────────────────────────────────────────────────────────
function goFarmerAll() {
  router.push({ name: "farmerDetail", params: { id: product.value.sellerName } });
}

// ─── 農夫頭像（computed，同步 storeProduct）──────────────────────────────
const avatarSrc = computed(() => {
  const raw = storeProduct.value?.sellerAvatarUrl || "image/sandPear.webp";
  if (/^(https?:|data:|blob:)/.test(raw)) return raw;
  const clean = String(raw).replace(/^\/+/, "");
  return `${BASE}${clean}`;
});
</script>

<style scoped>
.detailPage { width: min(1200px, 92%); margin: 0 auto; padding: 7.5em 1.5em 2em 1.5em; }
.productSection { display: grid; grid-template-columns: 1fr; gap: 2em; margin-top: 1em; }
.gallery .mainImage { width: 100%; aspect-ratio: 1/1; border-radius: var(--radiusLarge); overflow: hidden; box-shadow: var(--shadow); background: #fff; }
.gallery .mainImage img { width: 100%; height: 100%; object-fit: cover; display: block; }
.thumbs { margin-top: 0.75em; display: grid; grid-template-columns: repeat(4, 1fr); gap: .5em; }
.thumbBtn { border: 1px solid #eee; border-radius: 8px; padding: 0; overflow: hidden; cursor: pointer; background: #fff; }
.thumbBtn img { width: 100%; height: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; }
.thumbBtn.active { outline: 2px solid var(--mainColor); }
.info .titleRow { display: flex; align-items: center; gap: 0.75em; }
.title { color: var(--secondColor); font-family: 'Noto Serif TC'; margin: 1em; }
.heart { margin-left: auto; border: none; background: transparent; cursor: pointer; font-size: 1.25em; color: var(--secondColor); }
.heart.active { color: var(--firstColor); }
.heart.animate { animation: pop 0.3s ease; }
@keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
.meta { display: flex; gap: 0.75em; align-items: center; margin: 0.5em 0 1em; flex-wrap: wrap; }
.tag { display: inline-flex; align-items: center; padding: 0.5em 0.8em; border-radius: var(--radiusNormal); font-size: 1em; background: var(--white); color: var(--mainColor); }
.tag[data-type="Hot"] { background: var(--secondColor); color: var(--white); }
.tag[data-type="New"] { background: var(--firstColor); color: var(--white); }
.tag[data-type="可自取"] { background: var(--mainColor); color: var(--white); }
.seller { color: var(--secondColor); }
.price { margin-left: auto; font-weight: 700; color: var(--secondColor); }
.label { font-weight: 700; color: var(--firstColor); margin-right: 0.5em; }
.specs { margin: 1em 0; }
.specButtons { display: flex; flex-wrap: wrap; gap: 0.5em; }
.specBtn { padding: 0.5em 1em; border: 1px solid var(--mainColor); border-radius: var(--radiusLarge); background: var(--backgroundColor); color: var(--mainColor); cursor: pointer; }
.specBtn.selected { background: var(--mainColor); color: var(--white); }
.quantityRow { display: flex; align-items: center; gap: 0.75em; margin: 1em 0; flex-wrap: wrap; }
.qtyControl { display: inline-flex; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; }
.qtyBtn { width: 40px; height: 40px; border: none; background: #f7f7f7; cursor: pointer; font-size: 1.2em; }
.qtyBtn:disabled { opacity: 0.4; cursor: not-allowed; }
.qtyInput { width: 64px; height: 40px; text-align: center; border: none; outline: none; }
.stock { color: var(--black); }
.warn { color: var(--warning); font-weight: 700; }
.desc { margin-top: 1em; }
.desc h3 { margin: 0 0 0.5em; }
.actions { display: flex; gap: 1em; margin-top: 1.25em; flex-wrap: wrap; }
.buyNow, .addCart { padding: 1em 2.5em; border-radius: var(--radiusLarge); border: none; cursor: pointer; font-weight: 700; }
.buyNow { background: var(--backgroundColor); color: var(--mainColor); transition: var(--transitionNormal); }
.buyNow:hover { color: var(--black); background-color: var(--addColor); }
.addCart { background: var(--mainColor); color: var(--white); transition: var(--transitionNormal); }
.addCart:hover { color: var(--black); background-color: var(--addColor); }
.buyNow:disabled, .addCart:disabled { opacity: 0.5; cursor: not-allowed; }
section.farmerSection { position: relative; padding: 1em 0; }
.farmerCard { width: 90%; position: relative; margin: 2em 0; display: flex; flex-direction: column; justify-self: center; align-items: center; gap: 2em; }
.farmerName { text-align: center; color: var(--black); }
.farmerInfo { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2em; }
.avatar { width: 265px; height: 295px; border-radius: 2em; overflow: hidden; object-fit: cover; }
.farmerDesc { text-align: justify; }
.viewAllButton { cursor: pointer; font-size: 1em; padding: 0.5em 1em; background-color: var(--mainColor); border: 0; color: var(--backgroundColor); border-radius: var(--radiusLarge); transition: var(--transitionNormal); max-width: 500px; }
@media(width>768px){
  .productSection { grid-template-columns: 1.1fr 1fr; align-items: start; }
  .farmerCard { max-width: 1200px; }
  .farmerInfo { flex-flow: row nowrap; gap: 2em; }
  .avatar { width: 100%; max-width: 500px; height: 250px; }
  .farmerDesc { width: 100%; }
  .viewAllButton:hover { color: var(--mainColor); background-color: var(--backgroundColor); }
}
</style>