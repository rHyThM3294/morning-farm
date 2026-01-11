<template>
<div class="partition"><img src="/public/image/banner.png" alt="我只是分隔線"></div>
</template>
<script setup>
</script>
<style scoped>
.partition{
    position: relative;
    width: 100%;
    overflow: hidden; 
    top: -12vh;
}
.partition img{
    position: relative;
    left: 50%;
    transform: translateX(-50%) scale(0.7);
}
@media(width>=768px){
    .partition{
        position: relative;
        width: 100%;
        height: 175px;
        top: -15vh;
    }
    .partition img{
        transform: scaleX(1.5);
    }
}
</style>