# 清晨農鋪 Morning Farm

一個以「小農直送」為題的電商平台前端練習專案，包含完整的顧客購物流程與後台管理系統。使用 Vue 3 + Pinia + Vue Router 開發，作為前端工程師求職作品集使用。

🔗 **Demo**：https://rhythm3294.github.io/morning-farm/

## 功能列表

### 顧客端
- 首頁與品牌介紹
- 商品列表 / 商品詳情 / 加入購物車
- 購物車與結帳流程
- 台灣農產品產季地圖（互動式 SVG 地圖 + 圖表）
- 農產品排行榜
- 農業知識文章列表 / 詳情
- 合作小農列表 / 農夫詳情
- 會員中心（個人資料、收貨地址、信用卡管理、收藏清單、訂單查詢）

### 後台管理
- 商品管理（新增／編輯商品）
- 訂單管理（查詢、篩選、訂單詳情）
- 銷售統計與財務報表（含圖表）
- 提領管理

> 後台登入使用 [Supabase Auth](https://supabase.com/auth) 進行真實的 email / password 驗證，登入狀態由 Supabase 管理（session 存於 localStorage，重新整理不會登出）。目前僅開放單一管理員帳號，未提供註冊流程。

## 技術棧

- [Vue 3](https://vuejs.org/)（Composition API）
- [TypeScript](https://www.typescriptlang.org/)（資料層：stores / composables / router / mocks 已完成型別化，`.vue` 元件層維持 JS，逐步遷移中）
- [Vue Router 4](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)（狀態管理）
- [Supabase Auth](https://supabase.com/auth)（後台管理員登入驗證）
- [MSW](https://mswjs.io/)（在瀏覽器端攔截 fetch，模擬商品 API：延遲、loading / error 狀態）
- [GSAP](https://gsap.com/)（動畫效果）
- [Vite](https://vitejs.dev/) + [Vitest](https://vitest.dev/)（建置工具 / 單元測試）
- GitHub Actions 自動建置並部署至 GitHub Pages

## 安裝與啟動

```bash
# 安裝套件
npm install

# 複製環境變數範例檔，並填入你自己的 Supabase 專案 URL / anon key
cp .env.example .env

# 啟動開發伺服器（預設 http://localhost:5173）
npm run dev

# 建置正式版本
npm run build

# 預覽建置結果（預設 http://localhost:5174）
npm run preview

# 執行單元測試
npm run test

# 型別檢查（資料層）
npm run typecheck
```

## 專案結構

```
src/
├── components/     # 依模組拆分的元件（admin、finance、mapSeason、member...）
├── views/          # 頁面層級元件，分為 customer 與 admin
├── stores/         # Pinia 狀態管理（cart、product、order、finance...）
├── router/         # 路由設定與後台路由守衛
├── mocks/          # MSW handler／假 API 資料，模擬 GET /api/products
├── composables/    # 可複用邏輯（如捲動顯現動畫）
└── assets/         # 全域樣式
```

## 資料流說明

商品清單（`useProductStore`）在 App 啟動時透過 `fetchProducts()` 呼叫 `fetch('/api/products')`，
這個請求會被 MSW 在瀏覽器端攔截、模擬延遲後回傳資料，元件端據此顯示 loading／error 狀態
（見 [ProductsView.vue](src/views/customer/ProductsView.vue)）。其餘模組（購物車、會員、訂單、財務等）
仍是單純的前端模擬資料，尚未串接真實後端。

## 已知限制

- 除商品清單與後台登入外，其餘資料多為前端模擬資料，尚未串接真實後端 API
- 目前只涵蓋 cart store 的單元測試，尚未涵蓋元件測試 / E2E 測試
- TypeScript 目前僅涵蓋資料層（stores / composables / router / mocks），`.vue` 元件層仍是 JS，尚未全面遷移
