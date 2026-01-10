import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useTaskStore = defineStore('task', () => {
  const tasks = ref({
    '2026-01-01': ['新年快樂', '冷藏包裝', '回覆客戶詢問'],
    '2026-01-05': ['寄送訂單', '補貨盤點'],
    '2026-01-06': ['農產品上架', '更新價格'],
    '2026-01-10': ['準備新年促銷'],
    '2026-01-15': ['處理退貨', '聯絡物流'],
    '2026-01-27': ['盤點庫存', '整理報表'],
    '2026-01-31': ['新年促銷活動', '補貨安排'],
    '2026-02-12': ['物流出貨截止'],
    '2026-02-15': ['回訪老客戶', '農場例行檢查'],
    '2026-02-16': ['除夕'],
    '2026-02-17': ['過年開始'],
    '2026-02-23': ['開工'],
  })
  function getTasksByDate(dateKey){
    return tasks.value[dateKey] || []
  }
  return { tasks, getTasksByDate }
})
