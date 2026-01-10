<template>
<section class="weekFarmerIntroduction">
  <h2>本週小農介紹</h2>
  <div class="container">
    <div class="farmerPhoto">
      <img src="/public/image/orange-1.png" alt="">
    </div>
    <div class="farmerInformation">
      <h4>【阿月嬤的橘子園】</h4>
      <h6>「橘香暖人心，甜在你心頭。」</h6>
      <p>
        大家都叫我阿月嬤，在雲林種橘子種了三十幾年。這片橘子園是我和阿公年輕時一起開墾的，現在由我和孫子一起照顧。我們不噴藥、少施肥，靠的是太陽、風和時間，讓橘子自然熟成、甜中帶一點微酸。每年冬天，是我最開心的季節，因為又可以把這份甜分享給你們。
        <br></br>吃一口阿月嬤的橘子，像冬天的太陽一樣暖呼呼的喔！
      </p>
      <div class="seeCommidityButton">
        <button type="button" class="seeCommidity" @click="goFarmerDetail">
          認識小農
        </button>
      </div>
    </div>
  </div>
</section>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const farmerName = '阿月嬤'
function goFarmerDetail() {
  router.push({
    name: 'farmerDetail',
    params: { id: farmerName }
  })
}
</script>
<style scoped>
section.weekFarmerIntroduction h2{
    text-align: center;
    color: var(--firstColor);
    margin: 1.5em 0 0 0;
}
section.weekFarmerIntroduction .container{
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
section.weekFarmerIntroduction .farmerPhoto{
    width: 100%;
    height: 383px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
section.weekFarmerIntroduction .farmerPhoto img{
    position: relative;
    object-fit: cover;
    width: 100%;
    border-radius: 2em;
    overflow: hidden;
}
section.weekFarmerIntroduction .farmerInformation{
    color: var(--black);
    text-align: justify;
    padding: 1em;
}
section.weekFarmerIntroduction .farmerInformation h4{
    margin: 0;
    padding: 0.5em 0;
}
section.weekFarmerIntroduction .farmerInformation h6{
    margin: 0;
    padding: 0.5em 0;
}
section.weekFarmerIntroduction .farmerInformation p{
    margin: 0;
    padding: 0.5em 0;
}
.seeCommidityButton {
    display: flex;
    justify-content: center;
    align-items: center;
}
section.weekFarmerIntroduction .farmerInformation button.seeCommidity{
    cursor: pointer;
    padding: 0.5em 2.5em;
    color: var(--backgroundColor);
    background-color: var(--mainColor);
    border-radius: var(--radiusLarge);
    border: 0;
}
@media (width >= 768px) {
    section.weekFarmerIntroduction h2{
        text-align: center;
        color: var(--firstColor);
    }
    section.weekFarmerIntroduction .container{
        flex-flow: row nowrap;
        gap: 1em;
    }
    section.weekFarmerIntroduction .farmerPhoto{
        width: 100%;
        height: 498px;
    }
    section.weekFarmerIntroduction .farmerPhoto img{
        object-fit: cover;
    }
    section.weekFarmerIntroduction .farmerInformation{
        color: var(--black);
        text-align: justify;
        max-width: 50%;
    }
    section.weekFarmerIntroduction .farmerInformation button.seeCommidity {
        cursor: pointer;
        padding: 0.5em 2.5em;
        color: var(--backgroundColor);
        background-color: var(--mainColor);
        border-radius: var(--radiusLarge);
        border: 0;
        transition: var(--transitionNormal);
        &:hover {
            background-color: var(--backgroundColor);
            color: var(--mainColor);
        }
    }
    section.weekFarmerIntroduction .farmerInformation button.seeCommidity:hover{
        color: var(--mainColor);
        background-color: var(--backgroundColor);
    }
}
</style>