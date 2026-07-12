import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFinanceStore } from '../finance'

describe('finance store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('derives netIncome/totalIncome/refundAmount from the default donut', () => {
    const store = useFinanceStore()
    expect(store.totalIncome).toBe(63229)
    expect(store.refundAmount).toBe(3294)
    expect(store.netIncome).toBe(63229 - 3294)
  })

  it('stats appends a synthetic refund row (id 5) on top of statsBase', () => {
    const store = useFinanceStore()
    expect(store.stats).toHaveLength(5)
    expect(store.stats[4]).toMatchObject({ id: 5, type: 'refund', value: store.refundAmount })
  })

  it('setFinanceFromApi replaces donut and recalculates derived values', () => {
    const store = useFinanceStore()
    store.setFinanceFromApi({ donut: { net: 1000, fee: 100 } })
    expect(store.totalIncome).toBe(1000)
    expect(store.refundAmount).toBe(100)
    expect(store.netIncome).toBe(900)
  })

  it('setFinanceFromApi filters out any incoming id=5 row before storing stats', () => {
    const store = useFinanceStore()
    store.setFinanceFromApi({
      stats: [
        { id: 1, title: '假資料', value: 1, type: 'income' },
        { id: 5, title: '不該留下', value: 999, type: 'refund' },
      ],
    })
    expect(store.stats.filter(s => s.id === 1)).toHaveLength(1)
    expect(store.stats.filter(s => s.id === 5)).toHaveLength(1)
    expect(store.stats.find(s => s.id === 5)?.value).not.toBe(999)
  })

  it('setFinanceFromApi with an empty payload leaves state unchanged', () => {
    const store = useFinanceStore()
    const before = { total: store.totalIncome, refund: store.refundAmount, statsLen: store.stats.length }
    store.setFinanceFromApi({})
    expect(store.totalIncome).toBe(before.total)
    expect(store.refundAmount).toBe(before.refund)
    expect(store.stats).toHaveLength(before.statsLen)
  })
})
