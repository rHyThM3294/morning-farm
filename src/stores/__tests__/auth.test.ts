import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}))

import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '../auth'

const mockUser = { id: 'u1', email: 'test@example.com' } as any

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('init restores the user from an existing session', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: { user: mockUser } } } as any)
    const store = useAuthStore()
    await store.init()
    expect(store.user).toEqual(mockUser)
    expect(store.isLoggedIn).toBe(true)
    expect(store.initialized).toBe(true)
  })

  it('init only checks the session once even if called multiple times', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: null } } as any)
    const store = useAuthStore()
    await store.init()
    await store.init()
    expect(supabase.auth.getSession).toHaveBeenCalledTimes(1)
  })

  it('init treats a failed session lookup as logged out instead of throwing', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValue(new Error('network down'))
    const store = useAuthStore()
    await store.init()
    expect(store.user).toBeNull()
    expect(store.isLoggedIn).toBe(false)
    expect(store.initialized).toBe(true)
  })

  it('login sets the user on success', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({ data: { user: mockUser }, error: null } as any)
    const store = useAuthStore()
    await store.login('test@example.com', 'password')
    expect(store.user).toEqual(mockUser)
  })

  it('login throws and leaves the user unset on failure', async () => {
    const authError = new Error('invalid credentials')
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({ data: { user: null }, error: authError } as any)
    const store = useAuthStore()
    await expect(store.login('test@example.com', 'wrong')).rejects.toThrow('invalid credentials')
    expect(store.user).toBeNull()
  })

  it('logout clears the user', async () => {
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null } as any)
    const store = useAuthStore()
    store.user = mockUser
    await store.logout()
    expect(store.user).toBeNull()
  })
})
