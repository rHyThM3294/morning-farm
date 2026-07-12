import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '../notification'

describe('notification store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('unreadCount matches the number of unread notifications', () => {
    const store = useNotificationStore()
    const expected = store.notifications.filter(n => !n.read).length
    expect(store.unreadCount).toBe(expected)
  })

  it('markAsRead marks the matching notification read and decrements unreadCount', () => {
    const store = useNotificationStore()
    const target = store.notifications.find(n => !n.read)
    expect(target).toBeTruthy()
    const before = store.unreadCount
    store.markAsRead(target!.id)
    expect(target!.read).toBe(true)
    expect(store.unreadCount).toBe(before - 1)
  })

  it('markAsRead is a no-op for an unknown id', () => {
    const store = useNotificationStore()
    const before = store.unreadCount
    store.markAsRead(999999)
    expect(store.unreadCount).toBe(before)
  })

  it('markAllAsRead clears unreadCount to zero', () => {
    const store = useNotificationStore()
    store.markAllAsRead()
    expect(store.unreadCount).toBe(0)
    expect(store.notifications.every(n => n.read)).toBe(true)
  })
})
