import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useToastStore } from '../toast'

describe('toast store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('show adds a toast with the given message and defaults to type info', () => {
    const store = useToastStore()
    store.show('hello')
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0]).toMatchObject({ message: 'hello', type: 'info' })
  })

  it('success/error/info set the corresponding toast type', () => {
    const store = useToastStore()
    store.success('ok')
    store.error('bad')
    store.info('fyi')
    expect(store.toasts.map(t => t.type)).toEqual(['success', 'error', 'info'])
  })

  it('remove deletes only the matching toast', () => {
    const store = useToastStore()
    store.show('a')
    store.show('b')
    const idToRemove = store.toasts[0].id
    store.remove(idToRemove)
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0].message).toBe('b')
  })

  it('auto-removes a toast after its duration elapses', () => {
    vi.useFakeTimers()
    const store = useToastStore()
    store.show('temp', 'info', 500)
    expect(store.toasts).toHaveLength(1)
    vi.advanceTimersByTime(500)
    expect(store.toasts).toHaveLength(0)
    vi.useRealTimers()
  })
})
