<template>
  <div v-if="!isLoading">
    <div class="farmerDetail" v-if="farmer">
      <div class="introduction">
        <img :src="farmer.imageUrl" :alt="farmer.farmerName" class="farmerPhoto" />
        <div class="introductionText">
          <h3>{{ farmer.farmerName }}</h3>
          <p>主要作物：{{ farmer.crop }}</p>
          <p>開始合作日期：{{ farmer.date }}</p>
          <p>目前讚數：{{ farmer.likes }}</p>
        </div>
      </div>
      <div class="additional">
        <div class="listPhoto"></div>
        <div class="listText">
          <h6>「用一輩子的細心，種出自然的甜。」</h6>
          <p>在彰化員林的一處鄉間小路旁，有一座不起眼的小果園，園主是62歲的秀英阿嬤。她個子不高、總是綁著頭巾、穿著袖套，推著手推車在葡萄架下來回穿梭。她不是為了什麼大夢想，只是想種出讓家人安心吃的葡萄，於是就這樣一種，就是十幾年。</p>
          <p>和常見的紫色巨峰不同，秀英阿嬤專種的是翠綠色的葡萄，表皮晶瑩剔透，像一顆顆閃亮的綠寶石。這品種對氣候、管理都很講究，一點不細心就容易酸、裂果，但阿嬤總是笑著說：「水果就像小孩，愈黏它，愈會回報你。」</p>
          <p>她的管理方式很樸實，靠的是早晚巡園、人工除草、不使用化學農藥，只用自家釀的苦茶水與蒜頭水來防蟲。每一串葡萄從開花、套袋到採收，都是她親手照料。她說：「我不求多，只求每一顆葡萄都能安心給孩子吃。」</p>
          <p>綠葡萄熟成時不會轉色，所以要靠經驗與直覺判斷成熟度。秀英阿嬤說她靠的不是糖度計，而是「用手摸、用心看」。她的綠葡萄吃起來脆中帶汁，甜味乾淨、不膩口，還帶有自然果香，熟客都說是「一吃就停不下來的味道」。</p>
          <p>因為堅持自然種植，產量有限，阿嬤只在在地小市集販售或透過熟人預訂。每一箱葡萄她都親手包裝，附上一張手寫小卡，上面寫著：「感謝你吃我的葡萄，這是我用太陽和時間種出來的。」她笑說：「我年紀也不小了，做一天算一天，但能種出讓人喜歡的東西，這輩子就很滿足了。」</p>
        </div>
      </div>
      <div class="anothers" v-if="farmerProducts.length">
        <h5>來這裡購買{{ farmer.farmerName }}的產品</h5>
        <div class="containerCard">
          <Card v-for="item in farmerProducts" :key="item.id" v-bind="item" />
        </div>
      </div>
    <RouterLink to="/cooperation-farmer" class="backAllFarmer">← 返回合作小農總覽</RouterLink>
    </div>
    <div v-else class="notFound">
      <p>找不到該小農資料，將自動返回合作小農總覽...</p>
    </div>
    <AsideButton />
  </div>
  <div v-else style="text-align:center;margin:5em 0;color:gray;">載入中...</div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AsideButton from '../../components/common/AsideButton.vue'
