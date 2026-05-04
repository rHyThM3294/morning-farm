import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style.css'

// ── 防止 input[type="number"] 在滾動頁面時意外改變數值 ──────────────────
// 瀏覽器預設：number input 獲得焦點後，滾輪會控制數值而非滾動頁面
// 解法：input 獲得焦點時主動把焦點交還給 body，讓滾輪回歸頁面控制
// 這是全域設定，一次解決整個專案所有數字輸入框
document.addEventListener('wheel', (e) => {
  if (document.activeElement?.type === 'number') {
    document.activeElement.blur()
  }
}, { passive: true })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')