import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAdminProductStore } from '../adminProduct'
import type { AdminProduct } from '@/types'

function makeAdminProduct(overrides: Partial<AdminProduct> = {}): AdminProduct {
  return {
    id: 9001,
    productTitle: '測試商品',
    productTag: '測試分類',
    subTag: '測試子分類',
    unit: '份',
    originalPrice: 100,
    price: 80,
    isOutOfStock: false,
    status: 'New',
    settings: [],
    imageList: [],
    description: '',
    farmerName: '測試小農',
    ...overrides,
  }
}

describe('adminProduct store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with the seeded demo products', () => {
    const store = useAdminProductStore()
    expect(store.products.length).toBeGreaterThan(0)
  })

  it('addProduct appends a new product', () => {
    const store = useAdminProductStore()
    const before = store.products.length
    store.addProduct(makeAdminProduct({ id: 9001 }))
    expect(store.products).toHaveLength(before + 1)
    expect(store.products[store.products.length - 1].id).toBe(9001)
  })

  it('updateProduct merges the given fields onto the matching product', () => {
    const store = useAdminProductStore()
    store.addProduct(makeAdminProduct({ id: 9001, price: 80 }))
    store.updateProduct(9001, { price: 60 })
    const updated = store.products.find(p => p.id === 9001)
    expect(updated?.price).toBe(60)
    expect(updated?.productTitle).toBe('測試商品')
  })

  it('updateProduct is a no-op for an unknown id', () => {
    const store = useAdminProductStore()
    const before = [...store.products]
    store.updateProduct(999999, { price: 1 })
    expect(store.products).toEqual(before)
  })

  it('deleteProduct removes the matching product', () => {
    const store = useAdminProductStore()
    store.addProduct(makeAdminProduct({ id: 9001 }))
    const before = store.products.length
    store.deleteProduct(9001)
    expect(store.products).toHaveLength(before - 1)
    expect(store.products.find(p => p.id === 9001)).toBeUndefined()
  })
})
