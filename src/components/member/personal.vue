<template>
  <div class="personal">
    <h4>個人資料</h4>
    <div class="photoBox">
      <h5>大頭貼</h5>
      <div class="photoEdit">
        <div class="photo">
          <img src="/image/頭貼.png" alt="頭貼" />
        </div>
        <div class="photoButton">
          <button type="button" class="delete">刪除</button>
          <button type="button" class="edit">修改</button>
        </div>
      </div>
    </div>
    <div class="emailBox">
      <h5>電子信箱</h5>
      <input
        type="email"
        :value="email"
        placeholder="電子郵件等同於會員帳號"
        readonly
        class="readonly"
      />
      <p class="hint">如需更改Email，請聯絡客服。</p>
    </div>
    <div class="detailBox">
      <h5>會員詳細資料</h5>
      <label>姓名<span class="required">*</span></label>
      <input
        type="text"
        v-model.trim="form.name"
        placeholder="請輸入姓名"
        @blur="validateField('name')"
        :class="{ error: errors.name }"
      />
      <p v-if="errors.name" class="errorText">{{ errors.name }}</p>
      <label>生日<span class="required">*</span></label>
      <input
        type="date"
        v-model="form.birthday"
        @blur="validateField('birthday')"
        :class="{ error: errors.birthday }"
      />
      <p v-if="errors.birthday" class="errorText">{{ errors.birthday }}</p>
      <div class="set">
        <label>性別<span class="required">*</span></label>
        <label class="radioLabel">
          <input
            type="radio"
            value="male"
            v-model="form.gender"
            @change="validateField('gender')"
          />
          男
        </label>
        <label class="radioLabel">
          <input
            type="radio"
            value="female"
            v-model="form.gender"
            @change="validateField('gender')"
          />
          女
        </label>
      </div>
      <p v-if="errors.gender" class="errorText">{{ errors.gender }}</p>
      <label>聯絡地址<span class="required">*</span></label>
      <input
        type="text"
        v-model.trim="form.zipCode"
        placeholder="郵遞區號（例如：106 或 106-01）"
        @blur="validateField('zipCode')"
        :class="{ error: errors.zipCode }"
      />
      <p v-if="errors.zipCode" class="errorText">{{ errors.zipCode }}</p>
      <div class="set">
          <select
            v-model="form.city"
            @change="onCityChange"
            @blur="validateField('city')"
            :class="{ error: errors.city }"
          >
            <option value="" disabled>選擇縣市</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <p v-if="errors.city" class="errorText">{{ errors.city }}</p>
          <select
            v-model="form.district"
            @blur="validateField('district')"
            :disabled="!form.city"
            :class="{ error: errors.district }"
          >
            <option value="" disabled>選擇鄉或區</option>
            <option v-for="d in districts" :key="d" :value="d">
              {{ d }}
            </option>
          </select>
          <p v-if="errors.district" class="errorText">{{ errors.district }}</p>
      </div>
      <input
        type="text"
        v-model.trim="form.address"
        class="deaailAddress"
        placeholder="輸入詳細地址（例：○○路○段○號○樓）"
        @blur="validateField('address')"
        :class="{ error: errors.address }"
      />
      <p v-if="errors.address" class="errorText">{{ errors.address }}</p>
      <label>手機號碼<span class="required">*</span></label>
      <input
        type="text"
        v-model.trim="form.phone"
        placeholder="請輸入手機號碼（例：0912345678）"
        @blur="validateField('phone')"
        :class="{ error: errors.phone }"
      />
      <p v-if="errors.phone" class="errorText">{{ errors.phone }}</p>
    </div>
    <div class="invoice">
      <h5>發票</h5>
      <p v-if="errors.invoiceType" class="errorText">{{ errors.invoiceType }}</p>
      <div class="set">
        <label class="radioLabel">
          <input
            type="radio"
            value="donate"
            v-model="form.invoiceType"
            @change="validateField('invoiceType')"
          />
          捐贈發票
        </label>
        <select
          name="mechanism"
          v-model="form.donateOrg"
          :disabled="form.invoiceType !== 'donate'"
          @blur="form.invoiceType === 'donate' && validateField('donateOrg')"
          :class="{ error: errors.donateOrg && form.invoiceType === 'donate' }"
        >
          <option value="" disabled>選擇捐贈機構</option>
          <option v-for="org in donateOrgs" :key="org" :value="org">
            {{ org }}
          </option>
        </select>
      </div>
      <p v-if="errors.donateOrg && form.invoiceType === 'donate'" class="errorText">
        {{ errors.donateOrg }}
      </p>
      <div class="set">
        <label class="radioLabel">
          <input
            type="radio"
            value="paper"
            v-model="form.invoiceType"
            @change="validateField('invoiceType')"
          />
          索取紙本發票
        </label>
      </div>
      <div class="set">
        <label class="radioLabel">
          <input
            type="radio"
            value="taxId"
            v-model="form.invoiceType"
            @change="validateField('invoiceType')"
          />
          統一編號
        </label>
        <input
          type="text"
          v-model.trim="form.taxId"
          placeholder="輸入統一編號（8個數字）"
          :disabled="form.invoiceType !== 'taxId'"
          @blur="form.invoiceType === 'taxId' && validateField('taxId')"
          :class="{ error: errors.taxId && form.invoiceType === 'taxId' }"
        />
      </div>
      <p v-if="errors.taxId && form.invoiceType === 'taxId'" class="errorText">
        {{ errors.taxId }}
      </p>
      <div class="set">
        <label class="radioLabel">
          <input
            type="radio"
            value="mobile"
            v-model="form.invoiceType"
            @change="validateField('invoiceType')"
          />
          手機載具
        </label>
        <input
          type="text"
          v-model.trim="form.mobileBarcode"
          placeholder="輸入載具（例：/AB12345）"
          :disabled="form.invoiceType !== 'mobile'"
          @blur="form.invoiceType === 'mobile' && validateField('mobileBarcode')"
          :class="{
            error: errors.mobileBarcode && form.invoiceType === 'mobile'
          }"
        />
      </div>
      <p v-if="errors.mobileBarcode && form.invoiceType === 'mobile'" class="errorText">
        {{ errors.mobileBarcode }}
      </p>
    </div>
    <div class="personalButtons">
      <button type="button" @click="resetForm">全部取消</button>
      <button type="button" @click="handleSubmit">確定修改</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
