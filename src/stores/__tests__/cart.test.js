import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'

function makeProduct(overrides = {}) {
  return {
    id: 'p1',
    productTitle: '寶島甘露梨',
    price: 100,
    stock: 5,
    ...overrides,
  }
}

describe('cart store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('adds a new product with default quantity 1', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(1)
    expect(cart.totalCount).toBe(1)
    expect(cart.itemTypesCount).toBe(1)
  })

  it('increments quantity when adding an existing product again', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    cart.addItem(makeProduct({ quantity: 2 }))
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(3)
  })

  it('caps quantity at the product stock when adding', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ stock: 5, quantity: 3 }))
    cart.addItem(makeProduct({ stock: 5, quantity: 10 }))
    expect(cart.items[0].quantity).toBe(5)
  })

  it('removes an item by id', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 'p1' }))
    cart.addItem(makeProduct({ id: 'p2' }))
    cart.removeItem('p1')
    expect(cart.items.map(i => i.id)).toEqual(['p2'])
  })

  it('updateQuantity removes the item when quantity drops to 0 or below', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    cart.updateQuantity('p1', 0)
    expect(cart.items).toHaveLength(0)
  })

  it('updateQuantity caps at stock', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ stock: 5 }))
    cart.updateQuantity('p1', 99)
    expect(cart.items[0].quantity).toBe(5)
  })

  it('updateQuantity does nothing for an id not in the cart', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    cart.updateQuantity('missing', 2)
    expect(cart.items[0].quantity).toBe(1)
  })

  it('clearCart empties the cart', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 'p1' }))
    cart.addItem(makeProduct({ id: 'p2' }))
    cart.clearCart()
    expect(cart.items).toHaveLength(0)
  })

  it('totalPrice sums price * quantity across items', () => {
    const cart = useCartStore()
    cart.addItem(makeProduct({ id: 'p1', price: 100, quantity: 2, stock: 10 }))
    cart.addItem(makeProduct({ id: 'p2', price: 50, quantity: 3, stock: 10 }))
    expect(cart.totalPrice).toBe(100 * 2 + 50 * 3)
  })

  it('persists items to localStorage on change', async () => {
    const cart = useCartStore()
    cart.addItem(makeProduct())
    await new Promise((resolve) => setTimeout(resolve, 0))
    const saved = JSON.parse(localStorage.getItem('morning_farm_cart'))
    expect(saved).toHaveLength(1)
    expect(saved[0].id).toBe('p1')
  })

  it('restores items from localStorage on store creation', () => {
    localStorage.setItem('morning_farm_cart', JSON.stringify([makeProduct({ quantity: 2 })]))
    const cart = useCartStore()
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(2)
  })
})
