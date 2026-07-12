import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface TopProduct {
  id: number
  name: string
  emoji: string
  unitPrice: string
  soldQty: number
  salesAmount: number
  stock: number
  image: string | null
}

const baseImg = (name: string) => `${import.meta.env.BASE_URL}image/${name}`;

export const useProductSalesStore = defineStore("productSales", () => {
  // ── 暢銷商品資料（含圖片、銷售統計）────────────────────
  const topProducts = ref<TopProduct[]>([
    {
      id: 1,
      name: "砂糖橘",
      emoji: "🍊",
      unitPrice: "200/一斤",
      soldQty: 68,
      salesAmount: 13600,
      stock: 500,
      image: baseImg("orange-1.png"),
    },
    {
      id: 2,
      name: "橘子果乾",
      emoji: "🌀",
      unitPrice: "150/100克",
      soldQty: 42,
      salesAmount: 6300,
      stock: 200,
      image: baseImg("orange.png"),
    },
    {
      id: 3,
      name: "橘子醬",
      emoji: "🍑",
      unitPrice: "370/500克",
      soldQty: 19,
      salesAmount: 7030,
      stock: 100,
      image: baseImg("mango.png"),
    },
    {
      id: 4,
      name: "柑橘蜜餞",
      emoji: "",
      unitPrice: "250/300克",
      soldQty: 18,
      salesAmount: 4500,
      stock: 50,
      image: null,
    },
    {
      id: 5,
      name: "橘子汁",
      emoji: "",
      unitPrice: "100/500毫升",
      soldQty: 15,
      salesAmount: 1500,
      stock: 50,
      image: null,
    },
  ]);

  // 圖表用：最大銷售量（用於長條高度計算）
  const maxSoldQty = computed(() =>
    Math.max(...topProducts.value.map((p) => p.soldQty))
  );

  // 前 3 名有圖片的商品
  const topThreeWithImage = computed(() =>
    topProducts.value.filter((p) => p.image).slice(0, 3)
  );

  // 其餘（第 4 名起）沒有圖的商品
  const restProducts = computed(() =>
    topProducts.value.slice(3)
  );

  return {
    topProducts,
    maxSoldQty,
    topThreeWithImage,
    restProducts,
  };
});