const props = defineProps({
  email: {
    type: String,
    default: ''
  }
})
const form = ref({
  name: '',
  birthday: '',
  gender: '',
  zipCode: '',
  city: '',
  district: '',
  address: '',
  phone: '',
  invoiceType: '',
  donateOrg: '',
  taxId: '',
  mobileBarcode: ''
})
const errors = ref({
  name: '',
  birthday: '',
  gender: '',
  zipCode: '',
  city: '',
  district: '',
  address: '',
  phone: '',
  invoiceType: '',
  donateOrg: '',
  taxId: '',
  mobileBarcode: ''
})
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
const donateOrgs = [
  '慈濟基金會',
  '家扶基金會',
  '勵馨基金會',
  '伊甸社會福利基金會',
  '台灣世界展望會',
  '創世社會福利基金會',
  '唐氏症基金會',
  '中華社會福利聯合勸募協會',
  '紅十字會',
  '陽光社會福利基金會'
]
const cities = computed(() => Object.keys(taiwanAreas))
const districts = computed(() => {
  return taiwanAreas[form.value.city] || []
})
const onCityChange = () => {
  form.value.district = ''
  validateField('city')
}
const validateField = (field) => {
  const value = form.value[field]
  errors.value[field] = ''
  switch (field) {
    case 'name':
      if (!value || !value.trim()) {
        errors.value.name = '請輸入姓名'
      }
      break
    case 'birthday':
      if (!value) {
        errors.value.birthday = '請選擇生日'
      }
      break
    case 'gender':
      if (!value) {
        errors.value.gender = '請選擇性別'
      }
      break
    case 'zipCode': {
      const zipRegex = /^\d{3}(-\d{2})?$/
      if (!value) {
        errors.value.zipCode = '請輸入郵遞區號'
      } else if (!zipRegex.test(value)) {
        errors.value.zipCode = '郵遞區號格式不正確，例：106 或 106-01'
      }
      break
    }
    case 'city':
      if (!value) {
        errors.value.city = '請選擇縣市'
      }
      break
    case 'district':
      if (!value) {
        errors.value.district = '請選擇鄉鎮市區'
      }
      break
    case 'address': {
      if (!value || value.trim().length < 6) {
        errors.value.address = '請輸入較完整的詳細地址'
      }
      break
    }
    case 'phone': {
      const phoneRegex = /^09\d{8}$/
      if (!value) {
        errors.value.phone = '請輸入手機號碼'
      } else if (!phoneRegex.test(value)) {
        errors.value.phone = '手機號碼格式不正確，例：0912345678'
      }
      break
    }
    case 'invoiceType':
      if (!value) {
        errors.value.invoiceType = '請選擇一種發票方式'
      }
      break
    case 'donateOrg':
      if (form.value.invoiceType === 'donate' && !value) {
        errors.value.donateOrg = '請選擇捐贈機構'
      }
      break
    case 'taxId': {
      const taxRegex = /^\d{8}$/
      if (form.value.invoiceType === 'taxId') {
        if (!value) {
          errors.value.taxId = '請輸入統一編號'
        } else if (!taxRegex.test(value)) {
          errors.value.taxId = '統一編號須為 8 碼數字'
        }
      }
      break
    }
    case 'mobileBarcode': {
      const mobileRegex = /^\/[0-9A-Z.+-]{7}$/
      if (form.value.invoiceType === 'mobile') {
        if (!value) {
          errors.value.mobileBarcode = '請輸入手機載具'
        } else if (!mobileRegex.test(value.toUpperCase())) {
          errors.value.mobileBarcode = '載具格式不正確，例：/AB12345'
        }
      }
      break
    }
  }
}
const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    validateField(key)
  })
  return Object.values(errors.value).every((v) => !v)
}
const resetForm = () => {
  form.value = {
    name: '',
    birthday: '',
    gender: '',
    zipCode: '',
    city: '',
    district: '',
    address: '',
    phone: '',
    invoiceType: '',
    donateOrg: '',
    taxId: '',
    mobileBarcode: ''
  }
  Object.keys(errors.value).forEach((k) => (errors.value[k] = ''))
}
const handleSubmit = () => {
  if (!validateForm()) {
    alert('請先修正紅框與錯誤訊息後再送出')
    return
  }
  console.log('表單資料：', { email: props.email, ...form.value })
  alert('資料已通過前端驗證（純前端示範）')
}
const email = computed(() => props.email)
watch(
  () => form.value.invoiceType,
  (type) => {
    if (type !== 'donate') form.value.donateOrg = ''
    if (type !== 'taxId') form.value.taxId = ''
    if (type !== 'mobile') form.value.mobileBarcode = ''
    errors.value.donateOrg = ''
    errors.value.taxId = ''
    errors.value.mobileBarcode = ''
  }
)
</script>
<style scoped>
.personal{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 2.5em;
}
.personal h4{
  width: 100%;
  border-bottom: 1px solid var(--black);
}

