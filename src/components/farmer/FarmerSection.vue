<template>
  <section class="weekFarmer">
    <h2>{{ title }}</h2>
    <div class="container">
      <div
        class="cardFarmer"
        v-for="(farmer, index) in farmers"
        :key="index"
        @click="goDetail(farmer)"
      >
        <div class="farmerPhoto">
          <img :src="farmer.imageUrl" :alt="farmer.farmerName" />
        </div>
        <div class="goodNumbers">
          <i class="fa-regular fa-thumbs-up"></i>{{ farmer.likes }}
        </div>
        <div class="farmerName">{{ farmer.farmerName }}</div>
        <div class="crop">農作物：{{ farmer.crop }}</div>
        <button type="button" class="seeCommodity">
          {{ buttonText }}
        </button>
      </div>
    </div>
    <button
      v-if="showMoreButton"
      type="button"
      class="moreFarmer"
      @click="goToCooperation"
    >
      {{ moreButtonText }}
    </button>
  </section>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToCooperation = () => {
  router.push({ name: 'cooperation-farmer' })
}
const goDetail = async (farmer) => {
  const encodedName = encodeURIComponent(farmer.farmerName.trim())
  try{
    if (router.currentRoute.value.params.id !== encodedName) {
      await router.push({ name: 'farmerDetail', params: { id: encodedName } })
    }
  }catch (err){
    console.warn('導航被忽略：', err)
  }
}
defineProps({
  title: { type: String, default: '本週超讚小農' },
  buttonText: { type: String, default: '認識小農' },
  moreButtonText: { type: String, default: '我想看更多' },
  showMoreButton: { type: Boolean, default: true },
  farmers: {
    type: Array,
    default: () => [
      {
        farmerName: '張大成',
        crop: '高山萵苣',
        likes: 600,
        imageUrl: `${import.meta.env.BASE_URL}image/farmers-are-working-chinese-cabbage-farm.png`
      },
      {
        farmerName: '林秀蘭',
        crop: '蜜香蓮霧',
        likes: 550,
        imageUrl: `${import.meta.env.BASE_URL}image/farmers-are-working-chinese-cabbage-farm.png`
      },
      {
        farmerName: '陳建興',
        crop: '芭樂王',
        likes: 480,
        imageUrl: `${import.meta.env.BASE_URL}image/farmers-are-working-chinese-cabbage-farm.png`
      },
    ]
  }
})
</script>
<style scoped>
.weekFarmer{
  width: 90%;
  margin:2em auto;
  text-align: center;
}
.weekFarmer h2{
  color: var(--firstColor);
  margin: 1em 0;
}
.weekFarmer .container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
.cardFarmer{
  cursor: pointer;
  width: 300px;
  height: auto;
  border: none;
  border-radius: var(--radiusLarge);
  overflow: hidden;
  background-color: var(--white);
  text-align: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: var(--transitionNormal);
}
.cardFarmer:hover{
  transform: translateY(-4px);
}
.farmerPhoto{
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}
.farmerPhoto img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.goodNumbers{
  color: var(--secondColor);
  font-weight: bold;
  margin-top: 0.5em;
}
.farmerName{
  font-size: 1.1em;
  color: var(--firstColor);
  margin-top: 0.5em;
  text-align: center;
}
.crop{
  margin: 0.5em 0;
}
.seeCommodity{
  background-color: var(--mainColor);
  color: var(--white);
  border: none;
  border-radius: var(--radiusLarge);
  padding: 0.5em 1.2em;
  margin-bottom: 1em;
  cursor: pointer;
  transition: var(--transitionNormal);
}
.moreFarmer{
  background-color: var(--mainColor);
  color: var(--white);
  padding: 1em 2.5em;
  margin: 2.5em 0;
  border: 0;
  border-radius: var(--radiusLarge);
  cursor: pointer;
  transition: var(--transitionNormal);
}
@media screen and (min-width: 768px){
  .weekFarmer .container{
    width: 100%;
    flex-flow: row wrap;
    justify-content: center;
    align-items: stretch;
  }
  .seeCommodity:hover{
    background-color: var(--backgroundColor);
    color: var(--mainColor);
  }
  .moreFarmer:hover{
    background-color: var(--backgroundColor);
    color: var(--mainColor);
  }
}
</style>
