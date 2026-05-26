<template>
  <section class="sales-report">

    <!-- ── 頂部統計卡片 ── -->
    <div class="summary-cards">
      <div
        v-for="(card, i) in store.summaryCards"
        :key="card.label"
        class="summary-card"
        :class="{ highlight: card.highlight }"
      >
        <span class="card-icon">{{ card.icon }}</span>
        <div class="card-info">
          <p class="card-label">{{ card.label }}</p>
          <p class="card-value">
            {{ card.prefix }}{{ displayValues[i] }}{{ card.suffix ?? "" }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── 銷售趨勢區塊 ── -->
    <div class="trend-section">
      <h2 class="section-title">銷售趨勢</h2>

      <!-- 頁籤 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 銷售額表格 -->
      <div v-if="activeTab === 'table'" class="tab-content">
        <div class="table-wrapper">
          <table class="sales-table">
            <thead>
              <tr>
                <th>月份</th>
                <th>銷售額</th>
                <th>單量</th>
                <th>客單價</th>
                <th>成長率</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in store.monthlyData" :key="row.month">
                <td>{{ row.month }}</td>
                <td>${{ row.sales.toLocaleString() }}</td>
                <td>{{ row.units }}</td>
                <td>${{ row.avgPrice.toLocaleString() }}</td>
                <td :class="growthClass(row.growth)">
                  {{ formatGrowth(row.growth) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 趨勢圖表（折線） -->
      <div v-if="activeTab === 'trend'" class="tab-content">
        <p class="chart-label">折線圖</p>
        <div class="chart-area" ref="lineChartRef">
          <svg
            class="line-svg"
            :viewBox="`0 0 ${dynamicSvgW} ${svgH}`"
            
          >
            <!-- 格線 -->
            <line
              v-for="n in 5"
              :key="n"
              :x1="padL"
              :y1="gridY(n - 1)"
              :x2="dynamicSvgW - padR"
              :y2="gridY(n - 1)"
              stroke="#e0e0e0"
              stroke-width="1"
            />
            <!-- Y 軸標籤 -->
            <text
              v-for="n in 6"
              :key="'yl' + n"
              :x="padL - 6"
              :y="gridY(n - 1) + 4"
              text-anchor="end"
              font-size="10"
              fill="#888"
            >
              {{ yLabel(n - 1) }}
            </text>
            <!-- X 軸月份 -->
            <text
              v-for="(d, i) in store.monthlyData"
              :key="'xl' + i"
              :x="pointX(i)"
              :y="svgH - padB + 14"
              text-anchor="middle"
              font-size="10"
              fill="#888"
            >
              {{ d.month.replace("月", "") }}月
            </text>
            <!-- 折線路徑 -->
            <path
              :d="linePath"
              fill="none"
              stroke="#F39A7C"
              stroke-width="2.5"
              stroke-linejoin="round"
              stroke-linecap="round"
            />
            <!-- 資料點 -->
            <g v-for="(d, i) in store.monthlyData" :key="'pt' + i">
              <circle
                :cx="pointX(i)"
                :cy="pointY(d.sales)"
                r="4"
                fill="#F39A7C"
                :opacity="dotsVisible ? 1 : 0"
                style="transition: opacity 0.4s"
              />
              <text
                :x="pointX(i)"
                :y="pointY(d.sales) - 10"
                text-anchor="middle"
                font-size="9"
                fill="#555"
                :opacity="dotsVisible ? 1 : 0"
                style="transition: opacity 0.4s"
              >
                ${{ (d.sales / 1000).toFixed(0) }},{{ String(d.sales % 1000).padStart(3, '0') }}
              </text>
            </g>
            <!-- 起始點閃爍指示點 -->
            <circle
              ref="startDotRef"
              :cx="pointX(0)"
              :cy="pointY(store.monthlyData[0].sales)"
              r="5"
              fill="#F39A7C"
              opacity="0"
            />
          </svg>
        </div>
      </div>

      <!-- 成長率圖表（長條） -->
      <div v-if="activeTab === 'bar'" class="tab-content">
        <p class="chart-label">柱狀圖</p>
        <div class="chart-area" ref="barChartRef">
          <svg
            class="bar-svg"
            :viewBox="`0 0 ${dynamicSvgW} ${svgH}`"
            
          >
            <!-- 格線 -->
            <line
              v-for="n in 6"
              :key="n"
              :x1="padL"
              :y1="gridY(n - 1)"
              :x2="dynamicSvgW - padR"
              :y2="gridY(n - 1)"
              stroke="#e0e0e0"
              stroke-width="1"
            />
            <!-- Y 軸標籤 -->
            <text
              v-for="n in 6"
              :key="'byl' + n"
              :x="padL - 6"
              :y="gridY(n - 1) + 4"
              text-anchor="end"
              font-size="10"
              fill="#888"
            >
              {{ yLabel(n - 1) }}
            </text>
            <!-- X 軸月份 -->
            <text
              v-for="(d, i) in store.monthlyData"
              :key="'bxl' + i"
              :x="barCenterX(i)"
              :y="svgH - padB + 14"
              text-anchor="middle"
              font-size="10"
              fill="#888"
            >
              {{ d.month.replace("月", "") }}月
            </text>
            <!-- 長條 -->
            <rect
              v-for="(d, i) in store.monthlyData"
              :key="'bar' + i"
              :x="barX(i)"
              :y="barY(d.sales, i)"
              :width="barW"
              :height="barH(d.sales, i)"
              rx="3"
              fill="#F2BD66"
              opacity="0.85"
            />
            <!-- 長條上方數值 -->
            <text
              v-for="(d, i) in store.monthlyData"
              :key="'bval' + i"
              :x="barCenterX(i)"
              :y="barY(d.sales, i) - 5"
              text-anchor="middle"
              font-size="9"
              fill="#555"
              :opacity="barHeights[i] > 0 ? 1 : 0"
              style="transition: opacity 0.2s"
            >
              ${{ (d.sales / 1000).toFixed(0) }},{{ String(d.sales % 1000).padStart(3, '0') }}
            </text>
          </svg>
        </div>
      </div>

      <!-- AI 分析結論 -->
      <p class="ai-note">
        <span class="ai-tag">✦ AI分析結論：</span>
        「{{ store.aiSummary }}」
      </p>
    </div>

    <!-- ── 客戶分析統計卡片 ── -->
    <div class="summary-cards customer-cards">
      <div
        v-for="(card, i) in store.customerCards"
        :key="card.label"
        class="summary-card"
        :class="{ highlight: card.highlight }"
      >
        <span class="card-icon">{{ card.icon }}</span>
        <div class="card-info">
          <p class="card-label">{{ card.label }}</p>
          <p class="card-value">
            {{ card.prefix }}{{ customerDisplayValues[i] }}{{ card.suffix ?? "" }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── 客戶分群說明 ── -->
    <div class="customer-section">
      <h3 class="sub-section-title">客戶分群說明</h3>
      <div class="table-wrapper">
        <table class="customer-table">
          <thead>
            <tr>
              <th>客群類別</th>
              <th>平均消費</th>
              <th>購買頻率</th>
              <th>占比</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="seg in store.customerSegments" :key="seg.type">
              <td>{{ seg.type }}</td>
              <td>${{ seg.avgSpend.toLocaleString() }}</td>
              <td>{{ seg.frequency }}</td>
              <td>{{ seg.ratio }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ai-notes">
        <p v-for="(note, i) in store.aiCustomerNote" :key="i" class="ai-note">
          <span class="ai-tag">✦ AI分析結論：</span>{{ note }}
        </p>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { gsap } from "gsap";
import { useSalesReportStore } from "@/stores/salesReport.js";

const store = useSalesReportStore();

// ── 頁籤 ─────────────────────────────────────────────
const tabs = [
  { key: "table", label: "銷售額表格" },
  { key: "trend", label: "趨勢圖表"   },
  { key: "bar",   label: "成長率圖表" },
];
const activeTab = ref("table");

// ── SVG 尺寸常數 ──────────────────────────────────────
const svgH  = 260;
const padL  = 50;
const padR  = 20;
const padT  = 30;
const padB  = 30;
const chartH = computed(() => svgH - padT - padB);

// ── 動態 SVG 寬度（ResizeObserver 偵測容器） ───────────
const dynamicSvgW = ref(700);
const chartW = computed(() => dynamicSvgW.value - padL - padR);

let _roLine = null;
let _roBar  = null;
function makeRO() {
  return new ResizeObserver((entries) => {
    for (const entry of entries) {
      const w = entry.contentRect.width;
      if (w > 0) dynamicSvgW.value = Math.max(w, 400);
    }
  });
}

// ── 數字計數動畫（頂部 4 張卡片） ───────────────────────
const displayValues   = ref(store.summaryCards.map(() => 0));
const customerDisplayValues = ref(store.customerCards.map(() => 0));

function animateCounters(cards, displayRef) {
  cards.forEach((card, i) => {
    const target = card.value;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: "power2.out",
      onUpdate() {
        displayRef.value[i] = Math.round(obj.val).toLocaleString();
      },
      onComplete() {
        displayRef.value[i] = target.toLocaleString();
      },
    });
  });
}

// ── 折線圖 ────────────────────────────────────────────
const dotsVisible = ref(false);

const maxSales = computed(() => store.maxSales);

function pointX(i) {
  const step = chartW.value / (store.monthlyData.length - 1);
  return padL + i * step;
}
function pointY(sales) {
  const ratio = sales / maxSales.value;
  return padT + chartH.value * (1 - ratio);
}
function gridY(n) {
  return padT + (chartH.value / 5) * n;
}
function yLabel(n) {
  const max = maxSales.value;
  const val = Math.round(max * (1 - n / 5) / 1000);
  return val + "千";
}

const linePath = computed(() => {
  const pts = store.monthlyData.map((d, i) => `${pointX(i)},${pointY(d.sales)}`);
  return "M" + pts.join("L");
});

// ── 長條圖 ────────────────────────────────────────────
const barHeights    = ref(store.monthlyData.map(() => 0));
const barW = computed(() => chartW.value / store.monthlyData.length * 0.55);

function barCenterX(i) {
  const step = chartW.value / store.monthlyData.length;
  return padL + step * i + step / 2;
}
function barX(i) {
  return barCenterX(i) - barW.value / 2;
}
function fullBarH(sales) {
  return (sales / maxSales.value) * chartH.value;
}
function barH(sales, i) {
  return barHeights.value[i];
}
function barY(sales, i) {
  return svgH - padB - barHeights.value[i];
}

function animateBarChart() {
  barHeights.value = store.monthlyData.map(() => 0);
  store.monthlyData.forEach((d, i) => {
    const target = fullBarH(d.sales);
    const obj = { h: 0 };
    gsap.to(obj, {
      h: target,
      duration: 0.9,
      delay: i * 0.12,
      ease: "power2.out",
      onUpdate() {
        barHeights.value[i] = obj.h;
      },
    });
  });
}

// ── 折線圖動畫（用 GSAP 驅動 SVG path 的 stroke-dashoffset） ──
const lineChartRef = ref(null);
const startDotRef  = ref(null);

async function animateLineChartPro() {
  dotsVisible.value = false;
  await nextTick();

  const pathEl    = lineChartRef.value?.querySelector("path");
  const startDot  = lineChartRef.value?.querySelector("circle[data-start]") ?? startDotRef.value;
  if (!pathEl) return;

  const totalLen = pathEl.getTotalLength();

  gsap.set(pathEl, {
    strokeDasharray: totalLen,
    strokeDashoffset: totalLen,
    opacity: 1,
  });

  const tl = gsap.timeline();

  // 階段 1：起始點閃爍 1 秒
  if (startDot) {
    gsap.set(startDot, { opacity: 0 });
    tl.to(startDot, {
      opacity: 1,
      duration: 0.25,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut",
    });
  }

  // 階段 2：折線從左往右展開 1.5 秒
  tl.to(pathEl, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.inOut",
  });

  // 階段 3：起始閃爍點淡出，資料點全部出現
  tl.call(() => {
    dotsVisible.value = true;
    if (startDot) gsap.to(startDot, { opacity: 0, duration: 0.3 });
  }, [], "+=0.1");
}

// ── tab 切換 ─────────────────────────────────────────
async function switchTab(key) {
  activeTab.value = key;
  await nextTick();
  if (key === "trend") {
    if (lineChartRef.value && !_roLine) {
      _roLine = makeRO();
      _roLine.observe(lineChartRef.value);
    }
    animateLineChartPro();
  }
  if (key === "bar") {
    if (barChartRef.value && !_roBar) {
      _roBar = makeRO();
      _roBar.observe(barChartRef.value);
    }
    animateBarChart();
  }
}

// ── 掛載後動畫 ────────────────────────────────────────
onMounted(() => {
  animateCounters(store.summaryCards,   displayValues);
  animateCounters(store.customerCards,  customerDisplayValues);
});

onUnmounted(() => {
  _roLine?.disconnect();
  _roBar?.disconnect();
});

// ── 成長率欄位樣式 ────────────────────────────────────
function growthClass(g) {
  if (g === null) return "";
  return g > 0 ? "positive" : "negative";
}
function formatGrowth(g) {
  if (g === null) return "—";
  return (g > 0 ? "+" : "") + g + "%";
}

// ── 匯出（模擬） ──────────────────────────────────────
function exportData() {
  alert("匯出功能開發中");
}
</script>

<style scoped>
* { box-sizing: border-box; }

.sales-report {
  width: 100%;
  padding: 1.2em 1em 3em;
  display: flex;
  flex-direction: column;
  gap: 1.8em;
  max-width: 900px;
}

/* ── 統計卡片 ──────────────────────────── */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8em;
}
.summary-card {
  background: var(--mainColor);
  border-radius: var(--radiusNormal);
  padding: 0.9em 1em;
  display: flex;
  align-items: center;
  gap: 0.8em;
  min-height: 72px;
}
.summary-card.highlight {
  background: var(--warningColor);
  color: #fff;
}
.card-icon {
  font-size: 1.4em;
  flex-shrink: 0;
}
.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
}
.card-label {
  font-size: 0.72em;
  color: var(--black);
  opacity: 0.75;
}
.summary-card.highlight .card-label {
  color: #fff;
  opacity: 0.85;
}
.card-value {
  font-size: 1.2em;
  font-weight: 700;
  color: var(--black);
  line-height: 1;
}
.summary-card.highlight .card-value {
  color: #fff;
  font-size: 1.4em;
}

