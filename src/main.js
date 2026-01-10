import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { gsap } from 'gsap'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
export { gsap }