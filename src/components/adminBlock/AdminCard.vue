<template>
  <div class="card">
    <button
      type="button"
      class="deleteIcon"
      @click.stop="handleDeleteClick"
      aria-label="刪除商品"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="cardUp" @click="openPreview">
      <div v-if="status" class="state">{{ status }}</div>
      <img :src="mainImage" alt="商品圖片" />
      <div class="hoverHint">點擊預覽圖片</div>
    </div>
    <div class="cardBottom" @click="emitEdit">
      <h5 class="productTitle">{{ productTitle }}</h5>
      <div class="tag">
        <p class="firstTag">{{ productTag }}</p>
        <p class="secondTag" v-if="subTag">/{{ subTag }}</p>
      </div>
      <p class="farmerName">{{ farmerName }}</p>
      <p class="unit">1{{ unit }}</p>
      <p class="supplies" v-if="isOutOfStock">(補貨中)</p>
      <p
        v-if="originalPrice && originalPrice > price"
        class="originalPrice"
      >
        NT$ {{ originalPrice }}
      </p>
      <div class="lastSeries">
        <h6 class="price">NT$ {{ price }}</h6>
        <button type="button" class="inToEddit" @click.stop="emitEdit">
          進入編輯 <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
    <div
      v-if="isPreviewOpen"
      class="previewOverlay"
      @click="closePreview"
    >
      <div class="previewDialog" @click.stop>
        <img
          class="previewImage"
          :src="currentPreviewImage"
          alt="預覽圖片"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        />
        <div class="thumbRow">
          <button
            v-for="(thumb, index) in previewImageList"
            :key="index"
            type="button"
            class="thumbItem"
            :class="{ activeThumb: index === currentImageIndex }"
            @click="setCurrentImage(index)"
          >
            <img :src="thumb" alt="商品縮圖" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { ref, computed } from "vue";
import { useAdminProductStore } from "@/stores/adminProduct";
import { useToastStore } from "@/stores/toast";
const adminProductStore = useAdminProductStore();
const toastStore = useToastStore();
const props = defineProps({
  id: { type: [String, Number], required: true },
  status: { type: String, default: "New" },
  productTitle: { type: String, default: "未命名商品" },
  productTag: { type: String, default: "" },
  subTag: { type: String, default: "" },
  farmerName: { type: String, default: "" },
  unit: { type: String, default: "" },
  originalPrice: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  isOutOfStock: { type: Boolean, default: false },
  imageList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["edit"]);
const fallbackImage = "/image/chinese-pear.png";
const mainImage = computed(() => {
  return props.imageList && props.imageList.length > 0
    ? props.imageList[0]
    : fallbackImage;
});
const previewImageList = computed(() => {
  return props.imageList && props.imageList.length > 0
    ? props.imageList
    : [fallbackImage];
});
const isPreviewOpen = ref(false);
const currentImageIndex = ref(0);
const touchStartX = ref(0)
const currentPreviewImage = computed(
  () => previewImageList.value[currentImageIndex.value] || fallbackImage
);
const openPreview = () => {
  isPreviewOpen.value = true;
  currentImageIndex.value = 0;
};
const closePreview = () => {
  isPreviewOpen.value = false;
};
const setCurrentImage = (index) => {
  currentImageIndex.value = index;
};
const showNextImage = () => {
  const total = previewImageList.value.length;
  if (total <= 1) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % total;
};
const showPrevImage = () => {
  const total = previewImageList.value.length;
  if (total <= 1) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + total) % total;
};
const handleTouchStart = (e) => {
  if (!e.touches || !e.touches.length) return;
  touchStartX.value = e.touches[0].clientX;
};
const handleTouchEnd = (e) => {
  if (!e.changedTouches || !e.changedTouches.length) return;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - touchStartX.value;
  if (Math.abs(deltaX) < 30) return;
  if (deltaX < 0) {
    showNextImage();
  } else {
    showPrevImage();
  }
};
const emitEdit = () => {
  emit("edit", props.id);
};
const handleDeleteClick = () => {
  const ok = window.confirm("確定要刪除這個商品嗎?\n此動作無法復原。");
  if (!ok) return;
  adminProductStore.deleteProduct(props.id);
  toastStore.success("商品已刪除");
};
console.log('AdminCard imageList:', props.imageList)
</script>
<style scoped>
.card {
  width: 300px;
  height: auto;
  background-color: var(--white);
  border: 1px solid var(--mainColor);
  border-radius: var(--radiusNormal);
  transition: var(--transitionNormal);
  position: relative;
}
.deleteIcon {
  position: absolute;
  top: 0.4em;
  left: 0.4em;
  z-index: 2;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: var(--white);
  width: 26px;
  height: 26px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.cardUp {
    cursor: pointer;
    width: 100%;
    height: 260px;
    position: relative;
    overflow: hidden;
}
.cardUp img {
  width: 100%;
  border-radius: 8px 8px 0 0;
}
.state {
  position: absolute;
  right: 1em;
  top: 1em;
  padding: 0.2em 0.4em;
  border-radius: var(--radiusNormal);
  color: var(--white);
  background-color: var(--secondColor);
}
.hoverHint{
  display: none;
}
.cardBottom{
  cursor: pointer;
  height: 260px;
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
  gap: 0.5em;
  padding: 1em;
}
.productTitle {
  color: var(--black);
}
.tag {
  display: flex;
  align-items: center;
}
.secondTag {
  font-size: 14px;
}
.farmerName {
  color: var(--black);
}
.supplies {
  color: var(--secondColor);
}
.originalPrice {
  font-size: 14px;
  color: var(--gray);
  text-decoration: line-through;
}
.lastSeries {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: var(--secondColor);
}
.inToEddit {
  cursor: pointer;
  color: var(--addColor);
  font-size: 1.5em;
  background-color: transparent;
  border: 0;
  transition: var(--transitionNormal);
}
.previewOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
}
.previewDialog {
  background: var(--white);
  border-radius: var(--radiusNormal);
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.8em;
  box-sizing: border-box;
}
.previewImage {
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: var(--radiusNormal);
}
.thumbRow {
  margin-top: 0.8em;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  overflow-x: auto;
  padding-bottom: 0.2em;
}
.thumbItem {
  border: none;
  background: transparent;
  padding: 0;
  flex: 0 0 auto;
  border-radius: var(--radiusNormal);
  overflow: hidden;
  opacity: 0.6;
}

.thumbItem img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.activeThumb {
  opacity: 1;
  outline: 2px solid var(--mainColor);
}
@media (width >= 768px) {
  .hoverHint {
    display: flex;
    position: absolute;
    inset: 0;
    border-radius: 8px 8px 0 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    color: var(--white);
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    opacity: 0;
    transition: opacity var(--transitionNormal);
    pointer-events: none;
  }
  .cardUp:hover .hoverHint {
    opacity: 1;
  }
  @keyframes arrowMove {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(4px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .cardBottom:hover .inToEddit i {
    animation: arrowMove 0.6s infinite;
  }
  .deleteIcon i {
    transition: transform 0.6s;
  }
  .deleteIcon:hover i {
    transform: rotate(-720deg);
  }
  .previewDialog {
    max-width: 600px;
  }
}
</style>