/* ── 趨勢區塊 ──────────────────────────── */
.trend-section {
  background: #fff;
  border-radius: var(--radiusNormal);
  padding: 1.2em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.section-title {
  font-size: 1.3em;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 0.8em;
}

/* 頁籤 */
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 1em;
  border-bottom: 2px solid var(--gray);
}
.tab-btn {
  padding: 0.5em 1em;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  font-size: 0.88em;
  color: var(--black);
  cursor: pointer;
  transition: var(--transitionNormal);
  white-space: nowrap;
}
.tab-btn.active {
  color: var(--mainColor);
  border-bottom-color: var(--mainColor);
  font-weight: 700;
}
.tab-btn:hover:not(.active) {
  color: var(--firstColor);
}

/* 表格 */
.tab-content {
  width: 100%;
  overflow-x: auto;
}
.table-wrapper {
  overflow-x: auto;
}
.sales-table,
.customer-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88em;
  min-width: 400px;
}
.sales-table th,
.customer-table th {
  background: var(--mainColor);
  padding: 0.65em 0.8em;
  text-align: center;
  font-weight: 600;
  color: var(--black);
}
.sales-table td,
.customer-table td {
  padding: 0.6em 0.8em;
  text-align: center;
  border-bottom: 1px solid #f0ece4;
  color: var(--black);
}
.sales-table tbody tr:hover,
.customer-table tbody tr:hover {
  background: #fef9ef;
}
.positive { color: #e0451a; font-weight: 600; }
.negative { color: #388e3c; font-weight: 600; }

/* 圖表 */
.chart-label {
  font-size: 0.8em;
  color: var(--gray);
  margin-bottom: 0.3em;
}
.chart-area {
  width: 100%;
  overflow-x: auto;
}
.line-svg,
.bar-svg {
  width: 100%;
  min-width: 400px;
  height: auto;
  display: block;
}

/* AI 備注 */
.ai-note {
  font-size: 0.8em;
  color: #555;
  margin-top: 0.8em;
  line-height: 1.6;
}
.ai-tag {
  color: var(--warningColor);
  font-weight: 600;
  margin-right: 0.2em;
}
.ai-notes {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
}

/* ── 客戶分析 ──────────────────────────── */
.customer-cards {
  margin-top: 0;
}
.customer-section {
  background: #fff;
  border-radius: var(--radiusNormal);
  padding: 1.2em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}
.sub-section-title {
  font-size: 1em;
  font-weight: 700;
  color: var(--black);
  background: var(--mainColor);
  padding: 0.4em 0.8em;
  border-radius: 4px;
  display: inline-block;
}

/* ── RWD >=768px ───────────────────────── */
@media (width >= 768px) {
  .sales-report {
    padding: 0;
    max-width: 100%;
  }
  .summary-cards {
    grid-template-columns: repeat(4, 1fr);
  }
  .summary-card {
    min-height: 88px;
  }
  .card-value {
    font-size: 1.4em;
  }
  .section-title {
    font-size: 1.6em;
  }
  .tab-btn {
    font-size: 0.95em;
    padding: 0.6em 1.4em;
  }
}
</style>