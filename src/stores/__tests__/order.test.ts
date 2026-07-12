import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOrderStore } from '../order'

describe('order store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('generates 50 orders on store creation', () => {
    const store = useOrderStore()
    expect(store.orders).toHaveLength(50)
  })

  it('cancelOrder returns false and leaves state untouched for an unknown orderId', () => {
    const store = useOrderStore()
    const result = store.cancelOrder('not-a-real-id')
    expect(result).toBe(false)
    expect(store.orders.some(o => o.status === 'cancelled' && o.orderId === 'not-a-real-id')).toBe(false)
  })

  it('cancelOrder sets the matching order status to cancelled and returns true', () => {
    const store = useOrderStore()
    const target = store.orders[0]
    const result = store.cancelOrder(target.orderId)
    expect(result).toBe(true)
    expect(target.status).toBe('cancelled')
  })

  it('finishReturn does nothing when the order has no returnInfo', () => {
    const store = useOrderStore()
    const target = store.orders.find(o => o.returnInfo === null)
    expect(target).toBeTruthy()
    expect(() => store.finishReturn(target!.orderId)).not.toThrow()
    expect(target!.returnInfo).toBeNull()
  })

  it('finishReturn marks a pending return as done and stamps finishedTime', () => {
    const store = useOrderStore()
    const target = store.orders.find(o => o.returnInfo !== null)
    expect(target).toBeTruthy()
    store.finishReturn(target!.orderId)
    expect(target!.returnInfo!.status).toBe('done')
    expect(target!.returnInfo!.finishedTime).toBeTruthy()
  })

  it('finishReturn does nothing for an unknown orderId', () => {
    const store = useOrderStore()
    expect(() => store.finishReturn('not-a-real-id')).not.toThrow()
  })

  it('searchOrders by orderId filters to orders whose id contains the keyword', () => {
    const store = useOrderStore()
    const target = store.orders[0]
    store.searchOrders({ type: 'orderId', keyword: target.orderId })
    expect(store.searchResult.length).toBeGreaterThan(0)
    expect(store.searchResult.every(o => o.orderId.includes(target.orderId))).toBe(true)
  })

  it('searchOrders by date range returns all orders when the range covers everything', () => {
    const store = useOrderStore()
    store.searchOrders({ type: 'date', start: '2000-01-01', end: '2999-12-31' })
    expect(store.searchResult).toHaveLength(store.orders.length)
  })

  it('searchOrders by date range returns nothing when the range is outside all order dates', () => {
    const store = useOrderStore()
    store.searchOrders({ type: 'date', start: '2000-01-01', end: '2000-01-02' })
    expect(store.searchResult).toHaveLength(0)
  })
})
