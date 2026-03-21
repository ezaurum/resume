<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/useDataStore'
import { useFuzzySearch } from '@/composables/useFuzzySearch'
import EntityCard from '@/components/EntityCard.vue'
import type { EntityType } from '@/types'

const route = useRoute()
const store = useDataStore()
const { t } = useI18n()
const { searchItems } = storeToRefs(store)

const { activeFilter, results, resultsByType, search, setFilter } = useFuzzySearch(searchItems)

const queryParam = computed(() => route.query.q as string || '')
const filterParam = computed(() => route.query.filter as EntityType | undefined)

onMounted(() => {
  if (filterParam.value) setFilter(filterParam.value)
  search(queryParam.value)
})
watch(queryParam, (q) => { search(q) })
watch(filterParam, (f) => { if (f) setFilter(f) })

const filterTabs = computed((): Array<{ key: EntityType | 'all'; label: string }> => [
  { key: 'all', label: t('filter.all') },
  { key: 'company', label: t('filter.company') },
  { key: 'project', label: t('filter.project') },
  { key: 'skill', label: t('filter.skill') },
  { key: 'tag', label: t('filter.tag') },
])

function getCount(key: EntityType | 'all'): number {
  if (key === 'all') return resultsByType.value.all.length
  return (resultsByType.value[key as keyof typeof resultsByType.value] as unknown[])?.length ?? 0
}

const suggestions = ['Go', 'Kotlin', 'Java', 'Kubernetes', 'B2B']
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 pt-4 pb-12">

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1 border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          @click="setFilter(tab.key)"
          :class="[
            'flex items-center gap-1 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors',
            activeFilter === tab.key
              ? 'border-gray-900 text-gray-900 font-medium'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
          <span
            v-if="getCount(tab.key) > 0"
            :class="[
              'px-1.5 py-0.5 rounded text-xs',
              activeFilter === tab.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            {{ getCount(tab.key) }}
          </span>
        </button>
      </div>

      <!-- Results -->
      <div v-if="results.length > 0">
        <p class="text-sm text-gray-400 mb-4">
          {{ t('search.resultsCount', { query: queryParam, count: results.length }) }}
        </p>
        <div class="divide-y divide-gray-100">
          <EntityCard v-for="item in results" :key="item.id" :entity="item.entity" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="queryParam" class="text-center py-16">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-gray-500 text-lg mb-2">{{ t('search.noResults', { query: queryParam }) }}</p>
        <p class="text-gray-400 text-sm">{{ t('search.noResultsHint') }}</p>
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <button
            v-for="s in suggestions"
            :key="s"
            @click="$router.push({ name: 'search', query: { q: s } })"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="space-y-2">
        <p class="text-sm text-gray-400 mb-4">{{ t('search.allItems', { count: searchItems.length }) }}</p>
        <div class="divide-y divide-gray-100">
          <EntityCard
            v-for="item in searchItems.slice(0, 20)"
            :key="item.id"
            :entity="item.entity"
          />
        </div>
      </div>
    </div>
  </div>
</template>