.photoBox{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1em;
}
.photoEdit{
  display: flex;
  gap: 1em;
}
.photoEdit .photo{
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
}
.photoEdit .photo img{
  width: 84px;
  height: 84px;
  border-radius: 50%;
}
.photoButton{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0;
  margin: 0;
}
.photoButton button{
  cursor: pointer;
  color: var(--black);
  background-color: var(--backgroundColor);
  margin: 0;
  padding: 0.8em 4em;
  border: 0;
  border-radius: var(--radiusLarge);
  transition: var(--transitionNormal);
}
.emailBox{
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5em;
}
.emailBox input{
  background-color: var(--gray);
  padding: 0.5em 0.2em;
  line-height: 2em;
  border: 0;
  border-bottom: 1px solid var(--black);
}
.emailBox .hint{
  font-size: 0.85rem;
  color: var(--textLight, #666);
}
.detailBox{
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5em;
  max-width: 500px;
}
.detailBox input,.detailBox select{
  background-color: var(--backgroundColor);
  padding: 0.5em 0.2em;
  line-height: 2em;
  border: 0;
  border-bottom: 1px solid var(--black);
}

input:focus,select:focus{
  outline: none;
}
.invoice{
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5em;
}
.invoice select{
    padding: 0.5em 0.2em;
    background-color: var(--backgroundColor);
    color: var(--black);
    line-height: 2em;
}
.set{
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  align-items: center;
}
.set input{
    background-color: var(--backgroundColor);
    border: 0;
    border-bottom: 1px solid var(--black);
    padding: 0.5em 0.2em;
    line-height: 2em;
}
.radioLabel{
  display: flex;
  align-items: center;
  gap: 0.25em;
}
.required{
  color:var(--warningColor);
  margin-left: 0.25em;
}
.error{
  border-bottom: 1px solid var(--warningColor);
}
.errorText{
  color:var(--warningColor);
  font-size: 0.8rem;
}
.readonly{
  background-color: var(--gray);
}
.personalButtons{
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1em;
}
.personalButtons button{
  cursor: pointer;
  color: var(--black);
  background-color: var(--backgroundColor);
  border: 0;
  padding: 1em 5em;
  border-radius: var(--radiusLarge);
  transition: var(--transitionNormal);
}

@media (width >= 768px){
  .personal{
    max-width: 1000px;
  }
  .photoButton{
    flex-flow: row nowrap;
  }
  .photoButton button:hover{
    background-color: var(--mainColor);
    color: var(--white);
  }
  .emailBox input{
    max-width: 500px;
  }
  .personalButtons{
    flex-flow: row nowrap;
    justify-content: flex-start;
    gap: 2em;
  }
  .personalButtons button:hover{
    background-color: var(--mainColor);
    color: var(--white);
  }
}
</style>