import Card from '../../components/common/Card.vue'
const route = useRoute()
const router = useRouter()
const base = import.meta.env.BASE_URL
const isLoading = ref(true)
const farmer = ref(null)
const farmerProducts = ref([])
const allFarmers = [
  { farmerName: '陳阿明', crop: '日照番茄', likes: 720, date: '2024-05-12', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '李春花', crop: '蜜香木瓜', likes: 680, date: '2024-06-01', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '黃文發', crop: '紅肉火龍果', likes: 950, date: '2024-03-28', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '張育成', crop: '甜玉米', likes: 340, date: '2024-01-25', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '林秀蘭', crop: '蜜香蓮霧', likes: 888, date: '2024-08-10', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
  { farmerName: '王建國', crop: '高山萵苣', likes: 320, date: '2024-07-20', imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png` },
]
function createFarmerProducts(found) {
  const crop = found.crop
  let cropImage = 'default'
  if (crop.includes('番茄')) cropImage = 'tomato'
  else if (crop.includes('木瓜')) cropImage = 'papaya'
  else if (crop.includes('火龍果')) cropImage = 'dragonfruit'
  else if (crop.includes('萵苣')) cropImage = 'lettuce'
  else if (crop.includes('芭樂')) cropImage = 'guava'
  else if (crop.includes('玉米')) cropImage = 'corn'
  else if (crop.includes('蓮霧')) cropImage = 'waxapple'
   return [
    {
      id: `${found.farmerName}-1`,
      status: 'Hot',
      productTitle: `${found.crop}`,
      sellerName: found.farmerName,
      unit: '500g / 盒',
      price: 350,
      imageUrl: `chinese-pear.png`,
      category: 'fruit',
      stock: 20,
      sellerAvatarUrl: '/image/頭貼.png',
      farmerDescription: `由 ${found.farmerName} 採收的 ${found.crop}，香氣濃郁、自然甜味。`
    },
    {
      id: `${found.farmerName}-2`,
      status: 'New',
      productTitle: `${found.crop}`,
      sellerName: found.farmerName,
      unit: '300g / 盒',
      price: 420,
      imageUrl: `chinese-pear.png`,
      category: 'process',
      stock: 12,
      sellerAvatarUrl: '/image/頭貼.png',
      farmerDescription: `${found.farmerName} 手工製作的 ${found.crop} 果乾，無添加防腐劑。`
    }
  ]
}
async function loadFarmer(idParam) {
  isLoading.value = true
  await nextTick()

  const decoded = decodeURIComponent(idParam || '').trim()
  const found = allFarmers.find(f => f.farmerName.trim() === decoded)

  if (found){
    farmer.value = found
    farmerProducts.value = createFarmerProducts(found)
  } else{
    farmer.value = {
      farmerName: decoded || '未知小農',
      crop: '季節水果',
      likes: 0,
      date: '2024-01-01',
      imageUrl: `${base}image/farmers-are-working-chinese-cabbage-farm.png`
    }
    farmerProducts.value = createFarmerProducts(farmer.value)
  }

  isLoading.value = false
}
onMounted(() => {
  nextTick(() => {
    if (route.params.id) loadFarmer(route.params.id)
    else router.push('/cooperation-farmer')
  })
})
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      loadFarmer(newId)
      window.scrollTo({ top: 0 })
    }
  }
)
</script>
<style scoped>
.farmerDetail{
  width: 90%;
  margin: 10em auto;
  text-align: center;
}
.introduction{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 2em;
  margin: 4em 0;
}
.introductionText{
  text-align: justify;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
.farmerPhoto{
  width: 100%;
  border-radius: 1em;
  margin-bottom: 1.5em;
}
.additional{
  display: flex;
  flex-flow: column nowrap;
  gap: 2em;
}
.listText{
  text-align: justify;
}
.listPhoto{
  width: 100%;
  height: 378px;
  background: url('/image/whitegrapes.png') no-repeat center/cover;
  border-radius: var(--radiusNormal);
}
.backAllFarmer{
  cursor: pointer;
  font-size: 1.1em;
  margin: 1em auto;
  padding: 0.5em 1.5em;
  background-color: var(--mainColor);
  color: var(--backgroundColor);
  border: 0;
  border-radius: var(--radiusLarge);
  transition: var(--transitionNormal);
}
.anothers{
  width: 90%;
  margin: 5em auto;
}
.anothers h5{
  color: var(--firstColor);
  margin-bottom: 1em;
}
.containerCard{
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  justify-content: center;
}

@media screen and (min-width:768px){
  .farmerDetail{
    max-width: 1200px;
  }
  .introduction{
    flex-flow: row nowrap;
  }
  .farmerPhoto{
    width: 50%;
  }
  .introductionText{
    width: 50%;
  }
  .additional{
    flex-flow: row-reverse nowrap;
  }
  .backAllFarmer:hover{
    color: var(--mainColor);
    background-color: var(--backgroundColor);
  }
}
</style>
