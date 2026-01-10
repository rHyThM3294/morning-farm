<template>
<div v-if="order" class="searchListDetail">
    <h5>訂單詳細內容</h5>
    <div class="listBox">
        <div class="photo">
            <img src="/image/chinese-pear.png" alt="寶島甘露梨"> 
        </div>
        <div class="detail">
            <div class="productDetail">
                <div class="productTitle"><h6>寶島甘露梨</h6></div>
                <div class="specification">規格：15粒裝(每顆5.5~6.5兩)</div>
                <p class="detailListTime">購買時間：{{ order.time }}</p>
                <p class="detailListNumber">訂單編號：{{ order.number }}</p>
            </div>
            <div class="priceDetail">
                <div class="price">
                    <h6>價格</h6>
                    <p>NT${{ order.price }}</p>
                </div>
                <div class="many">
                    <h6>數量</h6>
                    <p>1</p>
                </div>
                <div class="allPrice">
                    <h6>小計</h6>
                    <p>NT${{ order.price }}</p>
                </div>
            </div>
        </div>
        <div class="listBoxButton">
            <button 
                type="button" 
                class="back" 
                @click="$emit('goBackSearchList')"
            >
                返回搜尋頁
            </button>
        </div>
    </div>
</div>
</template>
<script setup>
const props = defineProps({
  order: Object
})
</script>
<style>
    .searchListDetail{
        display: flex;
        flex-flow: column nowrap;
        justify-items: flex-start;
        gap: 2em;
        max-width: 1000px;
    }
    .searchListDetail h5{
        border-bottom: 1px solid var(--black);
    }
    .listBox{
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
    .photo{
        width: 300px;
        height:100%;
        overflow: hidden;
        border-radius: 12px;
    }
    .photo img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .detail{
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
    .productDetail{
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
    .productTitle{
        color: var(--firstColor);
    }
    .specification{
        color: var(--secondColor);
    }
    .priceDetail{
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
    .price,.many,.allPrice{
        padding: 0.5em 2em;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 1.5em;
    }
    .listBoxButton{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .back{
        cursor: pointer;
        padding: 1em 2.5em;
        color: var(--black);
        background-color: var(--backgroundColor);
        border: 0;
        border-radius: var(--radiusLarge);
        transition: var(--transitionNormal);
    }
    @media (width>=768px){
        .searchListDetail{
            justify-content: flex-start;
        }
        .priceDetail{
            flex-flow: row nowrap;
            gap: 2.5em;
        }
        .price,.many,.allPrice{
            flex-flow: column nowrap;
            gap: 0.5em;
        }
        .listBoxButton{
            justify-content: flex-start;
            align-items: center;
        }
        .back:hover{
            color: var(--white);
            background-color: var(--mainColor);
        }
    }
</style>
