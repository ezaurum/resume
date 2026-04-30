import Fuse from 'fuse.js'
import { computed, ref, type ComputedRef } from 'vue'
import type { SearchItem, EntityType } from '@/types'

function getThreshold(q: string): number {
  const len = q.trim().length
  if (len <= 2) return 0.1
  if (len <= 4) return 0.2
  return 0.3
}

export function useFuzzySearch(itemsRef: ComputedRef<SearchItem[]>) {
  const query = ref('')
  const activeFilter = ref<EntityType | 'all'>('all')

  const fuse = computed(() => new Fuse(itemsRef.value, {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'skills', weight: 0.2 },
      { name: 'tags', weight: 0.15 },
      { name: 'description', weight: 0.1 },
      { name: 'searchText', weight: 0.15 },
    ],
    threshold: getThreshold(query.value),
    includeScore: true,
    minMatchCharLength: 1,
    shouldSort: true,
    useExtendedSearch: false,
    ignoreLocation: true,
  }))

  function runSearch(q: string): SearchItem[] {
    if (!q.trim()) return []
    const scoreLimit = getThreshold(q) * 0.8
    const ql = q.toLowerCase()

    // 1차: Fuse 퍼지 검색 (name/description 위주)
    const fuseResults = fuse.value.search(q)
      .filter(r => (r.score ?? 1) <= scoreLimit)
      .map(r => r.item)

    // 2차: skills/tags 직접 포함 검색 (Fuse 가중치 문제 우회)
    const matched = new Set(fuseResults.map(i => i.id))
    const skillTagMatches = itemsRef.value.filter(item => {
      if (matched.has(item.id)) return false
      return item.skills.some(s => s.toLowerCase().includes(ql))
        || item.tags.some(t => t.toLowerCase().includes(ql))
        || item.searchText.toLowerCase().includes(ql)
    })

    return [...fuseResults, ...skillTagMatches]
  }

  const results = computed((): SearchItem[] => {
    if (!query.value.trim()) {
      // filter만 있고 query가 없으면 해당 타입 전체 반환
      if (activeFilter.value !== 'all') {
        return itemsRef.value.filter(item => item.type === activeFilter.value)
      }
      return []
    }
    let found = runSearch(query.value)
    if (activeFilter.value !== 'all') {
      found = found.filter(item => item.type === activeFilter.value)
    }
    return found
  })

  const resultsByType = computed(() => {
    const all = runSearch(query.value)
    return {
      all,
      company: all.filter(i => i.type === 'company'),
      project: all.filter(i => i.type === 'project'),
      skill: all.filter(i => i.type === 'skill'),
      tag: all.filter(i => i.type === 'tag'),
      person: all.filter(i => i.type === 'person')
    }
  })

  function search(q: string) {
    query.value = q
  }

  function setFilter(filter: EntityType | 'all') {
    activeFilter.value = filter
  }

  return {
    query,
    activeFilter,
    results,
    resultsByType,
    search,
    setFilter
  }
}
