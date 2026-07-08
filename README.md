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

> 後台登入目前為**展示模式**：無需輸入帳號密碼，點擊「登入」即可進入，登入狀態以 `sessionStorage` 模擬。此設計僅為呈現後台介面與互動流程，尚未串接真實驗證機制。

## 技術棧

- [Vue 3](https://vuejs.org/)（Composition API）
- [Vue Router 4](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)（狀態管理）
- [MSW](https://mswjs.io/)（在瀏覽器端攔截 fetch，模擬商品 API：延遲、loading / error 狀態）
- [GSAP](https://gsap.com/)（動畫效果）
- [Vite](https://vitejs.dev/) + [Vitest](https://vitest.dev/)（建置工具 / 單元測試）
- GitHub Actions 自動建置並部署至 GitHub Pages

## 安裝與啟動

```bash
# 安裝套件
npm install

# 啟動開發伺服器（預設 http://localhost:5173）
npm run dev

# 建置正式版本
npm run build

# 預覽建置結果（預設 http://localhost:5174）
npm run preview

# 執行單元測試
npm run test
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

- 除商品清單外，其餘資料多為前端模擬資料，尚未串接真實後端 API
- 後台登入為展示用途，未包含真實身分驗證
- 目前只涵蓋 cart store 的單元測試，尚未涵蓋元件測試 / E2E 測試
