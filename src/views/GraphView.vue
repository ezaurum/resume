<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import type { GraphNode, EntityType } from '@/types'
import { ENTITY_COLORS } from '@/types'
import GraphCanvas from '@/components/GraphCanvas.vue'

const store = useDataStore()
const { t } = useI18n()
const graphCanvas = ref<InstanceType<typeof GraphCanvas>>()

const visibleTypes = ref<Set<EntityType>>(new Set(['person', 'company', 'project', 'skill', 'tag']))
const { nodes, edges } = store.graphData

function toggleType(type: EntityType) {
  if (type === 'person') return
  const next = new Set(visibleTypes.value)
  if (next.has(type)) next.delete(type)
  else next.add(type)
  visibleTypes.value = next
}

const entityCounts = computed(() => ({
  person: nodes.filter((n: GraphNode) => n.type === 'person').length,
  company: nodes.filter((n: GraphNode) => n.type === 'company').length,
  project: nodes.filter((n: GraphNode) => n.type === 'project').length,
  skill: nodes.filter((n: GraphNode) => n.type === 'skill').length,
  tag: nodes.filter((n: GraphNode) => n.type === 'tag').length,
}))
</script>

<template>
  <div class="flex flex-col" style="height: calc(100vh - 57px)">

    <!-- Toolbar -->
    <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 flex-wrap">
      <span class="text-sm font-medium text-gray-600">{{ t('graph.filter') }}</span>

      <button
        v-for="type in (['person', 'company', 'project', 'skill', 'tag'] as EntityType[])"
        :key="type"
        @click="toggleType(type)"
        :disabled="type === 'person'"
        :class="[
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all',
          visibleTypes.has(type)
            ? 'text-white border-transparent'
            : 'bg-white text-gray-400 border-gray-200'
        ]"
        :style="visibleTypes.has(type) ? { backgroundColor: ENTITY_COLORS[type], borderColor: ENTITY_COLORS[type] } : {}"
      >
        <span
          class="inline-block w-2 h-2 rounded-full"
          :style="{ backgroundColor: visibleTypes.has(type) ? 'rgba(255,255,255,0.8)' : ENTITY_COLORS[type] }"
        ></span>
        {{ t(`entity.types.${type}`) }} ({{ entityCounts[type] }})
      </button>

      <div class="ml-auto flex items-center gap-2">
        <button @click="graphCanvas?.zoomIn()" class="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors" :title="t('graph.zoomIn')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
        <button @click="graphCanvas?.zoomOut()" class="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors" :title="t('graph.zoomOut')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/>
          </svg>
        </button>
        <button @click="graphCanvas?.resetZoom()" class="px-3 py-1 text-xs hover:bg-gray-100 rounded text-gray-600 border border-gray-200 transition-colors">
          {{ t('graph.reset') }}
        </button>
      </div>
    </div>

    <!-- Graph Area -->
    <div class="flex-1 relative">
      <GraphCanvas
        ref="graphCanvas"
        :nodes="nodes"
        :edges="edges"
        :visible-types="visibleTypes"
      />

      <!-- Legend -->
      <div class="absolute bottom-4 left-4 bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        <p class="text-xs font-medium text-gray-600 mb-2">{{ t('graph.legend') }}</p>
        <div class="space-y-1.5">
          <div
            v-for="type in (['person', 'company', 'project', 'skill', 'tag'] as EntityType[])"
            :key="type"
            class="flex items-center gap-2 text-xs text-gray-600"
          >
            <span class="inline-block rounded-full" :style="{ width: '10px', height: '10px', backgroundColor: ENTITY_COLORS[type] }"></span>
            {{ t(`entity.types.${type}`) }}
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-3">{{ t('graph.instructions') }}</p>
      </div>
    </div>
  </div>
</template>
