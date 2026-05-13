<template>
  <div class="credit">
    <h4>信用卡管理</h4>

    <!-- 已儲存的卡片列表 -->
    <div class="cardList">
      <h5>已綁定的卡片</h5>
      <div v-if="savedCards.length === 0" class="emptyHint">
        <i class="fa-regular fa-credit-card"></i>
        <p>尚未綁定任何信用卡</p>
      </div>
      <div
        v-for="card in savedCards"
        :key="card.id"
        class="cardItem"
        :class="{ selected: card.id === defaultCardId }"
        @click="setDefault(card.id)"
      >
        <div class="cardLeft">
          <div class="cardChip">
            <i class="fa-solid fa-microchip"></i>
          </div>
          <div class="cardInfo">
            <p class="cardNetwork">{{ card.network }}</p>
            <p class="cardNumber">•••• •••• •••• {{ card.last4 }}</p>
            <p class="cardHolder">{{ card.holder }}</p>
            <p class="cardExpiry">有效期限 {{ card.expiry }}</p>
          </div>
        </div>
        <div class="cardRight">
          <span v-if="card.id === defaultCardId" class="defaultBadge">預設</span>
          <button
            type="button"
            class="deleteCardBtn"
            @click.stop="removeCard(card.id)"
            title="刪除"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 新增卡片表單 -->
    <div class="addCardSection">
      <h5>新增信用卡</h5>

      <div class="formGroup">
        <label>持卡人姓名<span class="required">*</span></label>
        <input
          type="text"
          v-model.trim="form.holder"
          placeholder="請輸入與信用卡上相同的姓名"
          @blur="validate('holder')"
          :class="{ error: errors.holder }"
        />
        <p v-if="errors.holder" class="errorText">{{ errors.holder }}</p>
      </div>

      <div class="formGroup">
        <label>卡號<span class="required">*</span></label>
        <div class="cardNumberInput">
          <input
            v-for="(seg, i) in form.segments"
            :key="i"
            type="text"
            inputmode="numeric"
            maxlength="4"
            :ref="el => segRefs[i] = el"
            v-model="form.segments[i]"
            placeholder="····"
            @input="onSegInput(i)"
            @keydown.backspace="onSegBackspace(i, $event)"
            :class="{ error: errors.cardNumber }"
          />
        </div>
        <p v-if="errors.cardNumber" class="errorText">{{ errors.cardNumber }}</p>
      </div>

      <div class="formRow">
        <div class="formGroup">
          <label>有效期限<span class="required">*</span></label>
          <input
            type="text"
            v-model="form.expiry"
            placeholder="MM / YY"
            maxlength="7"
            @input="onExpiryInput"
            @blur="validate('expiry')"
            :class="{ error: errors.expiry }"
          />
          <p v-if="errors.expiry" class="errorText">{{ errors.expiry }}</p>
        </div>

        <div class="formGroup">
          <label>
            安全碼（CVV）<span class="required">*</span>
            <span class="cvvHint" title="卡片背面後三碼">
              <i class="fa-solid fa-circle-question"></i>
            </span>
          </label>
          <input
            type="password"
            v-model.trim="form.cvv"
            placeholder="···"
            maxlength="4"
            inputmode="numeric"
            @blur="validate('cvv')"
            :class="{ error: errors.cvv }"
          />
          <p v-if="errors.cvv" class="errorText">{{ errors.cvv }}</p>
        </div>
      </div>

      <!-- 卡別偵測 badges -->
      <div class="networkRow">
        <span
          v-for="n in networks"
          :key="n.key"
          class="networkBadge"
          :class="{ active: detectedNetwork === n.key }"
        >{{ n.label }}</span>
      </div>

      <!-- 設為預設 -->
      <label class="checkboxLabel">
        <input type="checkbox" v-model="form.setAsDefault" />
        設為預設付款卡
      </label>

      <!-- 安全提示 -->
      <div class="secureHint">
        <i class="fa-solid fa-lock"></i>
        <p>您的卡片資訊受到 SSL 加密保護，清晨農鋪不會儲存您的完整卡號。</p>
      </div>

      <div class="creditButtons">
        <button type="button" @click="resetForm">全部取消</button>
        <button type="button" class="submitBtn" @click="handleSubmit">新增卡片</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

// ── 已儲存的卡片 ──────────────────────────────
const savedCards = ref([
  {
    id: 1,
    network: 'Visa',
    last4: '8812',
    holder: '王小明',
    expiry: '08 / 27'
  }
])
const defaultCardId = ref(1)

function setDefault(id) {
  defaultCardId.value = id
  toast.success('已設定為預設付款卡')
}

