<template>
  <div class="add-commodity">
    <form class="commodity-form" @submit.prevent="submitForm">
      <p class="required-text">*為必填欄位</p>
      <label class="required">商品名稱</label>
      <input v-model="form.productName" type="text" placeholder="請輸入商品名稱" required />
      <div class="upload-section">
        <label class="required"></label>
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          @change="handleFileUpload"
        />
        <p class="upload-status">
          已上傳 {{ form.imageList?.length || 0 }} 張（最少上傳 2 張）
        </p>
        <div class="preview-container">
          <div
            v-for="(img, index) in previewImages"
            :key="index"
            class="preview-item"
          >
            <img :src="img" alt="預覽圖片" />
            <button
              type="button"
              class="remove-img"
              @click="removeImage(index)"
            >
              ✕
            </button>
            <span v-if="index === 0" class="main-badge">
              主圖
            </span>
          </div>
        </div>
      </div>
      <label class="required">商品標籤</label>
      <input v-model="form.productTag" type="text" placeholder="請輸入標籤" />
      <label>商品次標籤</label>
      <input v-model="form.subTag" type="text" placeholder="可選填" />
      <p class="farmerName">小農：{{ farmerName }}</p>
      <label class="required">販售的每一單位</label>
      <div class="unit-group">
        <label><input type="radio" value="盒" v-model="form.unit" />盒</label>
        <label><input type="radio" value="斤" v-model="form.unit" />斤</label>
        <label><input type="radio" value="自訂" v-model="form.unit" />自訂</label>
        <input
          v-if="form.unit === '自訂'"
          type="text"
          v-model="form.customUnit"
          placeholder="自訂單位"
        />
      </div>
      <label>原價</label>
      <input v-model.number="form.originalPrice" type="number" placeholder="請輸入原價" />
      <label class="required">售價</label>
      <input v-model.number="form.price" type="number" required placeholder="請輸入售價" />
      <div class="form-group">
        <label class="required field-title">庫存狀態</label>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" value="充足" v-model="form.stock" />
            貨源充足
          </label>
          <label class="radio-option">
            <input type="radio" value="補貨中" v-model="form.stock" />
            補貨中
          </label>
        </div>
      </div>
      <label>其他設定（單選）</label>
      <div class="radio-group">
        <label class="radio-option">
          <input
            type="radio"
            value="Hot"
            v-model="form.settings"
          />
          Hot
        </label>
        <label class="radio-option">
          <input
            type="radio"
            value="New"
            v-model="form.settings"
          />
          New
        </label>
        <label class="radio-option">
          <input
            type="radio"
            value="可自取"
            v-model="form.settings"
          />
          可自取
        </label>
      </div>
      <label>商品詳細介紹 / 故事 / 想補充的</label>
      <textarea v-model="form.description" placeholder="請輸入詳細內容"></textarea>
      <div class="button-group">
        <button
          v-if="isEditMode"
          type="button"
          class="deleteBottomButton"
          @click="handleDeleteAndBack"
        >
          刪除
        </button>
        <button
          type="button"
          class="storyButton"
          @click="autoGenerateStory"
        >
          自動生成故事
        </button>
        <button
          type="button"
          class="cancelButton"
          @click="goBack"
        >
          取消
        </button>
        <button class="addButton" type="submit">
          {{ isEditMode ? "編輯完成" : "新增" }}
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, watch, computed, nextTick } from "vue";
import { useAdminProductStore } from "@/stores/adminProduct";
import { useToastStore } from "@/stores/toast";
import { gsap } from "gsap/gsap-core";
const productStore = useAdminProductStore();
const toastStore = useToastStore();
const emit = defineEmits(["back"]);
const props = defineProps({
  editingId: { type: [String, Number], default: null },
});
const MAX_IMAGES = 4;
const farmerName = "清晨農鋪合作小農";
const previewImages = ref([]);
const form = ref({
  productName: "",
  productTag: "",
  subTag: "",
  unit: "",
  customUnit: "",
  originalPrice: "",
  price: "",
  stock: "充足",
  settings: "",
  description: "",
  imageList: [],
});
const isEditMode = computed(() => props.editingId !== null);
const editingProduct = computed(() =>
  productStore.products.find(p => p.id === props.editingId) || null
);
watch(
  () => props.editingId,
  (id) => {
    if (!id || !editingProduct.value) return;

    const p = editingProduct.value;
    form.value = {
      productName: p.productTitle,
      productTag: p.productTag,
      subTag: p.subTag,
      unit: p.unit,
      customUnit: p.unit,
      originalPrice: p.originalPrice || "",
      price: p.price,
      stock: p.isOutOfStock ? "補貨中" : "充足",
      settings:
        Array.isArray(p.settings)
          ? p.settings[0] || ""
          : p.settings || p.status || "",
      description: p.description || "",
      imageList: [...(p.imageList || [])],
    };
    previewImages.value = [...(p.imageList || [])];
  },
  { immediate: true }
);
function resetForm(){
  form.value = {
    productName: "",
    productTag: "",
    subTag: "",
    unit: "",
    customUnit: "",
    originalPrice: "",
    price: "",
    stock: "充足",
    settings: [], 
    description: "",
    imageList: [],
  };
}
async function submitForm(){
    if (form.value.imageList.length < 2) {
    toastStore.error("請至少上傳 2 張商品圖片");
    return;
  }
  const productData = {
    productTitle: form.value.productName,
    productTag: form.value.productTag,
    subTag: form.value.subTag,
    unit: form.value.unit === "自訂" ? form.value.customUnit : form.value.unit,
    originalPrice: form.value.originalPrice
      ? Number(form.value.originalPrice)
      : 0,
    price: form.value.price,
    isOutOfStock: form.value.stock === "補貨中",
    status: form.value.settings || "",
    settings: form.value.settings ? [form.value.settings] : [],
    imageList: [...form.value.imageList],
    description: form.value.description,
    farmerName,
  };
  if (isEditMode.value){
    productStore.updateProduct(props.editingId, productData);
    toastStore.success("商品更新成功！");
    await nextTick();
    emit("back");
    return;
  }
  productStore.addProduct({
    id: Date.now(),
    ...productData,
  });
  toastStore.success("商品新增成功！");
  resetForm();
  await nextTick();
  emit("back");
}
function handleFileUpload(e){
  const files = Array.from(e.target.files);
  if (!files.length) return;
  if (previewImages.value.length + files.length > MAX_IMAGES) {
    toastStore.error(`最多只能上傳 ${MAX_IMAGES} 張圖片`);
    e.target.value = "";
    return;
  }
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      previewImages.value.push(e.target.result);
      form.value.imageList.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
  e.target.value = "";
}
function removeImage(index){
  previewImages.value.splice(index, 1);
  form.value.imageList.splice(index, 1);
}
function goBack(){
  emit("back");
}
function handleDeleteAndBack(){
  const ok = window.confirm("確定要刪除這個商品嗎？此動作無法復原！");
  if (!ok) return;
  productStore.deleteProduct(props.editingId);
  toastStore.success("商品已刪除");
  emit("back");
}
function autoGenerateStory(){
  const name = form.value.productName || "這項商品";
  const tag = form.value.productTag || "用心栽培";
  const unit = form.value.unit || "單位";
  const stockText =
    form.value.stock === "補貨中"
      ? "目前採收量有限，正等待下一批成熟。"
      : "目前供應穩定，歡迎安心選購。";
  const openings = [
    `在臺灣這片土地上，${name}以${tag}的方式孕育而生。`,
    `${name}來自小農細心照料的田間，是一份充滿溫度的農作。`,
    `我們相信，好的${name}，來自對土地的尊重與耐心等待。`,
    `清晨的第一道露水，滋養了每一顆${name}，讓它帶著山林的氣息來到你的餐桌。`,
    `${name}的故事，從一粒種子落入土壤的那一刻便悄悄開始。`,
    `小農世代耕耘這片土地，${name}正是他們對農業最真誠的詮釋。`,
    `不施催熟、不加添加，${name}只依循大自然的節奏，緩緩長成。`,
    `每一顆${name}背後，是農人無數個日出而作、日落而息的身影。`,
    `與其追求高產量，不如守住品質——這是我們種植${name}的初心。`,
    `${tag}的精神貫穿${name}的每一個生長階段，造就了它獨特的風味。`,
  ];
  const middles = [
    `從栽種到採收，每一個環節都經過層層把關，只為保留最自然的風味。`,
    `小農依照季節節奏調整作息，讓作物在最適合的時刻成熟。`,
    `不追求產量，而是專注於品質，是我們與小農共同的堅持。`,
    `土壤健康、水源純淨，配合友善農法，${name}在最舒適的環境中茁壯成長。`,
    `農人憑藉多年累積的經驗，用雙手感受每一株作物的狀態，給予最即時的照顧。`,
    `採收時節，農人親手挑選每一顆達到最佳熟度的${name}，不合格的一律淘汰。`,
    `我們拒絕慣行農藥，選擇與昆蟲、微生物共生，打造真正友善土地的耕作模式。`,
    `從播種、疏果、到最終採收，平均需要歷經數個月的細心照料，方能呈現給您。`,
    `每一批${name}都附有產地溯源資訊，讓您吃得安心、買得放心。`,
    `氣候、光照、雨量，每一個環境因素都牽動著${name}的成長，農人每天關注天氣變化，隨時調整灌溉與管理策略。`,
  ];
  const endings = [
    `每${unit}都蘊含著土地的心意，適合與家人一同分享。`,
    `無論是日常料理或特別時刻，${name}都能為餐桌增添風味。`,
    `希望這份來自土地的禮物，能成為你生活中的一部分。`,
    `品嚐${name}的同時，也是在支持一位默默耕耘的臺灣小農，謝謝您的選擇。`,
    `從產地到餐桌，我們只做一件事——讓你吃到最真實的${name}。`,
    `訂購${name}，不只是一次購物，更是一份對友善農業的支持與認同。`,
    `每${unit}${name}，都是小農用心、用時間換來的成果，值得細細品味。`,
    `新鮮現採、低溫配送，只為讓您在家也能感受現摘的鮮甜滋味。`,
    `感謝您選擇支持在地小農，您的每一次購買，都是讓臺灣農業持續下去的動力。`,
    `讓${name}走進你的廚房，為每一道料理注入最純粹的臺灣味。`,
  ];
  const story =
    pick(openings) +
    pick(middles) +
    stockText +
    pick(endings);
  form.value.description = story;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
</script>
<style scoped>
.required{
  position: relative;
  padding-left: 0.6em;
}
.required::before{
  content: "*";
  color: var(--warningColor);
  position: absolute;
  left: 0;
  font-weight: bold;
}
.add-commodity{
  background:var(--backgroundColor);
  padding: 1.5em;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  margin: 0 auto;
  font-size: 1em;
  color: var(--black);
}
.commodity-form{
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}
input,select,textarea{
  width: 100%;
  border: 1px solid var(--white);
  border-radius: 6px;
  padding: 0.5em;
  font-size: 1em;
}
input[type="radio"],
input[type="checkbox"] {
    width: auto;
    padding: 0;
    border: revert;
}
.unit-group{
  display: flex;
  align-items: center;
  gap: 1em;
}
.unit-group label{
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  white-space: nowrap;
  cursor: pointer;
}
.radio-group{
  display: flex;
  gap: 1.2em;
}
.radio-option{
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  white-space: nowrap;
  cursor: pointer;
}
textarea{
  min-height: 100px;
  resize: none;
}
.preview-container{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}
.preview-container img{
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
}
.checkbox-group{
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
}
.checkbox-option{
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  white-space: nowrap;
  cursor: pointer;
}
.button-group{
  display: flex;
  flex-flow: column nowrap;
  gap: 1em;
  margin: 1.5em 0;
}
.button-group button{
  width: 200px;
  margin: auto;
  border: none;
  padding: 0.6em;
  border-radius: var(--radiusNormal);
  cursor: pointer;
  transition: var(--transitionNormal);
}
.storyButton{
  background: var(--mainColor);
}
.cancelButton{
  background: var(--white);
}
.addButton{
  background: var(--mainColor);
  color: var(--white);
}
.deleteBottomButton{
  background-color: var(--warningColor);
  color: var(--white);
}
.required-text{
  color: var(--warningColor);
  font-size: 1.2em;
}
.preview-item{
  position: relative;
}
.remove-img{
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color:var(--white);
  font-size: 12px;
  cursor: pointer;
}
.main-badge{
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: var(--mainColor);
  color: var(--white);
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}
@media (width>=768px){
  .add-commodity{
    width: 100%;
    max-width: 1000px;
  }
  .storyButton:hover{
    background: var(--addColor);
    color: var(--black);
  }
  .cancelButton:hover{
    background: var(--addColor);
    color: var(--black);
  }
  .addButton:hover{
    background: var(--addColor);
    color: var(--black);
  }
  .deleteBottomButton:hover{
    background-color: var(--addColor);
    color: var(--black);
  }
}
</style>