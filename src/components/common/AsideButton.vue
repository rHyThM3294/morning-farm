<template>
  <div class="aside">
    <button
      v-if="isAdminPage"
      ref="aiBtnRef"
      type="button"
      class="AIdate"
      @click="openAIdate"
    >
      <img src="/icon/dateAI.png" alt="AI行事曆">
    </button>
    <AIdate 
      :visible="showAIdate"
      :originRect="aiBtnRect"
      @close="showAIdate = false"
    />
    <button
      type="button"
      class="communication"
      ref="commBtnRef"
      @click="openComm"
    >
      <img src="/iconcommunication.png" alt="聊天嗎?">
    </button>
    <Communication
      :visible="showComm"
      :originRect="commBtnRect"
      @close="showComm = false"
    />
    <button
      type="button"
      class="goTop"
      @click="scrollToTop"
      v-show="showGoTop"
    >
      <img src="/icon/goTop.pang" alt="移動至最上方" />
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import AIdate from '@/components/adminBlock/AIdate.vue'
import Communication from '@/components/common/Communication.vue'
const aiBtnRef = ref(null)
const aiBtnRect = ref(null)
const commoBtnRef = ref(null)
const commoBtnRect = ref(null)
const route = useRoute()
const isAdminPage = computed(() => route.path.startsWith('/admin'))
const showAIdate = ref(false)
const showComm = ref(false)
gsap.registerPlugin(ScrollToPlugin)
const showGoTop = ref(false)
function openAIdate(){
  aiBtnRect.value = aiBtnRef.value.getBoundingClientRect()
  showAIdate.value = true
}
function closeAIdate(){
  showAIdate.value = false
}
function openComm(){
  commBtnRect.value = commoBtnRef.value.getBoundingClientRect()
  showComm.value = true
}
function scrollToTop(){
  gsap.to(window,{
    duration:1.2,
    scrollTo:{ y: 0 },
    ease:'power2.out'
  })
}
function handleScroll(){
  const scrollY = window.scrollY
  showGoTop.value = scrollY > 150
}
onMounted(() => {
  window.addEventListener('scroll',handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll',handleScroll)
})
watch(showGoTop,(visible) => {
  const button = document.querySelector('.goTop')
  if(!button)return
 if(visible){
    gsap.to(button, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }else{
    gsap.to(button, { autoAlpha: 0, y: 30, duration: 0.5, ease: 'power2.in' })
  }
})
</script>
<style scoped>
.aside{
  position: fixed;
  bottom: 5%;
  right: 5%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  z-index: 100;
}
.aside button{
  border: none;
  background-color: transparent;
  cursor: pointer;
  opacity: 1;
}
.goTop{
  display: none;
  opacity: 0;
  visibility: hidden;
}
@media(width > 768px){
  .goTop{display: block;}
}
</style>