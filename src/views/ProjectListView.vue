<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import TagBadge from '@/components/TagBadge.vue'

const store = useDataStore()
const { t } = useI18n()

const sortedProjects = computed(() =>
  [...store.projects].sort((a, b) => {
    const yearA = store.companies.find(c => c.id === a.company)?.startYear ?? 0
    const yearB = store.companies.find(c => c.id === b.company)?.startYear ?? 0
    return yearB - yearA
  })
)

function getCompanyName(id: string | null): string {
  if (!id) return ''
  return store.companies.find(c => c.id === id)?.name ?? id
}

function getSkillName(id: string): string {
  return store.skills.find(s => s.id === id)?.name ?? id
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 py-10">

      <!-- Header -->
      <div class="mb-8">
        <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Projects</p>
        <h1 class="text-2xl font-bold text-gray-900">{{ t('entity.types.project') }}</h1>
        <p class="text-sm text-gray-500 mt-1">{{ t('projects.subtitle', { count: store.stats.projectsCount }) }}</p>
      </div>

      <!-- List -->
      <div class="divide-y divide-gray-100">
        <div v-for="project in sortedProjects" :key="project.id" class="py-7">

          <!-- Meta -->
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <router-link
              v-if="project.company"
              :to="{ name: 'entity', params: { id: project.company } }"
              class="text-xs font-medium text-gray-600 hover:text-google-blue transition-colors"
            >
              {{ getCompanyName(project.company) }}
            </router-link>
            <span v-if="project.period" class="text-xs text-gray-400">· {{ project.period }}</span>
            <span class="ml-auto px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500">{{ project.projectType }}</span>
          </div>

          <!-- Name -->
          <router-link :to="{ name: 'entity', params: { id: project.id } }" class="group block mb-2">
            <h2 class="text-base font-semibold text-gray-900 group-hover:text-google-blue transition-colors">
              {{ project.name }}
            </h2>
          </router-link>

          <!-- Description -->
          <p class="text-sm text-gray-600 mb-3 leading-relaxed">{{ project.description }}</p>

          <!-- Achievements (top 2) -->
          <ul v-if="project.achievements?.length" class="space-y-1 mb-3">
            <li
              v-for="a in project.achievements.slice(0, 2)" :key="a"
              class="flex items-start gap-1.5 text-sm text-gray-600"
            >
              <span class="text-gray-300 mt-0.5 shrink-0">▸</span>{{ a }}
            </li>
          </ul>

          <!-- Skills -->
          <div v-if="project.skills.length" class="flex flex-wrap gap-1">
            <TagBadge
              v-for="skillId in project.skills" :key="skillId"
              :label="getSkillName(skillId)"
              type="skill"
              :entity-id="skillId"
              clickable
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
