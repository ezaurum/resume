<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Entity, Company, Project, Skill, Tag } from '@/types'
import { ENTITY_COLORS } from '@/types'
import { useDataStore } from '@/stores/useDataStore'
import TagBadge from './TagBadge.vue'

const props = defineProps<{
  entity: Entity
  compact?: boolean
}>()

const store = useDataStore()
const { t } = useI18n()

const typeColor = computed(() => ENTITY_COLORS[props.entity.type])
const typeLabel = computed(() => t(`entity.types.${props.entity.type}`))

const description = computed(() => {
  const e = props.entity
  if (e.type === 'company') return (e as Company).description
  if (e.type === 'project') return (e as Project).description
  if (e.type === 'skill') return (e as Skill).description
  if (e.type === 'tag') return (e as Tag).description
  return ''
})

const subInfo = computed(() => {
  const e = props.entity
  if (e.type === 'company') return `${(e as Company).role} | ${(e as Company).period}`
  if (e.type === 'project') return `${(e as Project).projectType}${(e as Project).period ? ' | ' + (e as Project).period : ''}`
  if (e.type === 'skill') return `${(e as Skill).category} · ${(e as Skill).level}`
  return ''
})

const tags = computed(() => {
  const e = props.entity
  if ('tags' in e) return (e.tags as string[]).slice(0, 4)
  return []
})

const skills = computed(() => {
  const e = props.entity
  if ('skills' in e) return (e.skills as string[]).slice(0, 4)
  return []
})

function getTagName(id: string): string {
  return store.tags.find(tg => tg.id === id)?.name ?? id
}

function getSkillName(id: string): string {
  return store.skills.find(s => s.id === id)?.name ?? id
}

// suppress unused warning
void typeColor.value
</script>

<template>
  <router-link
    :to="{ name: 'entity', params: { id: entity.id } }"
    class="block hover:bg-gray-50 transition-colors rounded-lg p-4 border border-transparent hover:border-gray-100 no-underline"
  >
    <!-- Path -->
    <div class="text-xs text-google-green mb-1">
      {{ t('breadcrumb', { type: typeLabel, name: entity.name }) }}
    </div>

    <!-- Title -->
    <h3 class="text-google-blue hover:underline text-lg font-medium mb-1">
      {{ entity.name }}
    </h3>

    <!-- Sub Info -->
    <div v-if="subInfo" class="text-xs text-google-gray mb-2">
      {{ subInfo }}
    </div>

    <!-- Description -->
    <p v-if="description && !compact" class="text-sm text-gray-700 mb-3 line-clamp-2">
      {{ description }}
    </p>

    <!-- Badges -->
    <div v-if="!compact" class="flex flex-wrap gap-1">
      <TagBadge
        v-for="skillId in skills"
        :key="skillId"
        :label="getSkillName(skillId)"
        type="skill"
        :entity-id="skillId"
        clickable
      />
      <TagBadge
        v-for="tagId in tags"
        :key="tagId"
        :label="getTagName(tagId)"
        type="tag"
        :entity-id="tagId"
        clickable
      />
    </div>
  </router-link>
</template>
