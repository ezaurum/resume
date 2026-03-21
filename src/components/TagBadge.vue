<script setup lang="ts">
import { computed } from 'vue'
import type { EntityType } from '@/types'
import { ENTITY_COLORS } from '@/types'

const props = defineProps<{
  label: string
  type?: EntityType
  clickable?: boolean
  entityId?: string
}>()

const colorStyle = computed(() => {
  if (props.type) {
    const color = ENTITY_COLORS[props.type]
    return { backgroundColor: color + '15', color, borderColor: color + '40' }
  }
  return { backgroundColor: '#f3f4f6', color: '#6b7280', borderColor: '#e5e7eb' }
})

const to = computed(() => {
  if (!props.clickable) return null
  if (props.entityId) return { name: 'entity', params: { id: props.entityId } }
  return { name: 'search', query: { q: props.label } }
})
</script>

<template>
  <router-link
    v-if="to"
    :to="to"
    :style="colorStyle"
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border hover:opacity-80 transition-opacity"
  >
    {{ label }}
  </router-link>
  <span
    v-else
    :style="colorStyle"
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border"
  >
    {{ label }}
  </span>
</template>
