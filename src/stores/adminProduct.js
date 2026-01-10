import { defineStore } from "pinia";
import { ref } from "vue";
export const useAdminProductStore = defineStore("adminProduct", () => {
  const products = ref([
    {
      id: 1001,
      productTitle: "有機香蕉",
      productTag: "當季水果",
      subTag: "高山種植",
      unit: "斤",
      originalPrice: 250,
      price: 199,
      isOutOfStock: false,
      status: "Hot",
      settings: ["Hot"],
      imageList: [
        "/morning-farm/image/banana.png",
        "/morning-farm/image/chinese-pear.png",
      ],
      description: "在臺灣這片土地上,有機高山水梨以當季水果的方式孕育而生。從栽種到採收,每一個環節都經過層層把關,只為保留最自然的風味。目前供應穩定,歡迎安心選購。每斤都蘊含著土地的心意,適合與家人一同分享。",
      farmerName: "清晨農鋪合作小農",
    },
    {
      id: 1002,
      productTitle: "友善栽培玉米筍",
      productTag: "新鮮蔬菜",
      subTag: "產地直送",
      unit: "盒",
      originalPrice: 0,
      price: 120,
      isOutOfStock: true,
      status: "New",
      settings: ["New"],
      imageList: [
        "/morning-farm/image/chinese-pear.png",
        "/morning-farm/image/apple.png",
        "/morning-farm/image/carrot.png",
      ],
      description: "友善栽培玉米筍來自小農細心照料的田間,是一份充滿溫度的農作。小農依照季節節奏調整作息,讓作物在最適合的時刻成熟。目前採收量有限,正等待下一批成熟。希望這份來自土地的禮物,能成為你生活中的一部分。",
      farmerName: "清晨農鋪合作小農",
    },
  ]);
  const addProduct = (product) => {
    products.value.push(product);
  };
  const updateProduct = (id, updatedData) => {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updatedData };
    }
  };
  const deleteProduct = (id) => {
    products.value = products.value.filter((p) => p.id !== id);
  };
  return{
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});