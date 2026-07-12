import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const HomeView = () => import('@/views/customer/HomeView.vue')
const ProductsView = () => import('@/views/customer/ProductsView.vue')
const ProductsDetailView = () => import('@/views/customer/ProductsDetailView.vue')
const CartView = () => import('@/views/customer/CartView.vue')
const MapSeasonView = () => import('@/views/customer/MapSeasonView.vue')
const RankView = () => import('@/views/customer/RankView.vue')
const KnowledgeView = () => import('@/views/customer/KnowledgeView.vue')
const KnowledgeDetailView = () => import('@/views/customer/KnowledgeDetailView.vue')
const CooperationFarmerView = () => import('@/views/customer/CooperationFarmerView.vue')
const FarmerDetailView = () => import('@/views/customer/FarmerDetailView.vue')
const MemberView = () => import('@/views/customer/MemberView.vue')
const AdminLoginView = () => import('@/views/admin/AdminLoginView.vue')
const AdminDashboardView = () => import('@/views/admin/AdminDashboardView.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView, meta: { showLoading: true } },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/productDetail/:category/:id', name: 'productDetail', component: ProductsDetailView },
  { path: '/cart', name: 'cart', component: CartView },
  { path: '/member', name: 'member', component: MemberView },
  // /map 與 /season 原本重複指向同一個 View，統一命名為 mapSeason，alias 保留舊路徑向後兼容
  { path: '/map-season', name: 'mapSeason', component: MapSeasonView, alias: ['/map', '/season'] },
  { path: '/ranking', name: 'ranking', component: RankView },
  { path: '/knowledge', name: 'knowledge', component: KnowledgeView },
  { path: '/knowledge/:id', name: 'knowledge-detail', component: KnowledgeDetailView },
  { path: '/cooperation-farmer', name: 'cooperation-farmer', component: CooperationFarmerView },
  { path: '/farmer/:id', name: 'farmerDetail', component: FarmerDetailView },
  // Admin：登入頁單獨一頁，後臺所有功能由 AdminDashboardView 內部動態切換
  { path: '/admin/login', name: 'adminLogin', component: AdminLoginView },
  { path: '/admin/dashboard', name: 'adminDashboard', component: AdminDashboardView },
  // 舊路由 redirect 回後臺首頁，避免直接存取沒有 layout 的裸組件
  { path: '/admin/add-commodity', redirect: '/admin/dashboard' },
  { path: '/admin/check-order', redirect: '/admin/dashboard' },
  { path: '/admin/commodity', redirect: '/admin/dashboard' },
  { path: '/admin/withdraw', redirect: '/admin/dashboard' },
  { path: '/admin/finance', redirect: '/admin/dashboard' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切換頁面直接回到最頂
  // savedPosition 在「上一頁／下一頁」時由瀏覽器提供，應恢復位置以符合瀏覽習慣。
  // 但「重新整理」時瀏覽器同樣會傳入 savedPosition（記憶捲軸），
  // 這不符合 UX 預期，所以用 performance.navigation 排除 reload 的情況。
  scrollBehavior(to, from, savedPosition) {
    const navEntry = performance?.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming | undefined
    const isReload = navEntry?.type === 'reload'
    if (savedPosition && !isReload) {
      return savedPosition
    }
    return { top: 0 }
  },
})
export default router
// ── 路由守衛：保護後臺 ─────────────────────────────────────────────────
// 登入狀態由 Supabase Auth 管理（見 src/stores/auth.ts），首次導航時還原 session
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await authStore.init()
  const isLoggedIn = authStore.isLoggedIn
  // 要進後臺但未登入 → 導回登入頁
  if (to.path.startsWith('/admin') && to.name !== 'adminLogin' && !isLoggedIn) {
    return { name: 'adminLogin' }
  }
  // 已登入卻訪問登入頁 → 直接進後臺
  if (to.name === 'adminLogin' && isLoggedIn) {
    return { name: 'adminDashboard' }
  }
})
