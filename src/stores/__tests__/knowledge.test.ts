import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useKnowledgeStore } from '../knowledge'

describe('knowledge store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filteredList returns everything by default', () => {
    const store = useKnowledgeStore()
    expect(store.filteredList).toEqual(store.knowledgeList)
  })

  it('setCategory narrows filteredList to that category only', () => {
    const store = useKnowledgeStore()
    store.setCategory('recipes')
    expect(store.filteredList.length).toBeGreaterThan(0)
    expect(store.filteredList.every(item => item.category === 'recipes')).toBe(true)
  })

  it('setSearch narrows filteredList by a case-insensitive title match', () => {
    const store = useKnowledgeStore()
    const sample = store.knowledgeList[0]
    store.setSearch(sample.title.slice(0, 3).toUpperCase())
    expect(store.filteredList.some(item => item.id === sample.id)).toBe(true)
  })

  it('combines category and search filters', () => {
    const store = useKnowledgeStore()
    store.setCategory('recipes')
    store.setSearch('不存在的關鍵字xyz')
    expect(store.filteredList).toHaveLength(0)
  })

  it('getById finds an article by numeric or string id', () => {
    const store = useKnowledgeStore()
    expect(store.getById(1)?.id).toBe(1)
    expect(store.getById('1')?.id).toBe(1)
  })

  it('getById returns undefined for an unknown id', () => {
    const store = useKnowledgeStore()
    expect(store.getById(999999)).toBeUndefined()
  })
})
