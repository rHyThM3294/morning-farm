// 資料層共用型別。只涵蓋跨檔案共用或明確的網域實體，
// 純 UI 狀態（如單一 store 內部用的靜態清單）維持定義在該 store 檔案內。

export interface Product {
  id: string
  productTitle: string
  category: string
  series: string | null
  status: string
  sellerName: string
  unit: string
  price: number
  imageUrl: string
  createdAt: string
  stock: number
  sellerAvatarUrl: string
  farmerDescription: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface ReturnInfo {
  status: 'pending' | 'done'
  reason: string
  method: string
  applyTime: string
  deadline: string | null
  finishedTime: string | null
}

export interface OrderItem {
  productId: string
  productName: string
  sellerName: string
  unit: string
  price: number
  quantity: number
  subtotal: number
}

export interface Order {
  id: number
  orderId: string
  buyer: string
  phone: string
  telephone: string
  email: string
  date: string
  payTime: string | null
  status: string
  isPaid: boolean
  payMethod: string
  shippingMethod: string
  address: string
  items: OrderItem[]
  freight: number
  total: number
  returnInfo: ReturnInfo | null
  remark: string
  productImage: string
}

export type OrderSearchParams =
  | { type: 'orderId'; keyword: string }
  | { type: 'date'; start?: string; end?: string }

export interface FinanceStat {
  id: number
  title: string
  value: number
  type: 'income' | 'refund'
}

export interface Donut {
  net: number
  fee: number
}

export interface FinanceApiPayload {
  stats?: FinanceStat[]
  donut?: Donut
}

// 後台商品管理用的商品實體，欄位與顧客端 Product 不同（後台自建表單資料）
export interface AdminProduct {
  id: number
  productTitle: string
  productTag: string
  subTag: string
  unit: string
  originalPrice: number
  price: number
  isOutOfStock: boolean
  status: string
  settings: string[]
  imageList: string[]
  description: string
  farmerName: string
}

export interface Farmer {
  farmerName: string
  crop: string
  likes: number
  date: string
  imageUrl: string
}
