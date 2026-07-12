import { http, HttpResponse, delay } from 'msw'
import { generateProducts } from './data/products'
import type { Product } from '@/types'

// 這個專案沒有真實後端，用 MSW 在瀏覽器端攔截 fetch，
// 模擬一個會延遲、也可能失敗的 REST API，讓商品列表走真正的非同步資料流程。
let cachedProducts: Product[] | null = null

export const handlers = [
  http.get('*/api/products', async () => {
    await delay(400)
    if (!cachedProducts) {
      cachedProducts = generateProducts()
    }
    return HttpResponse.json(cachedProducts)
  }),
]
