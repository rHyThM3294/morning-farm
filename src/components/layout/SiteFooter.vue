<template>
    <footer>
        <div class="waveContainer">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
        <div class="waveText">
            <div class="container">
                <p>「我們是一群相信土地力量的農友，將新鮮與安心送到你手中。」</p>
                <p>聯絡資訊<br>02-66316588｜abcdefg@gmail.com｜客服時間 10:00~18:00<br>106臺北市大安區復興南路一段390號2樓</p>
                <div class="icons">
                    <i class="fa-brands fa-facebook"><!-- 臉書 --></i>
                    <i class="fa-brands fa-instagram"><!-- Instagram --></i>
                    <i class="fa-regular fa-envelope"><!-- 信箱 --></i>
                    <i class="fa-brands fa-line"><!-- LINE --></i>
                    <i class="fa-brands fa-youtube"><!-- YouTube --></i>
                </div>
                <p>© 2025 清晨農鋪 All Rights Reserved. 本網站由UX班第六組設計／維運</p>
            </div>
        </div>
    </footer>
</template>
<script setup>
</script>
<style scoped>
.waveContainer{
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}
.wave{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,50 Q150,0 300,50 T600,50 T900,50 T1200,50 L1200,120 L0,120 Z" fill="%23F39A6C"/></svg>') repeat-x;
    background-size: 50% 100%;
    animation: wave 15s linear infinite;
}
.wave:nth-child(2){
    opacity: 0.7;
    animation: wave 20s linear infinite reverse;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="%23F39A7C"/></svg>') repeat-x;
    background-size: 50% 100%;
}
.wave:nth-child(3){
    opacity: 0.5;
    animation: wave 25s linear infinite;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,120 L0,120 Z" fill="%23F39A8C"/></svg>') repeat-x;
    background-size: 50% 100%;
}
@keyframes wave{
    0%{
        transform: translateX(0);
    }
    100%{
        transform: translateX(-50%);
    }
}
.waveText{
    background-color: var(--firstColor);
    color: var(--white);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 3em 2em;
}
.waveText .container{
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 2em;
}
.waveText .icons{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5em;
    font-size: 2em;
}
</style>