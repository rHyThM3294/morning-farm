<template>
    <section class="question">
        <h2>常見問題Q&A</h2>
        <div class="container">
            <div class="questionBox">
                <h5>出貨相關</h5>
                <div class="questionBoxItem">
                    <h6>Q1：下單後多久會出貨？</h6>
                    <p>A：商品皆為小農現採或新鮮備貨，約 2–5 個工作天內出貨（不含假日）。</p>
                    <h6>Q2：可以指定送達日期嗎？</h6>
                    <p>A：部分商品可指定到貨日，請於結帳頁備註，我們將盡力安排。</p>
                    <h6>Q3：可以配送外島嗎？</h6>
                    <p>A：目前僅提供台灣本島配送，若有特殊需求可私訊客服討論。</p>
                </div>
            </div>
            <div class="questionBox">
                <h5>其他問題</h5>
                <div class="questionBoxItem">
                    <h6>Q1：為什麼價格比市場高？</h6>
                    <p>我們支持友善耕作、永續農業，商品由產地直送，無經過中間剝削，讓小農獲得合理收入。</p>
                    <h6>Q2：怎麼確保真的支持到農夫？</h6>
                    <p>A：平台與小農合作皆有公開資訊，也會不定期分享產地故事，讓您了解每一顆蔬果的來源與努力。</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
</script>
<style scoped>
.question{
    width: 90%;
    margin: 2em auto 1em auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.question h2{
    color: var(--firstColor);
}
.container{
    display: flex;
    flex-flow: column nowrap;
    gap: 2em;
}
.questionBox{
    width: 100%;
    padding: 2em;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
    background-color: var(--backgroundColor);
    border-radius: var(--radiusNormal);
}
@media(width>=768px){
    .question{
        max-width: 1200px;
    }
    .container{
        flex-flow: row nowrap;
        align-items: stretch;
    }
}
</style>