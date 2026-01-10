<template>
  <div class="password">
    <h5>修改密碼</h5>
    <p>密碼長度最少6字元，必須要有大小寫英文與數字</p>
    <div class="editPassword">
      <div class="set">
        <label>舊密碼</label>
        <div class="inputPassword">
          <input 
            :type="show.old ? 'text' : 'password'" 
            v-model="oldPassword"
          >
          <i 
            class="fa-solid fa-eye" 
            v-if="!show.old"
            @click="toggleEye('old')"
          ></i>
          <i 
            class="fa-solid fa-eye-slash" 
            v-else
            @click="toggleEye('old')"
          ></i>
        </div>
      </div>
      <div class="set">
        <label>新密碼</label>
        <div class="inputPassword">
          <input 
            :type="show.new ? 'text' : 'password'" 
            v-model="newPassword"
          >
          <i 
            class="fa-solid fa-eye" 
            v-if="!show.new"
            @click="toggleEye('new')"
          ></i>
          <i 
            class="fa-solid fa-eye-slash" 
            v-else
            @click="toggleEye('new')"
          ></i>
        </div>
      </div>
      <div class="set">
        <label>再次輸入新密碼</label>
        <div class="inputPassword">
          <input 
            :type="show.confirm ? 'text' : 'password'" 
            v-model="confirmPassword"
          >
          <i 
            class="fa-solid fa-eye" 
            v-if="!show.confirm"
            @click="toggleEye('confirm')"
          ></i>
          <i 
            class="fa-solid fa-eye-slash" 
            v-else
            @click="toggleEye('confirm')"
          ></i>
        </div>
        <div class="passwordButtons">
          <button type="button" @click="resetAll">全部取消</button>
          <button type="button" @click="submit">確定修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useToastStore } from "@/stores/toast"
const toast = useToastStore()
const oldPassword = ref("")
const newPassword = ref("")
const confirmPassword = ref("")
const show = ref({
  old: false,
  new: false,
  confirm: false
})
function toggleEye(type){
  show.value[type] = !show.value[type]
}
function resetAll(){
  oldPassword.value = ""
  newPassword.value = ""
  confirmPassword.value = ""
}
function validatePassword(pwd){
  const hasUpper = /[A-Z]/.test(pwd)
  const hasLower = /[a-z]/.test(pwd)
  const hasNumber = /[0-9]/.test(pwd)
  return pwd.length >= 6 && hasUpper && hasLower && hasNumber
}
function submit(){
  if(!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    toast.error("請完整填寫所有欄位")
    return
  }
  if(oldPassword.value === newPassword.value){
    toast.error("新密碼不可與舊密碼相同")
    return
  }
  if(!validatePassword(newPassword.value)){
    toast.error("新密碼不符合規則：至少6字、需含大小寫與數字")
    return
  }
  if(newPassword.value !== confirmPassword.value){
    toast.error("兩次輸入的密碼不一致")
    return
  }
  toast.success("密碼修改成功")
  resetAll()
}
</script>
<style scoped>
    .password{
        display: flex;
        flex-flow: column nowrap;
        gap: 2em;
    }
    .password input{
        width: 250px;
        background-color: var(--backgroundColor);
        padding: 0.5em 0.2em;
        line-height: 2em;
        border: 0;
        border-bottom: 1px solid var(--black);
    }
    .password input:focus{
        outline: none;
    }
    .editPassword{
        display: flex;
        flex-flow: column nowrap;
        gap: 1em;
    }
    .set{
        position: relative;
    }
    .inputPassword{
        position: relative;
        display: flex;                
        align-items: center;   
        width: 250px; 
    }
    .inputPassword i{
        position: absolute;
        right: 0.8em;              
        cursor: pointer;
        transform: translateY(-50%);
        top: 50%;                   
        cursor: pointer;
    }
    .passwordButtons{
        margin: 2em 0 0 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 1.5em;
    }
    .passwordButtons button{
        cursor: pointer;
        width: 200px;
        padding: 1.5em 2.5em;
        border:0;
        border-radius: var(--radiusLarge);
        background-color: var(--backgroundColor);
        color: var(--black);
        transition: var(--transitionNormal);
    }
    @media (width >= 768px){
        .passwordButtons{
            flex-flow: row nowrap;
            justify-content: flex-start;
        }
        .passwordButtons button:hover{
            color: var(--backgroundColor);
            background-color: var(--mainColor);
        }
    }
</style>