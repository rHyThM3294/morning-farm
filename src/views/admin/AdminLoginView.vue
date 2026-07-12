<template>
  <div class="adminLogin">
    <div class="logo">
      <img :src="`${BASE}image/Logo.png`" alt="清晨農鋪 Logo">
    </div>
    <div class="container">
      <h4>後臺管理系統</h4>
      <div class="enterAccount">
        <label>Email：</label>
        <input type="email" v-model="email" />
      </div>
      <div class="enterPassword">
        <label>密碼：</label>
        <input type="password" v-model="password" />
      </div>
      <button type="button" class="login" :disabled="loading" @click="login">{{ loading ? '登入中...' : '登入' }}</button>
      <button type="button" class="backHome" @click="goHome">忘記密碼</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
const router     = useRouter()
const authStore  = useAuthStore()
const toastStore = useToastStore()
const BASE       = import.meta.env.BASE_URL
const email      = ref('')
const password   = ref('')
const loading    = ref(false)
const login = async () => {
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push('/admin/dashboard')
  } catch {
    toastStore.error('帳號或密碼錯誤')
  } finally {
    loading.value = false
  }
}
const goHome = () => {
  router.push({ name: 'home' })
}
</script>
<style scoped>
.adminLogin{
  background-color: var(--white);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}
.logo img{
  width: 290px;
  margin: 1em 0;
}
.container{
  max-width: 400px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 90%;
  position: relative;
  margin: 0 auto;
}
h4{
  text-align: center;
  font-size: 1.2em;
  color: var(--black);
  margin: 0;
}
.enterAccount,.enterPassword{
  display: flex;
  flex-flow: column nowrap;
}
label{
  width: 150px;
  text-align: left;
  font-size: 0.9em;
  color: var(--gray);
}
input{
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
  padding: 0.5em 2.5em;
  border-radius: var(--radiusLarge);
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: var(--transitionNormal);
}
.backHome{
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
    color: var(--warningColor);
  }
}
</style>
