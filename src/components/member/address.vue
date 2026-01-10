<template>
  <div class="address">
    <h5>收件地址</h5>
    <div class="addressOne">
      <h6>地址 1</h6>
      <input
        type="text"
        v-model.trim="addr1.zip"
        placeholder="郵遞區號"
        @blur="validateZip('addr1')"
        :class="{ error: errors.addr1.zip }"
      />
    <div class="set">
      <select 
        v-model="addr1.city" 
        @change="onCityChange('addr1')"
        :class="{ error: errors.addr1.city }"
      >
        <option value="" disabled>選擇縣市</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
      <select
        v-model="addr1.district"
        :disabled="!addr1.city"
        @blur="validateDistrict('addr1')"
        :class="{ error: errors.addr1.district }"
      >
        <option value="" disabled>選擇區域</option>
        <option
          v-for="d in getDistricts(addr1.city)"
          :key="d"
          :value="d"
        >
          {{ d }}
        </option>
      </select>
    </div>
      <input
        type="text"
        v-model.trim="addr1.detail"
        placeholder="輸入詳細地址"
        @blur="validateDetail('addr1')"
        :class="{ error: errors.addr1.detail }"
      />
    </div>
    <div class="addressTwo">
      <h6>地址 2</h6>
      <input
        type="text"
        v-model.trim="addr2.zip"
        placeholder="郵遞區號"
        @blur="validateZip('addr2')"
        :class="{ error: errors.addr2.zip }"
      />
    <div class="set">
        <select 
            v-model="addr2.city" 
            @change="onCityChange('addr2')"
            :class="{ error: errors.addr2.city }"
        >
            <option value="" disabled>選擇縣市</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
        <select
            v-model="addr2.district"
            :disabled="!addr2.city"
            @blur="validateDistrict('addr2')"
            :class="{ error: errors.addr2.district }"
        >
            <option value="" disabled>選擇區域</option>
            <option
            v-for="d in getDistricts(addr2.city)"
            :key="d"
            :value="d"
            >
            {{ d }}
            </option>
        </select>
    </div>
      <input
        type="text"
        v-model.trim="addr2.detail"
        placeholder="輸入詳細地址"
        @blur="validateDetail('addr2')"
        :class="{ error: errors.addr2.detail }"
      />
    </div>
    <div class="addressButtons">
      <button type="button" @click="resetAll">全部取消</button>
      <button type="button" @click="submit">確定修改</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { useToastStore } from "@/stores/toast"  
