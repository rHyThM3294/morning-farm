import { createRouter, createWebHistory } from 'vue-router'
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
const AddCommodityDetail = () => import('@/components/adminBlock/AddCommodityDetail.vue')
const CheckOrder = () => import('@/components/adminBlock/CheckOrder.vue')
const Commodity = () => import('@/components/adminBlock/Commodity.vue')
const Withdraw = () => import('@/components/adminBlock/Withdraw.vue')
const Finance = () =>import('@/components/adminBlock/Finance.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { showLoading: true } },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/productDetail/:category/:id', name: 'productDetail', component: () => import('../views/customer/ProductsDetailView.vue') },
    { path: '/cart', component: CartView },
    { path: '/map', component: MapSeasonView },
    { path: '/season', component: MapSeasonView },
    { path: '/ranking', component: RankView },
    { path: '/knowledge', component: KnowledgeView },
    { path: '/knowledge/:id', name: 'knowledge-detail', component: KnowledgeDetailView },
    { path: '/cooperation-farmer', name: 'cooperation-farmer', component: CooperationFarmerView },
    { path: '/farmer/:id', name: 'farmerDetail', component: () => import('../views/customer/FarmerDetailView.vue')},
    { path: '/cart', name:'cart',component: () => import('@/views/customer/CartView.vue') },
    { path: '/member', name:'member',component: () => import("@/views/customer/MemberView.vue") },
    { path: '/admin/login', component: AdminLoginView },
    { path: '/admin/login', name: 'adminLogin', component: AdminLoginView },
    { path: '/admin/dashboard', component: AdminDashboardView },
    { path: '/admin/add-commodity', component: AddCommodityDetail },
    { path: '/admin/check-order', component: CheckOrder },
    { path: '/admin/commodity', component: Commodity },
    { path: '/admin/withdraw', component: Withdraw },
    { path: '/admin/Finance', component: Finance },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})
export default router