function removeCard(id) {
  savedCards.value = savedCards.value.filter(c => c.id !== id)
  if (defaultCardId.value === id) {
    defaultCardId.value = savedCards.value[0]?.id ?? null
  }
  toast.info('已刪除該張卡片')
}

// ── 卡號分段輸入 ──────────────────────────────
const segRefs = ref([])

const form = ref({
  holder: '',
  segments: ['', '', '', ''],
  expiry: '',
  cvv: '',
  setAsDefault: false
})

const errors = ref({
  holder: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

function onSegInput(i) {
  form.value.segments[i] = form.value.segments[i].replace(/\D/g, '')
  if (form.value.segments[i].length === 4 && i < 3) {
    segRefs.value[i + 1]?.focus()
  }
  errors.value.cardNumber = ''
}

function onSegBackspace(i, e) {
  if (form.value.segments[i] === '' && i > 0) {
    segRefs.value[i - 1]?.focus()
  }
}

function onExpiryInput() {
  let raw = form.value.expiry.replace(/\D/g, '')
  if (raw.length > 4) raw = raw.slice(0, 4)
  if (raw.length >= 3) {
    form.value.expiry = raw.slice(0, 2) + ' / ' + raw.slice(2)
  } else if (raw.length === 2) {
    form.value.expiry = raw + ' / '
  } else {
    form.value.expiry = raw
  }
  errors.value.expiry = ''
}

// ── 卡別偵測 ──────────────────────────────────
const networks = [
  { key: 'visa',       label: 'Visa' },
  { key: 'mastercard', label: 'Mastercard' },
  { key: 'jcb',        label: 'JCB' },
  { key: 'amex',       label: 'Amex' }
]

const detectedNetwork = computed(() => {
  const first = form.value.segments[0]
  if (!first) return ''
  if (/^4/.test(first)) return 'visa'
  if (/^5[1-5]/.test(first) || /^2[2-7]/.test(first)) return 'mastercard'
  if (/^35/.test(first)) return 'jcb'
  if (/^3[47]/.test(first)) return 'amex'
  return ''
})

// ── 驗證 ──────────────────────────────────────
function validate(field) {
  errors.value[field] = ''
  switch (field) {
    case 'holder':
      if (!form.value.holder) errors.value.holder = '請輸入持卡人姓名'
      break
    case 'cardNumber': {
      const full = form.value.segments.join('')
      if (full.length !== 16) errors.value.cardNumber = '請完整輸入 16 位卡號'
      break
    }
    case 'expiry': {
      const raw = form.value.expiry.replace(/\s/g, '').replace('/', '')
      if (!/^\d{4}$/.test(raw)) {
        errors.value.expiry = '格式不正確，例：08 / 27'
        break
      }
      const mm = parseInt(raw.slice(0, 2))
      const yy = parseInt(raw.slice(2))
      const now = new Date()
      const nowYY = now.getFullYear() % 100
      const nowMM = now.getMonth() + 1
      if (mm < 1 || mm > 12) { errors.value.expiry = '月份不正確'; break }
      if (yy < nowYY || (yy === nowYY && mm < nowMM)) errors.value.expiry = '卡片已過期'
      break
    }
    case 'cvv':
      if (!/^\d{3,4}$/.test(form.value.cvv)) errors.value.cvv = '安全碼為 3-4 位數字'
      break
  }
}

function validateAll() {
  validate('holder')
  validate('cardNumber')
  validate('expiry')
  validate('cvv')
  return Object.values(errors.value).every(v => !v)
}

function resetForm() {
  form.value = { holder: '', segments: ['', '', '', ''], expiry: '', cvv: '', setAsDefault: false }
  Object.keys(errors.value).forEach(k => errors.value[k] = '')
}

function handleSubmit() {
  if (!validateAll()) {
    toast.error('請先修正錯誤後再新增')
    return
  }
  const last4 = form.value.segments[3]
  const newCard = {
    id: Date.now(),
    network: networks.find(n => n.key === detectedNetwork.value)?.label || '信用卡',
    last4,
    holder: form.value.holder,
    expiry: form.value.expiry
  }
  savedCards.value.push(newCard)
  if (form.value.setAsDefault) defaultCardId.value = newCard.id
  toast.success('已成功新增信用卡！')
  resetForm()
}
</script>

<style scoped>
.credit {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 2.5em;
}
.credit h4 {
  width: 100%;
  border-bottom: 1px solid var(--black);
  padding-bottom: 0.3em;
}
.cardList {
  display: flex;
  flex-flow: column nowrap;
  gap: 1em;
}
.cardList h5 {
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 0.2em;
}
.emptyHint {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 0.6em;
  padding: 2em;
  color: var(--gray);
  background-color: var(--backgroundColor);
  border-radius: var(--radiusNormal);
}
.emptyHint i {
  font-size: 2em;
}
.cardItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--backgroundColor);
  border-radius: var(--radiusNormal);
  padding: 1em 1.2em;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transitionNormal);
}
.cardItem.selected {
  border-color: var(--mainColor);
  background-color: #fdf3db;
}
.cardLeft {
  display: flex;
  align-items: center;
  gap: 1em;
}
.cardChip {
  font-size: 1.6em;
  color: var(--mainColor);
}
.cardInfo {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.2em;
}
.cardNetwork {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: var(--firstColor);
}
.cardNumber {
  font-size: 1rem;
  letter-spacing: 0.1em;
}
.cardHolder,
.cardExpiry {
  font-size: 0.8rem;
  color: #666;
}
.cardRight {
  display: flex;
  align-items: center;
  gap: 0.8em;
}
.defaultBadge {
  background-color: var(--mainColor);
  color: var(--white);
  font-size: 0.75rem;
  padding: 0.25em 0.7em;
  border-radius: var(--radiusLarge);
  font-weight: 600;
}
.deleteCardBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray);
  font-size: 1em;
  padding: 0.3em;
  transition: var(--transitionNormal);
}
.addCardSection {
  display: flex;
  flex-flow: column nowrap;
  gap: 1.2em;
  max-width: 520px;
}
.addCardSection h5 {
  font-size: 1em;
  font-weight: 600;
  border-bottom: 1px solid var(--gray);
  padding-bottom: 0.4em;
}
.formGroup {
  display: flex;
  flex-flow: column nowrap;
  gap: 0.4em;
}
.formGroup label {
  font-size: 0.9rem;
  font-weight: 500;
}
.formGroup input {
  background-color: var(--backgroundColor);
  border: 0;
  border-bottom: 1px solid var(--black);
  padding: 0.5em 0.3em;
  line-height: 2em;
  font-size: 1rem;
  transition: var(--transitionNormal);
}
.formGroup input:focus {
  outline: none;
  border-bottom-color: var(--mainColor);
}
.formGroup input.error {
  border-bottom-color: var(--warningColor);
}
.cardNumberInput {
  display: flex;
  gap: 0.5em;
}
.cardNumberInput input {
  flex: 1;
  text-align: center;
  letter-spacing: 0.15em;
  font-size: 1.1rem;
  min-width: 0;
}
.formRow {
  display: flex;
  gap: 1.5em;
  flex-wrap: wrap;
}
.formRow .formGroup {
  flex: 1;
  min-width: 140px;
}
.cvvHint {
  color: var(--gray);
  cursor: help;
  margin-left: 0.3em;
  font-size: 0.85em;
}
.networkRow {
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
}
.networkBadge {
  padding: 0.25em 0.8em;
  border-radius: var(--radiusLarge);
  font-size: 0.78rem;
  font-weight: 600;
  background-color: var(--gray);
  color: var(--white);
  transition: var(--transitionNormal);
}
.networkBadge.active {
  background-color: var(--mainColor);
  color: var(--black);
}
.checkboxLabel {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
}
.checkboxLabel input[type='checkbox'] {
  accent-color: var(--mainColor);
  width: 1em;
  height: 1em;
  cursor: pointer;
}
.secureHint {
  display: flex;
  align-items: flex-start;
  gap: 0.5em;
  background-color: var(--backgroundColor);
  border-radius: var(--radiusNormal);
  padding: 0.8em 1em;
}
.secureHint i {
  color: var(--addColor);
  margin-top: 0.15em;
  flex-shrink: 0;
}
.secureHint p {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
}
.creditButtons {
  display: flex;
  flex-flow: column nowrap;
  gap: 1em;
  align-items: center;
}
.creditButtons button {
  cursor: pointer;
  color: var(--black);
  background-color: var(--backgroundColor);
  border: 0;
  padding: 1em 3.5em;
  border-radius: var(--radiusLarge);
  transition: var(--transitionNormal);
  font-size: 1rem;
}
.creditButtons .submitBtn {
  background-color: var(--mainColor);
  color: var(--black);
  font-weight: 600;
}
.required {
  color: var(--warningColor);
  margin-left: 0.25em;
}
.errorText {
  color: var(--warningColor);
  font-size: 0.8rem;
}
@media (width >= 768px) {
  .cardItem:hover {
    border-color: var(--mainColor);
  }
  .deleteCardBtn:hover {
    color: var(--warningColor);
  }
  .creditButtons {
    flex-flow: row nowrap;
    justify-content: flex-start;
    gap: 1.5em;
  }
  .creditButtons button:hover {
    background-color: var(--mainColor);
    color: var(--white);
  }
  .creditButtons .submitBtn:hover {
    background-color: var(--black);
    color: var(--white);
  }
}
</style>