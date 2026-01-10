import { defineStore } from 'pinia'
export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),
  actions: {
    show(message, type = 'info', duration = 2000){
      const id = Date.now() + Math.random()
      this.toasts.push({ id, message, type })
      setTimeout(() => {
        this.remove(id)
      }, duration)
    },
    success(message, duration){
      this.show(message, 'success', duration)
    },
    error(message, duration){
      this.show(message, 'error', duration)
    },
    info(message, duration){
      this.show(message, 'info', duration)
    },
    remove(id){
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})