const toast = useToastStore()                   
const taiwanAreas = {
  '臺北市': ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
  '新北市': ['板橋區', '新莊區', '中和區', '永和區', '土城區', '樹林區', '三峽區', '鶯歌區', '三重區', '蘆洲區', '五股區', '泰山區', '林口區', '八里區', '淡水區', '三芝區', '石門區', '金山區', '萬里區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區', '雙溪區', '貢寮區', '坪林區', '烏來區'],
  '桃園市': ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '大園區', '龜山區', '龍潭區', '新屋區', '觀音區', '復興區'],
  '臺中市': ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '后里區', '石岡區', '東勢區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'],
  '臺南市': ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'],
  '高雄市': ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區', '楠梓區', '小港區', '左營區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '甲仙區', '杉林區', '內門區', '茂林區', '桃源區', '那瑪夏區'],
  '基隆市': ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '新竹市': ['東區', '北區', '香山區'],
  '嘉義市': ['東區', '西區'],
  '新竹縣': ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '五峰鄉', '尖石鄉', '寶山鄉', '峨眉鄉'],
  '苗栗縣': ['苗栗市', '通霄鎮', '苑裡鎮', '竹南鎮', '頭份市', '後龍鎮', '卓蘭鎮', '大湖鄉', '公館鄉', '銅鑼鄉', '南庄鄉', '頭屋鄉', '三義鄉', '西湖鄉', '造橋鄉', '三灣鄉', '獅潭鄉', '泰安鄉'],
  '彰化縣': ['彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '田中鎮', '北斗鎮', '二林鎮', '線西鄉', '伸港鄉', '福興鄉', '秀水鄉', '花壇鄉', '芬園鄉', '大村鄉', '埔鹽鄉', '埔心鄉', '永靖鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '芳苑鄉', '大城鄉', '竹塘鄉', '溪州鄉'],
  '南投縣': ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '雲林縣': ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '三條崙', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '臺西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
  '嘉義縣': ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '屏東縣': ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉', '三地門鄉'],
  '宜蘭縣': ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣': ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '萬榮鄉', '卓溪鄉', '富里鄉', '秀林鄉'],
  '臺東縣': ['臺東市', '成功鎮', '關山鎮', '卑南鄉', '大武鄉', '太麻里鄉', '東河鄉', '長濱鄉', '鹿野鄉', '池上鄉', '綠島鄉', '蘭嶼鄉', '延平鄉', '海端鄉', '達仁鄉', '金峰鄉'],
  '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
};
const addr1 = ref({
  zip: '',
  city: '',
  district: '',
  detail: ''
})
const addr2 = ref({
  zip: '',
  city: '',
  district: '',
  detail: ''
})
const errors = ref({
  addr1: { zip:'',city:'',district:'',detail:'' },
  addr2: { zip:'',city:'',district:'',detail:'' }
})
const cities = computed(() => Object.keys(taiwanAreas))
const getDistricts = (city) => {
  return taiwanAreas[city] || []
}
function onCityChange(target) {
  if (target === "addr1") addr1.value.district = ''
  if (target === "addr2") addr2.value.district = ''
}
function validateZip(target) {
  const value = target === "addr1" ? addr1.value.zip : addr2.value.zip
  const regex = /^\d{3}(-\d{2})?$/
  errors.value[target].zip = !value || !regex.test(value)
    ? "郵遞區號格式不正確"
    : ""
}
function validateDistrict(target) {
  const value = target === "addr1" ? addr1.value.district : addr2.value.district
  errors.value[target].district = !value ? "請選擇區域" : ""
}
function validateDetail(target) {
  const value = target === "addr1" ? addr1.value.detail : addr2.value.detail
  errors.value[target].detail = !value || value.length < 5
    ? "請輸入至少 5 個字以上的詳細地址"
    : ""
}
function resetAll() {
  addr1.value = { zip:'', city:'', district:'', detail:'' }
  addr2.value = { zip:'', city:'', district:'', detail:'' }
  errors.value = {
    addr1: { zip:'',city:'',district:'',detail:'' },
    addr2: { zip:'',city:'',district:'',detail:'' }
  }
}
function submit() {
  validateZip("addr1")
  validateZip("addr2")
  validateDistrict("addr1")
  validateDistrict("addr2")
  validateDetail("addr1")
  validateDetail("addr2")
  const allValid =
    Object.values(errors.value.addr1).every(v => !v) &&
    Object.values(errors.value.addr2).every(v => !v)
  if (!allValid){
    alert("每一欄位都要確實填寫")
    return
  }
    toast.success("收件地址已成功更新！")
  }
</script>
<style scoped>
.address{
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 2em;
}
.address h5{
    border-bottom: 1px solid var(--black);
}
button.plus{
    cursor: pointer;
    margin: 0 2em;
    padding: 1em 2.5em;
    color: var(--white);
    background-color: var(--mainColor);
    border: 0;
    border-radius: var(--radiusLarge);
    transition: var(--transitionNormal);
}
.address input{
    background-color: var(--backgroundColor);
    border: 0;
    border-bottom: 1px solid var(--black);
    padding: 0.5em 0.2em;
    line-height: 2em;
}
.address input,.address select:focus{
    outline: 0;
}
.address select{
    background-color: var(--backgroundColor);
    border:0;
    border-bottom: 1px solid var(--black);
    padding: 11.5px 0.2em;
    line-height: 2em;
}
.addressOne{
    display: flex;
    flex-flow: column nowrap;
    gap: 1em;
    width: 100%;
    max-width: 500px;
}
.set{
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
}
.addressTwo{
    display: flex;
    flex-flow: column nowrap;
    gap: 1em;
    width: 100%;
    max-width: 500px;
}
.addressButtons{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.addressButtons button{
    cursor: pointer;
    color: var(--black);
    background-color: var(--backgroundColor);
    border: 0;
    border-radius: var(--radiusLarge);
    padding: 1em 2.5em;
    transition: var(--transitionNormal);
}
.error{
  border-bottom: 1px solid var(--warningColor);
}
    @media(width>=768px){
        button.plus:hover{
            background-color: var(--black);
            color: var(--backgroundColor);
        }
        .addressButtons{
            width: auto;
            flex-flow: row nowrap;
        }
        .addressButtons button:hover{
            color: var(--white);
            background-color: var(--mainColor);
        }
    }
</style>