<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, idx) in crumbs" :key="idx">
        <RouterLink
          v-if="item.to && idx !== crumbs.length - 1"
          :to="item.to"
          class="link"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else class="current" aria-current="page">{{ item.label }}</span>
        <span v-if="idx < crumbs.length - 1" class="sep">/</span>
      </li>
    </ol>
  </nav>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  items: { type: Array, default: null },
})
const route = useRoute()
const categoryMap = {
  all: '全部商品',
  longTime: '可長久保存',
  vegetarianism: '素食',
  process: '加工食品',
  festival: '過節禮盒',
}
const autoCrumbs = computed(() => {
  const { name, params, state } = route
  const crumbs = []
  crumbs.push({ label: '首頁', to: { name: 'home' } })
  if (name === 'products' || name === 'productDetail') {
    crumbs.push({
      label: categoryMap[params.category] ?? '全部商品',
      to: { name: 'products' },
    })
  }
  if (name === 'productDetail') {
    const title = state?.product?.productTitle ?? '商品詳情'
    crumbs.push({ label: title })
  }
  if (name === 'knowledge-detail') {
    crumbs.push({ label: '知識文章', to: { name: 'knowledge' } })
    crumbs.push({ label: `文章 #${params.id}` })
  }
  if (name === 'cooperation-farmer') {
    crumbs.push({ label: '合作小農' })
  }
  if (name === 'productDetail' && state?.product?.sellerName) {
    crumbs.push({
      label: '合作小農',
      to: { name: 'cooperation-farmer' },
    })
    crumbs.push({
      label: state.product.sellerName,
    })
  }

  return crumbs
})
const crumbs = computed(() => props.items || autoCrumbs.value)
</script>
<style scoped>
.breadcrumb {
  margin: 1em 0;
  font-size: 0.95em;
  color: var(--black);
  padding: 0.75em 1em;
  animation: fadeIn 0.4s ease;
}
.breadcrumb ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.link {
  color: var(--mainColor);
  text-decoration: none;
  transition: color 0.2s;
}
.link:hover {
  color: var(--secondColor);
}
.current {
  color: var(--secondColor);
  font-weight: 600;
}
.sep {
  margin: 0 0.5rem;
  color: #aaa;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
