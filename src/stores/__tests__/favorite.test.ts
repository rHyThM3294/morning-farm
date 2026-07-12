import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoriteStore } from '../favorite'
import type { Product } from '@/types'

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    productTitle: '寶島甘露梨',
    category: 'season',
    series: null,
    status: 'New',
    sellerName: '王大哥',
    unit: '1 份',
    price: 100,
    imageUrl: 'chinese-pear.webp',
    createdAt: new Date().toISOString(),
    stock: 10,
    sellerAvatarUrl: '/image/sandPear.webp',
    farmerDescription: '',
    ...overrides,
  }
}

describe('favorite store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('toggle adds a product and returns true when not yet favorited', () => {
    const store = useFavoriteStore()
    const result = store.toggle(makeProduct({ id: 'p1' }))
    expect(result).toBe(true)
    expect(store.items).toHaveLength(1)
  })

  it('toggle removes the product and returns false when already favorited', () => {
    const store = useFavoriteStore()
    store.toggle(makeProduct({ id: 'p1' }))
    const result = store.toggle(makeProduct({ id: 'p1' }))
    expect(result).toBe(false)
    expect(store.items).toHaveLength(0)
  })

  it('isFavorited reflects current state', () => {
    const store = useFavoriteStore()
    expect(store.isFavorited('p1')).toBe(false)
    store.toggle(makeProduct({ id: 'p1' }))
    expect(store.isFavorited('p1')).toBe(true)
  })

  it('persists items to localStorage on change', async () => {
    const store = useFavoriteStore()
    store.toggle(makeProduct({ id: 'p1' }))
    await new Promise((resolve) => setTimeout(resolve, 0))
    const saved = JSON.parse(localStorage.getItem('morning_farm_favorites') ?? '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe('p1')
  })

  it('restores items from localStorage on store creation', () => {
    localStorage.setItem('morning_farm_favorites', JSON.stringify([makeProduct({ id: 'p1' })]))
    const store = useFavoriteStore()
    expect(store.items).toHaveLength(1)
    expect(store.isFavorited('p1')).toBe(true)
  })
})
