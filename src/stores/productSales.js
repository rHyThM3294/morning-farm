import { defineStore } from "pinia";
import { ref, computed } from "vue";
const baseImg = (name) => `${import.meta.envBASE_URL}images/${name}`;
export const useProductSalesStore = defineStore("productSales",() => {
    const topProducts = ref([
        {
            id:1,
            name:"砂糖橘",
            emoji: "🍊",
            unitPrice:"200/1斤",
            soldQty:68,
            salesAmount:13600,
            stock:500,
            image:baseImg("orange-1.png"),
        },
        {
            id:2,
            name:"橘子果乾",
            emoji: "🌀",
            unitPrice:"150/100克",
            soldQty:42,
            salesAmount:6300,
            stock:200,
            image:baseImg("orange.png"),
        },
        {
            id:3,
            name:"橘子醬",
            emoji: "🍑",
            unitPrice:"370/500克",
            soldQty:19,
            salesAmount:7030,
            stock:100,
            image:baseImg("mango.png"),
        },
        {
            id:4,
            name:"柑橘蜜餞",
            emoji:"",
            unitPrice:"250/300克",
            soldQty:18,
            salesAmount:4500,
            stock:50,
            image:null,
        },
        {
            id:5,
            name:"橘子汁",
            emoji:"",
            unitPrice:"100/500毫公升",
            soldQty:15,
            salesAmount:1500,
            stock:50,
            image:null,
        },
    ]);
    const maxSoldQty = computed(() => 
        Math.max(...topProducts.value.map((p) =>p.soldQty))
    );
    const topThreeWithImage = computed(() => 
        topProducts.value.filter((p) => p.image).slice(0, 3)
    );
    const restProducts = computed(() => 
        topProducts.value.slice(3)
    );
    return{
        topProducts,
        maxSoldQty,
        topThreeWithImage,
        restProducts,
    };
});