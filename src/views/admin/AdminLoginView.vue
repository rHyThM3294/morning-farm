<template>
  <div class="adminLogin">
    <div class="logo">
      <img src="/image/Logo.png" alt="清晨農鋪 Logo">
    </div>
    <div class="container">
      <h4>登入系統</h4>
      <div class="enterAccount">
        <label for="">帳號/代號：</label>
        <input type="number" placeholder="輸入帳號/代號" />
      </div>
      <div class="enterPassword">
        <label for="">密碼：</label>
        <input type="password" placeholder="密碼" />
      </div>
      <button type="button" class="forgotPassword" @click="goHome">忘記密碼?</button>
      <button type="button" class="login" @click="login">登入</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push('/admin/dashboard')
}
const handleKey = (e) => {
  if (e.key.toLowerCase() === 'l') {
    router.push('/')   
  }
}
const goHome = () => {
  router.push({ name: 'home' })
}
onMounted(() => {
  window.addEventListener('keydown', handleKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
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
.enterAccount,.enterPassword{
  display: flex;
  flex-flow: column nowrap;
}
label{
  width:150px;
  text-align: left;
}
input{
  width: 100%;
  padding: 0.5em;
  border: 0;
  border-bottom: 1px solid var(--black);
  border-radius: var(--radiusNormal);
  margin: 0.5em 0;
  background-color: var(--backgroundColor);
}
button{
  cursor: pointer;
  padding: 0.5em 1em;
  border-radius: 6px;
  border: none;
  transition: var(--transitionNormal);
}
.login{
  background: var(--backgroundColor);
  color: var(--mainColor);
  padding: 0.5em 4em;
  border-radius: var(--radiusLarge);
}
.forgotPassword{
  background: transparent;
  color:var(--gray);
  text-decoration: underline;
  font-size: 0.9em;
}
@media screen and (min-width:768px){
  .container{
    max-width: 600px;
  }
  .enterAccount,.enterPassword{
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  label{
    text-align: right;
  }
  .login:hover{
    color: var(--white);
    background-color: var(--mainColor);
  }
  .forgotPassword:hover{
    color: var(--warningColor);
  }
}
</style>
