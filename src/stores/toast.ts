import { defineStore } from 'pinia'

interface Toast {
  id: number
  message: string
  type: 'info' | 'success' | 'error'
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[]
  }),
  actions: {
    show(message: string, type: Toast['type'] = 'info', duration = 2000){
      const id = Date.now() + Math.random()
      this.toasts.push({ id, message, type })
      setTimeout(() => {
        this.remove(id)
      }, duration)
    },
    success(message: string, duration?: number){
      this.show(message, 'success', duration)
    },
    error(message: string, duration?: number){
      this.show(message, 'error', duration)
    },
    info(message: string, duration?: number){
      this.show(message, 'info', duration)
    },
    remove(id: number){
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})
