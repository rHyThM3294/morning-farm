import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

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
        const { data } = await supabase.auth.getSession()
        this.user = data.session?.user ?? null
        supabase.auth.onAuthStateChange((_event, session) => {
          this.user = session?.user ?? null
        })
      } catch (e) {
        // Supabase 未設定或無法連線時，視為未登入，讓路由守衛照常導向登入頁
        console.warn('[auth] 無法取得登入狀態', e)
        this.user = null
      } finally {
        this.initialized = true
      }
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
