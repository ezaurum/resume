<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import { ENTITY_COLORS } from '@/types'

const store = useDataStore()
const { t } = useI18n()

const tagsWithCount = computed(() =>
  store.tags
    .map(tag => ({
      ...tag,
      count:
        store.companies.filter(c => c.tags.includes(tag.id)).length +
        store.projects.filter(p => p.tags.includes(tag.id)).length,
    }))
    .sort((a, b) => b.count - a.count)
)
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 py-10">

      <!-- Header -->
      <div class="mb-8">
        <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Tags</p>
        <h1 class="text-2xl font-bold text-gray-900">{{ t('entity.types.tag') }}</h1>
        <p class="text-sm text-gray-500 mt-1">{{ t('tags.subtitle', { count: store.tags.length }) }}</p>
      </div>

      <!-- Grid -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        <router-link
          v-for="tag in tagsWithCount"
          :key="tag.id"
          :to="{ name: 'entity', params: { id: tag.id } }"
          class="block p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all"
        >
          <div class="flex items-start justify-between gap-2 mb-2">
            <span class="font-semibold text-gray-900 text-sm leading-tight">{{ tag.name }}</span>
            <span
              class="shrink-0 px-2 py-0.5 rounded-full text-xs text-white font-medium"
              :style="{ backgroundColor: ENTITY_COLORS.tag }"
            >
              {{ t('tags.entities', { count: tag.count }) }}
            </span>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">{{ tag.description }}</p>
        </router-link>
      </div>

    </div>
  </div>
</template>
