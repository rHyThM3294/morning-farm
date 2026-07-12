import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSalesReportStore = defineStore("salesReport", () => {
  // ── 頂部統計卡片 ──────────────────────────────────────
  const summaryCards = ref([
    { label: "本期銷售額", value: 32340, prefix: "$", icon: "💰" },
    { label: "單量",       value: 20,    prefix: "",   icon: "📦" },
    { label: "客單價",     value: 1617,  prefix: "$",  icon: "👥" },
    { label: "成長率",     value: 28,    prefix: "+",  suffix: "%", icon: "📈", highlight: true },
  ]);

  // ── 月度銷售資料 ──────────────────────────────────────
  const monthlyData = ref([
    { month: "01月", sales: 94300, units: 52, avgPrice: 1813, growth: null as number | null },
    { month: "02月", sales: 98000, units: 56, avgPrice: 1750, growth: 4    },
    { month: "03月", sales: 78450, units: 48, avgPrice: 1634, growth: -19  },
    { month: "04月", sales: 28450, units: 17, avgPrice: 1673, growth: -63  },
    { month: "05月", sales: 25960, units: 16, avgPrice: 1623, growth: -9   },
    { month: "06月", sales: 24660, units: 16, avgPrice: 1541, growth: -5   },
    { month: "07月", sales: 22980, units: 14, avgPrice: 1641, growth: -7   },
    { month: "08月", sales: 22770, units: 14, avgPrice: 1626, growth: -1   },
    { month: "09月", sales: 25820, units: 16, avgPrice: 1613, growth: 13   },
    { month: "10月", sales: 32340, units: 20, avgPrice: 1617, growth: 25   },
  ]);

  // ── 客戶分析統計 ──────────────────────────────────────
  const customerCards = ref([
    { label: "客戶總數",     value: 1340, prefix: "",  icon: "👥" },
    { label: "平均客單量值", value: 1717, prefix: "$", icon: "📦" },
    { label: "平均客單價",   value: 1617, prefix: "$", icon: "💰" },
    { label: "最大客群貢獻度", value: 27, prefix: "+", suffix: "%", icon: "📈", highlight: true },
  ]);

  // ── 客戶分群 ─────────────────────────────────────────
  const customerSegments = ref([
    { type: "高價常客", avgSpend: 1850, frequency: "1次/月",   ratio: 20 },
    { type: "穩定買家", avgSpend: 1560, frequency: "3次/月",   ratio: 30 },
    { type: "偶爾買家", avgSpend: 1630, frequency: "1次/3月",  ratio: 40 },
    { type: "新客",     avgSpend: 1310, frequency: "首次",      ratio: 10 },
  ]);

  const aiSummary = ref("本月銷售額 $32,340，比上月成長 25%，主要來自客單價提升。");
  const aiCustomerNote = ref([
    "「穩定買家雖然平均消費金額相較低，但購買頻率高，貢獻近 50% 營收。」",
    "「新客佔比 10%，需要加強留存。」",
  ]);

  // ── 計算用 ────────────────────────────────────────────
  const avgSales = computed(() => {
    const total = monthlyData.value.reduce((s, d) => s + d.sales, 0);
    return Math.round(total / monthlyData.value.length);
  });

  const maxSales = computed(() => Math.max(...monthlyData.value.map(d => d.sales)));

  return {
    summaryCards,
    monthlyData,
    customerCards,
    customerSegments,
    aiSummary,
    aiCustomerNote,
    avgSales,
    maxSales,
  };
});
