<template>
  <section class="product-sales">

    <!-- ── 頁首標題 ── -->
    <h2 class="page-title">暢銷商品</h2>

    <!-- ── 頁籤 ── -->
    <div class="tabs-bar">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'gallery' }"
        @click="switchTab('gallery')"
      >
        商品圖
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'chart' }"
        @click="switchTab('chart')"
      >
        圖表
      </button>
    </div>

    <!-- ════ 商品圖 Tab ════ -->
    <div v-if="activeTab === 'gallery'" class="gallery-tab">
      <!-- 前 3 名：有圖的商品卡 -->
      <div class="top3-grid">
        <div
          v-for="(p, i) in store.topThreeWithImage"
          :key="p.id"
          class="product-card"
          :class="{ first: i === 0 }"
        >
          <div class="card-img-wrap">
            <img :src="p.image" :alt="p.name" class="card-img" />
          </div>
          <p class="card-name">{{ i + 1 }}.{{ p.name }}{{ p.emoji }}</p>
        </div>
      </div>

      <!-- 第 4、5 名：純文字列表 -->
      <ul class="rest-list">
        <li
          v-for="(p, i) in store.restProducts"
          :key="p.id"
          class="rest-item"
        >
          {{ store.topThreeWithImage.length + i + 1 }}.{{ p.name }}
        </li>
      </ul>
    </div>

    <!-- ════ 圖表 Tab ════ -->
    <div v-if="activeTab === 'chart'" class="chart-tab">
      <p class="chart-label">柱狀圖</p>
      <div class="chart-area" ref="barChartRef">
        <svg
          class="bar-svg"
          :viewBox="`0 0 ${dynamicSvgW} ${svgH}`"
        >
          <!-- 格線 + Y 軸標籤 -->
          <line
            v-for="n in 6"
            :key="'gl' + n"
            :x1="padL"
            :y1="gridY(n - 1)"
            :x2="dynamicSvgW - padR"
            :y2="gridY(n - 1)"
            stroke="#d0d0d0"
            stroke-width="1"
          />
          <text
            v-for="n in 6"
            :key="'yl' + n"
            :x="padL - 6"
            :y="gridY(n - 1) + 4"
            text-anchor="end"
            font-size="11"
            fill="#888"
          >
            {{ yLabel(n - 1) }}
          </text>

          <!-- 每一組：淺藍背景柱（滿高）+ 橙色實際柱 -->
          <g
            v-for="(p, i) in store.topProducts"
            :key="'bar' + i"
          >
            <!-- 淺藍背景（全高，靜態） -->
            <rect
              :x="barGroupX(i)"
              :y="padT"
              :width="barGroupW"
              :height="chartH"
              rx="4"
              fill="#d4d8f0"
              opacity="0.55"
            />
            <!-- 橙色實際高度（動畫） -->
            <rect
              :x="barGroupX(i)"
              :y="svgH - padB - barHeights[i]"
              :width="barGroupW"
              :height="barHeights[i]"
              rx="4"
              fill="#F2BD66"
              opacity="0.9"
            />
            <!-- 數值標籤（柱頂上方） -->
            <text
              :x="barGroupX(i) + barGroupW / 2"
              :y="padT + (chartH - barFullH(p.soldQty)) - 6"
              text-anchor="middle"
              font-size="12"
              font-weight="600"
              fill="#555"
              :opacity="barHeights[i] > 1 ? 1 : 0"
              style="transition: opacity 0.2s"
            >
              {{ p.soldQty }}
            </text>
            <!-- X 軸商品名稱 -->
            <text
              :x="barGroupX(i) + barGroupW / 2"
              :y="svgH - padB + 16"
              text-anchor="middle"
              font-size="11"
              fill="#555"
            >
              {{ p.name }}
            </text>
          </g>

          <!-- Y 軸「0(千)」底部標籤 -->
          <text
            :x="padL - 6"
            :y="svgH - padB + 4"
            text-anchor="end"
            font-size="11"
            fill="#888"
          >
            0(千)
          </text>
        </svg>
      </div>
    </div>

    <!-- ── 商品報表（兩個 tab 共用） ── -->
    <div class="report-section">
      <div class="report-header">
        <span class="report-tag">商品報表</span>
        <button class="export-btn" @click="exportCSV">匯出 ↓</button>
      </div>
      <div class="table-wrapper">
        <table class="report-table">
          <thead>
            <tr>
              <th>品名</th>
              <th>單價</th>
              <th>銷售數量</th>
              <th>銷售額</th>
              <th>庫存量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in store.topProducts" :key="p.id">
              <td>{{ p.name }}</td>
              <td>{{ p.unitPrice }}</td>
              <td>{{ p.soldQty }}</td>
              <td>${{ p.salesAmount.toLocaleString() }}</td>
              <td>{{ p.stock }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>
<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { useProductSalesStore } from "@/stores/productSales";
const store = useProductSalesStore();
// ── 頁籤 ─────────────────────────────────────────────
const activeTab = ref("gallery");

async function switchTab(key) {
  activeTab.value = key;
  if (key === "chart") {
    await nextTick();
    animateBarChart();
  }
}

// ── SVG 尺寸 ──────────────────────────────────────────
const svgW      = 700;
const svgH      = 202;
const padL      = 46;
const padR      = 20;
const padT      = 30;
const padB      = 34;
const chartH    = svgH - padT - padB;

// ── 動態 SVG 寬度 ──────────────────────────────────────
const dynamicSvgW = ref(700);

let ro;
onMounted(() => {
  ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const w = entry.contentRect.width;
      if (w > 0) dynamicSvgW.value = Math.max(w, 380);
    }
  });
  if (barChartRef.value) ro.observe(barChartRef.value);
});
onUnmounted(() => {
  ro?.disconnect();
});

