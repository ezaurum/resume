<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import type { Company, Project, Skill, Tag, Person } from '@/types'
import { ENTITY_COLORS } from '@/types'
import TagBadge from '@/components/TagBadge.vue'
import EntityCard from '@/components/EntityCard.vue'

const route = useRoute()
const router = useRouter()
const store = useDataStore()
const { t } = useI18n()

const entity = computed(() => store.getEntityById(route.params.id as string))
const relatedEntities = computed(() => store.getRelatedEntities(route.params.id as string))

const typeColor = computed(() => entity.value ? ENTITY_COLORS[entity.value.type] : '#ccc')
const typeLabel = computed(() => entity.value ? t(`entity.types.${entity.value.type}`) : '')

const asCompany = computed(() => entity.value?.type === 'company' ? entity.value as Company : null)
const asProject = computed(() => entity.value?.type === 'project' ? entity.value as Project : null)
const asSkill = computed(() => entity.value?.type === 'skill' ? entity.value as Skill : null)
const asTag = computed(() => entity.value?.type === 'tag' ? entity.value as Tag : null)
const asPerson = computed(() => entity.value?.type === 'person' ? entity.value as Person : null)

function getTagName(id: string): string {
  return store.tags.find(tg => tg.id === id)?.name ?? id
}
function getSkillName(id: string): string {
  return store.skills.find(s => s.id === id)?.name ?? id
}
function getCompanyName(id: string): string {
  return store.companies.find(c => c.id === id)?.name ?? id
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div v-if="entity" class="max-w-4xl mx-auto px-4 py-8">

      <!-- Back Button -->
      <button @click="router.back()" class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        {{ t('entity.back') }}
      </button>

      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-3 py-1 rounded-full text-xs font-medium text-white" :style="{ backgroundColor: typeColor }">
            {{ typeLabel }}
          </span>
          <span v-if="asCompany" class="text-sm text-gray-500">{{ asCompany.period }}</span>
          <span v-if="asProject?.period" class="text-sm text-gray-500">{{ asProject.period }}</span>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ entity.name }}</h1>

        <div v-if="asCompany" class="text-gray-500 font-medium">{{ asCompany.role }}</div>
        <div v-if="asProject" class="text-gray-500 font-medium">
          {{ asProject.projectType }}
          <span v-if="asProject.company"> · {{ getCompanyName(asProject.company) }}</span>
        </div>
        <div v-if="asSkill" class="text-gray-500 font-medium">{{ asSkill.category }} · {{ asSkill.level }}</div>
        <div v-if="asPerson" class="text-gray-500 font-medium">
          {{ asPerson.title }} · {{ t('entity.yearsExp', { n: asPerson.yearsOfExperience }) }}
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="md:col-span-2 space-y-6">
          <section>
            <p class="text-gray-700 leading-relaxed">
              {{ asCompany?.description || asProject?.description || asSkill?.description || asTag?.description || asPerson?.summary }}
            </p>
          </section>

          <section v-if="asPerson">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('entity.highlights') }}</h2>
            <ul class="space-y-2">
              <li v-for="h in asPerson.highlights" :key="h" class="flex items-start gap-2 text-sm text-gray-700">
                <span class="text-gray-400 mt-0.5">▸</span> {{ h }}
              </li>
            </ul>
          </section>

          <section v-if="(asCompany?.achievements || asProject?.achievements)?.length">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('entity.achievements') }}</h2>
            <ul class="space-y-2">
              <li
                v-for="achievement in asCompany?.achievements || asProject?.achievements"
                :key="achievement"
                class="flex items-start gap-2 text-sm text-gray-700"
              >
                <span class="text-gray-400 mt-0.5">▸</span>
                {{ achievement }}
              </li>
            </ul>
          </section>

          <section v-if="asPerson">
            <h2 class="text-lg font-semibold text-gray-900 mb-3">{{ t('entity.education') }}</h2>
            <div class="space-y-2">
              <div v-for="edu in asPerson.education" :key="edu.school" class="text-sm text-gray-700">
                {{ edu.school }} · {{ edu.major }} · {{ edu.degree }}
              </div>
              <div v-for="cert in asPerson.certifications" :key="cert" class="text-sm text-gray-700">
                {{ cert }}
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <section v-if="(asCompany?.skills || asProject?.skills || asPerson?.skills)?.length">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('entity.techStack') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <TagBadge
                v-for="skillId in (asCompany?.skills || asProject?.skills || asPerson?.skills)"
                :key="skillId"
                :label="getSkillName(skillId)"
                type="skill"
                :entity-id="skillId"
                clickable
              />
            </div>
          </section>

          <section v-if="(asCompany?.tags || asProject?.tags || asPerson?.tags)?.length">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('entity.tags') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <TagBadge
                v-for="tagId in (asCompany?.tags || asProject?.tags || asPerson?.tags)"
                :key="tagId"
                :label="getTagName(tagId)"
                type="tag"
                :entity-id="tagId"
                clickable
              />
            </div>
          </section>

          <section v-if="asPerson?.strengths">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ t('entity.strengths') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="s in asPerson.strengths"
                :key="s"
                class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >{{ s }}</span>
            </div>
          </section>

          <router-link to="/graph" class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/>
              <circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/>
              <line x1="6" y1="7" x2="10" y2="10"/><line x1="14" y1="10" x2="18" y2="7"/>
              <line x1="6" y1="17" x2="10" y2="14"/><line x1="14" y1="14" x2="18" y2="17"/>
            </svg>
            {{ t('entity.viewInGraph') }}
          </router-link>
        </div>
      </div>

      <section v-if="relatedEntities.length" class="mt-12 border-t border-gray-100 pt-8">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ t('entity.related') }}</h2>
        <div class="grid sm:grid-cols-2 gap-2">
          <EntityCard v-for="related in relatedEntities" :key="related.id" :entity="related" compact />
        </div>
      </section>
    </div>

    <!-- Not Found -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-xl text-gray-500">{{ t('entity.notFound') }}</p>
        <router-link to="/" class="mt-4 inline-block text-gray-600 hover:underline">{{ t('entity.goHome') }}</router-link>
      </div>
    </div>
  </div>
</template>
