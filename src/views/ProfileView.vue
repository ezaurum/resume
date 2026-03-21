<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import TagBadge from '@/components/TagBadge.vue'
import type { Skill } from '@/types'

const store = useDataStore()
const { t } = useI18n()

const person = computed(() => store.person)

const skillsByCategory = computed(() => {
  const order = ['language', 'framework', 'database', 'infrastructure', 'protocol']
  const grouped = new Map<string, Skill[]>()
  for (const id of person.value.skills) {
    const skill = store.skills.find(s => s.id === id)
    if (!skill) continue
    if (!grouped.has(skill.category)) grouped.set(skill.category, [])
    grouped.get(skill.category)!.push(skill)
  }
  return order
    .filter(cat => grouped.has(cat))
    .map(cat => ({ category: cat, skills: grouped.get(cat)! }))
})

function getTagName(id: string) {
  return store.tags.find(t => t.id === id)?.name ?? id
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-4xl mx-auto px-4 py-10">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-1">{{ person.name }}</h1>
        <p class="text-xl text-gray-500 mb-4">{{ person.title }}</p>
        <p class="text-gray-700 leading-relaxed max-w-2xl">{{ person.summary }}</p>
      </div>

      <!-- Stats -->
      <div class="flex gap-8 py-6 border-y border-gray-100 mb-10">
        <div>
          <div class="text-2xl font-bold text-gray-900">{{ t('home.stats.yearsValue', { n: store.stats.yearsOfExperience }) }}</div>
          <div class="text-xs text-gray-500 mt-0.5">{{ t('home.stats.experience') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-gray-900">{{ store.stats.companiesCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">{{ t('home.stats.companies') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-gray-900">{{ store.stats.projectsCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">{{ t('home.stats.projects') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-gray-900">{{ store.stats.skillsCount }}</div>
          <div class="text-xs text-gray-500 mt-0.5">{{ t('home.stats.skills') }}</div>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-10">

        <!-- Main -->
        <div class="md:col-span-2 space-y-8">

          <section>
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('entity.highlights') }}</h2>
            <ul class="space-y-2">
              <li v-for="h in person.highlights" :key="h" class="flex items-start gap-2 text-sm text-gray-700">
                <span class="text-gray-400 mt-0.5 shrink-0">▸</span>{{ h }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('entity.education') }}</h2>
            <div class="space-y-2">
              <div v-for="edu in person.education" :key="edu.school" class="text-sm text-gray-700">
                {{ edu.school }} · {{ edu.major }} · {{ edu.degree }}
              </div>
              <div v-for="cert in person.certifications" :key="cert" class="flex items-center gap-2 text-sm text-gray-700">
                <span class="text-gray-300 shrink-0">▸</span>{{ cert }}
              </div>
            </div>
          </section>

        </div>

        <!-- Sidebar -->
        <div class="space-y-6">

          <section>
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('entity.strengths') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="s in person.strengths" :key="s"
                class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >{{ s }}</span>
            </div>
          </section>

          <section v-for="group in skillsByCategory" :key="group.category">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {{ t(`skill.categories.${group.category}`) }}
            </h3>
            <div class="flex flex-wrap gap-1.5">
              <TagBadge
                v-for="skill in group.skills" :key="skill.id"
                :label="skill.name"
                type="skill"
                :entity-id="skill.id"
                clickable
              />
            </div>
          </section>

          <section>
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('entity.tags') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <TagBadge
                v-for="tagId in person.tags" :key="tagId"
                :label="getTagName(tagId)"
                type="tag"
                :entity-id="tagId"
                clickable
              />
            </div>
          </section>

          <div class="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <router-link to="/timeline" class="text-sm text-gray-500 hover:text-gray-800 transition-colors">→ {{ t('nav.timeline') }}</router-link>
            <router-link to="/projects" class="text-sm text-gray-500 hover:text-gray-800 transition-colors">→ {{ t('nav.projects') }}</router-link>
            <router-link to="/graph" class="text-sm text-gray-500 hover:text-gray-800 transition-colors">→ {{ t('nav.graph') }}</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
