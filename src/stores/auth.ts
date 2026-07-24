import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

// getSession() 在本機存有過期 session 時會嘗試連線 Supabase 換發 token，
// 若當下連不上網路，SDK 內部會重試多次才失敗，可能卡住頁面渲染長達數秒。
// 這裡加上逾時保護，確保不管網路狀況如何，都不會讓使用者等待過久。
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('auth init timeout')), ms)
    promise.then(
      (value) => { clearTimeout(timer); resolve(value) },
      (err) => { clearTimeout(timer); reject(err) }
    )
  })
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    initialized: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async init() {
      if (this.initialized) return
      try {
        const { data } = await withTimeout(supabase.auth.getSession(), 3000)
        this.user = data.session?.user ?? null
      } catch (e) {
        // Supabase 未設定、無法連線或逾時，視為未登入，讓路由守衛照常導向登入頁
        console.warn('[auth] 無法取得登入狀態', e)
        this.user = null
      } finally {
        this.initialized = true
      }
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null
      })
    },
    async login(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      this.user = data.user
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
})
