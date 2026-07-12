import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '../product'
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
    imageUrl: 'chinese-pear.png',
    createdAt: new Date().toISOString(),
    stock: 10,
    sellerAvatarUrl: '/image/sandPear.png',
    farmerDescription: '',
    ...overrides,
  }
}

function mockFetchOnce(response: { ok: boolean; status?: number; data?: unknown }) {
  const fn = vi.fn().mockResolvedValue({
    ok: response.ok,
    status: response.status ?? 200,
    json: async () => response.data,
  } as unknown as Response)
  vi.stubGlobal('fetch', fn)
  return fn
}

describe('product store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetchProducts populates allProducts on success', async () => {
    const products = [makeProduct({ id: 'p1' }), makeProduct({ id: 'p2' })]
    mockFetchOnce({ ok: true, data: products })
    const store = useProductStore()
    await store.fetchProducts()
    expect(store.allProducts).toEqual(products)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetchProducts sets error and leaves allProducts empty on HTTP failure', async () => {
    mockFetchOnce({ ok: false, status: 500 })
    const store = useProductStore()
    await store.fetchProducts()
    expect(store.error).toBeTruthy()
    expect(store.allProducts).toEqual([])
    expect(store.isLoading).toBe(false)
  })

  it('fetchProducts dedupes concurrent calls into a single request', async () => {
    // Pinia 的 action 包裝會讓每次呼叫回傳新的 Promise 物件（供 devtools/$onAction 使用），
    // 所以這裡不比對 Promise 參照是否相同，而是直接驗證底層 fetch 只真正發送一次。
    const fn = mockFetchOnce({ ok: true, data: [makeProduct()] })
    const store = useProductStore()
    const p1 = store.fetchProducts()
    const p2 = store.fetchProducts()
    await Promise.all([p1, p2])
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('getProductsByCategory returns all products for "all", filters otherwise', () => {
    const store = useProductStore()
    store.allProducts = [
      makeProduct({ id: 'p1', category: 'season' }),
      makeProduct({ id: 'p2', category: 'festival' }),
    ]
    expect(store.getProductsByCategory('all')).toHaveLength(2)
    expect(store.getProductsByCategory('festival')).toEqual([store.allProducts[1]])
  })

  it('getProductsBySeries filters by series', () => {
    const store = useProductStore()
    store.allProducts = [
      makeProduct({ id: 'p1', series: 'pear' }),
      makeProduct({ id: 'p2', series: 'mango' }),
    ]
    expect(store.getProductsBySeries('pear')).toEqual([store.allProducts[0]])
  })

  it('getProductsBySeason returns the fixed 3-item list for each season', () => {
    const store = useProductStore()
    for (const season of ['spring', 'summer', 'autumn', 'winter'] as const) {
      expect(store.getProductsBySeason(season)).toHaveLength(3)
    }
  })
})
