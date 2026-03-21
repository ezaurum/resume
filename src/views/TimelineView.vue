<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import { ENTITY_COLORS } from '@/types'
import TagBadge from '@/components/TagBadge.vue'

const store = useDataStore()
const { t } = useI18n()

// 최신순 정렬
const sortedCompanies = computed(() =>
  [...store.companies].sort((a, b) => b.startYear - a.startYear)
)

function getSkillName(id: string): string {
  return store.skills.find(s => s.id === id)?.name ?? id
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-3xl mx-auto px-4 py-10">

      <!-- Header -->
      <div class="mb-10">
        <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Career Timeline</p>
        <h1 class="text-2xl font-bold text-gray-900">{{ t('timeline.title') }}</h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ t('timeline.subtitle', { years: store.stats.yearsOfExperience, count: store.stats.companiesCount }) }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200"></div>

        <div class="space-y-0">
          <div
            v-for="(company, index) in sortedCompanies"
            :key="company.id"
            class="relative pl-10 pb-10"
          >
            <!-- Dot -->
            <div
              class="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-white ring-2"
              :style="{
                backgroundColor: company.endYear === null ? ENTITY_COLORS.company : '#fff',
                ringColor: ENTITY_COLORS.company,
                boxShadow: `0 0 0 2px ${ENTITY_COLORS.company}`
              }"
            ></div>

            <!-- Card -->
            <div class="group">
              <!-- Period -->
              <div class="text-xs text-gray-400 mb-1 font-mono">{{ company.period }}</div>

              <!-- Company name + role -->
              <router-link
                :to="{ name: 'entity', params: { id: company.id } }"
                class="block"
              >
                <div class="flex items-center gap-2 mb-0.5">
                  <h2 class="text-base font-semibold text-gray-900 group-hover:text-google-blue transition-colors">
                    {{ company.name }}
                  </h2>
                  <span
                    v-if="company.endYear === null"
                    class="px-1.5 py-0.5 text-xs rounded-full text-white font-medium"
                    :style="{ backgroundColor: ENTITY_COLORS.company }"
                  >
                    {{ t('timeline.current') }}
                  </span>
                </div>
                <div class="text-sm text-gray-500 mb-2">{{ company.role }}</div>
              </router-link>

              <!-- Description -->
              <p class="text-sm text-gray-600 mb-3 leading-relaxed">
                {{ company.description }}
              </p>

              <!-- Key achievements (top 2) -->
              <ul v-if="company.achievements.length" class="space-y-1 mb-3">
                <li
                  v-for="achievement in company.achievements.slice(0, 2)"
                  :key="achievement"
                  class="flex items-start gap-1.5 text-sm text-gray-600"
                >
                  <span class="text-gray-300 mt-0.5 shrink-0">▸</span>
                  {{ achievement }}
                </li>
              </ul>

              <!-- Skills -->
              <div v-if="company.skills.length" class="flex flex-wrap gap-1">
                <TagBadge
                  v-for="skillId in company.skills"
                  :key="skillId"
                  :label="getSkillName(skillId)"
                  type="skill"
                  :entity-id="skillId"
                  clickable
                />
              </div>
            </div>

            <!-- Connector gap between items (not last) -->
            <div
              v-if="index < sortedCompanies.length - 1"
              class="absolute left-[7px] top-[23px] w-px bg-gray-200"
              :style="{ height: 'calc(100% - 23px)' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
