<template>
  <div class="adminLogin">
    <div class="logo">
      <img :src="`${BASE}image/Logo.png`" alt="清晨農鋪 Logo">
    </div>
    <div class="container">
      <h4>後臺管理系統</h4>

      <!-- 求職展示提示 -->
      <div class="demo-notice">
        <span class="demo-icon">👋</span>
        <p>這是作品集展示用的後台系統</p>
        <p>無需帳號密碼，直接點擊下方｢登入｣按鈕即可進入，點擊｢忘記密碼｣可返回前臺</p>
      </div>

      <div class="enterAccount">
        <label>帳號/代號：</label>
        <input type="text" placeholder="（展示模式，可不填）" v-model="account" />
      </div>
      <div class="enterPassword">
        <label>密碼：</label>
        <input type="password" placeholder="（展示模式，可不填）" v-model="password" />
      </div>

      <button type="button" class="login" @click="login">登入</button>
      <button type="button" class="backHome" @click="goHome">忘記密碼</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router   = useRouter()
const BASE     = import.meta.env.BASE_URL
const account  = ref('')
const password = ref('')

// 求職展示模式：不驗證帳密，直接進入後台
const login = () => {
  sessionStorage.setItem('admin_logged_in', 'true')
  router.push('/admin/dashboard')
}
const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.adminLogin {
  background-color: var(--white);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}
.logo img {
  width: 290px;
  margin: 1em 0;
}
.container {
  max-width: 400px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 90%;
  position: relative;
  margin: 0 auto;
}
h4 {
  text-align: center;
  font-size: 1.2em;
  color: var(--black);
  margin: 0;
}

/* 求職展示提示框 */
.demo-notice {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 1px solid #86efac;
  border-radius: 10px;
  padding: 1em 1.2em;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}
.demo-notice .demo-icon {
  font-size: 1.5em;
  margin-bottom: 0.2em;
}
.demo-notice p {
  margin: 0;
  font-size: 0.85em;
  color: #166534;
  line-height: 1.6;
}

.enterAccount,
.enterPassword {
  display: flex;
  flex-flow: column nowrap;
}
label {
  width: 150px;
  text-align: left;
  font-size: 0.9em;
  color: var(--gray);
}
input {
  width: 100%;
  padding: 0.5em;
  border: 0;
  border-bottom: 1px solid #ddd;
  border-radius: var(--radiusNormal);
  margin: 0.5em 0;
  background-color: var(--backgroundColor);
  color: #999;
  font-size: 0.9em;
}
button {
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 6px;
  border: none;
  transition: var(--transitionNormal);
}
.login {
  background: var(--mainColor);
  color: var(--white);
  padding: 1em 2.5em;
  border-radius: var(--radiusLarge);
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: var(--transitionNormal);
}
.backHome {
  background: transparent;
  color: var(--gray);
  font-size: 0.88em;
  text-decoration: underline;
  padding: 0.3em 0;
}

@media(width > 768px){
  .container{
    max-width: 480px;
  }
  .enterAccount,.enterPassword{
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  label{
    text-align: right;
    flex-shrink: 0;
  }
  .login:hover{
    color: var(--mainColor);
    background-color: var(--backgroundColor);
  }
  .backHome:hover{
    color: var(--mainColor);
  }
}
</style>