// 每組長條（一個商品一組）
const totalBars  = computed(() => store.topProducts.length);
const slotW      = computed(() => (dynamicSvgW.value - padL - padR) / totalBars.value);
const barGroupW  = computed(() => slotW.value * 0.65);

function barGroupX(i) {
  return padL + i * slotW.value + (slotW.value - barGroupW.value) / 2;
}

// Y 軸
function gridY(n) {
  // n = 0(頂) ~ 5(底)，分 5 格
  return padT + (chartH / 5) * n;
}
function yLabel(n) {
  const maxQty = store.maxSoldQty;
  const val = Math.round(maxQty * (1 - n / 5));
  return val;
}

// 滿高（目標高度）
function barFullH(soldQty) {
  return (soldQty / store.maxSoldQty) * chartH;
}

// ── 長條動畫 ──────────────────────────────────────────
const barHeights = ref(store.topProducts.map(() => 0));
const barChartRef = ref(null);

function animateBarChart() {
  // 重置
  barHeights.value = store.topProducts.map(() => 0);

  store.topProducts.forEach((p, i) => {
    const target = barFullH(p.soldQty);
    const obj = { h: 0 };
    gsap.to(obj, {
      h: target,
      duration: 0.9,
      delay: i * 0.15,   // 從左到右依序啟動，間隔 0.15s
      ease: "power2.out",
      onUpdate() {
        barHeights.value[i] = obj.h;
      },
    });
  });
}

// ── 匯出 CSV ──────────────────────────────────────────
function exportCSV() {
  const headers = ["品名", "單價", "銷售數量", "銷售額", "庫存量"];
  const rows = store.topProducts.map((p) => [
    p.name,
    p.unitPrice,
    p.soldQty,
    p.salesAmount,
    p.stock,
  ]);
  const csvContent =
    "\uFEFF" +                      // BOM：讓 Excel 正確顯示中文
    [headers, ...rows]
      .map((r) => r.join(","))
      .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "暢銷商品報表.csv";
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.product-sales{
  width: 100%;
  padding: 1.5em 1em 3em;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 900px;
}

/* ── 標題 ──────────────────────────────── */
.page-title {
  font-size: 1.8em;
  font-weight: 800;
  color: var(--black);
  margin-bottom: 0.6em;
}

/* ── 頁籤列 ────────────────────────────── */
.tabs-bar {
  display: flex;
  gap: 0;
  border-bottom: 2px solid var(--mainColor);
  margin-bottom: 1.4em;
}
.tab-btn {
  padding: 0.45em 1.2em;
  font-size: 0.9em;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--black);
  border-radius: 4px 4px 0 0;
  transition: var(--transitionNormal);
  font-weight: 500;
}
.tab-btn.active {
  background: var(--mainColor);
  color: var(--black);
  font-weight: 700;
}
.tab-btn:hover:not(.active) {
  background: #fdecc8;
}

/* ── 商品圖 Tab ─────────────────────────── */
.gallery-tab {
  margin-bottom: 2em;
}
.top3-grid {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  margin-bottom: 0.8em;
}
.product-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
  width: calc(33.33% - 0.7em);
  min-width: 120px;
}
.product-card.first {
  /* 第一名卡片略大一些 */
}
.card-img-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: var(--radiusNormal);
  overflow: hidden;
  background: #f9f4ea;
  border: 2px solid transparent;
}
.product-card.first .card-img-wrap {
  border-color: var(--mainColor);
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card-name {
  font-size: 0.9em;
  font-weight: 600;
  color: var(--black);
}

/* 第 4、5 名文字列表 */
.rest-list {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  margin-top: 0.2em;
}
.rest-item {
  font-size: 0.88em;
  color: var(--black);
  padding-left: 0.2em;
}

/* ── 圖表 Tab ───────────────────────────── */
.chart-tab {
  margin-bottom: 2em;
}
.chart-label {
  font-size: 0.82em;
  color: #888;
  margin-bottom: 0.4em;
}
.chart-area {
  width: 100%;
  overflow-x: auto;
}
.bar-svg {
  width: 100%;
  min-width: 380px;
  height: auto;
  display: block;
}

/* ── 商品報表 ────────────────────────────── */
.report-section{
  display: flex;
  flex-direction: column;
  gap: 0;
}
.report-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.report-tag{
  background: var(--mainColor);
  color: var(--white);
  font-size: 1em;
  padding: 0.25em 0.8em;
}
.export-btn {
  background: none;
  border: none;
  font-size: 0.85em;
  color: var(--black);
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  transition: var(--transitionNormal);
}
.export-btn:hover {
  color: var(--mainColor);
}
.table-wrapper {
  overflow-x: auto;
}
.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88em;
  min-width: 420px;
}
.report-table th {
  background: var(--mainColor);
  padding: 0.65em 0.8em;
  text-align: center;
  font-weight: 700;
  color: var(--black);
}
.report-table td {
  padding: 0.65em 0.8em;
  text-align: center;
  border-bottom: 1px solid #f0ece4;
  color: var(--black);
}
.report-table tbody tr:hover {
  background: #fef9ef;
}
@media(width >= 768px){
  .product-sales {
    padding: 0;
    max-width: 100%;
  }
  .page-title {
    font-size: 2.2em;
  }
  .tab-btn {
    font-size: 0.95em;
    padding: 0.5em 1.5em;
  }
  .product-card {
    width: calc(33.33% - 0.7em);
    max-width: 200px;
  }
  .card-img-wrap {
    max-height: 180px;
  }
}
</style>