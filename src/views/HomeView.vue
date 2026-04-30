<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDataStore } from '@/stores/useDataStore'
import SearchBar from '@/components/SearchBar.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'

const router = useRouter()
const route = useRoute()
const store = useDataStore()
const { t } = useI18n()
const searchQuery = ref('')

function handleSearch(q: string) {
  if (q.trim()) {
    const langQuery = route.query.lang ? { lang: route.query.lang } : {}
    router.push({ name: 'search', query: { ...langQuery, q } })
  }
}

type QuickLink = { label: string; query?: string; filter?: string; route?: string; entityId?: string }

const quickLinks = computed((): QuickLink[] => [
  { label: t('home.quickLinks.career'), route: 'timeline' },
  { label: t('home.quickLinks.projects'), route: 'projectList' },
  { label: t('home.quickLinks.techStack'), filter: 'skill' },
  { label: t('home.quickLinks.tags'), route: 'tagList' },
  { label: t('home.quickLinks.performance'), entityId: 'tag-performance' },
  { label: t('home.quickLinks.gameServer'), entityId: 'tag-gameserver' },
])

function handleQuickLink(link: QuickLink) {
  const langQuery = route.query.lang ? { lang: route.query.lang } : {}
  if (link.route) {
    router.push({ name: link.route, query: langQuery })
  } else if (link.entityId) {
    router.push({ name: 'entity', params: { id: link.entityId }, query: langQuery })
  } else if (link.filter) {
    router.push({ name: 'search', query: { ...langQuery, filter: link.filter } })
  } else if (link.query) {
    router.push({ name: 'search', query: { ...langQuery, q: link.query } })
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-4">
    <!-- Lang Switcher top-right -->
    <div class="absolute top-4 right-4">
      <LangSwitcher />
    </div>

    <div class="w-full max-w-2xl flex flex-col items-center gap-8">

      <!-- Logo -->
      <div class="text-center">
        <h1 class="text-6xl font-bold tracking-tight mb-2 text-gray-900">
          {{ store.person.name }}
        </h1>
        <p class="text-gray-500 text-lg">{{ t('title') }}</p>
      </div>

      <!-- Search Bar -->
      <div class="w-full">
        <SearchBar
          v-model="searchQuery"
          @search="handleSearch"
          large
          autofocus
        />
      </div>

      <!-- Quick Links -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="link in quickLinks"
          :key="link.label"
          @click="handleQuickLink(link)"
          class="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 transition-colors"
        >
          {{ link.label }}
        </button>
        <router-link
          :to="{ name: 'graph', query: route.query.lang ? { lang: route.query.lang } : {} }"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm transition-colors"
        >
          {{ t('home.quickLinks.graph') }}
        </router-link>
      </div>

      <!-- Stats -->
      <div class="flex gap-8 text-center">
        <div>
          <div class="text-3xl font-bold text-gray-900">{{ t('home.stats.yearsValue', { n: store.stats.yearsOfExperience }) }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ t('home.stats.experience') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-gray-900">{{ store.stats.companiesCount }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ t('home.stats.companies') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-gray-900">{{ store.stats.projectsCount }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ t('home.stats.projects') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-gray-900">{{ store.stats.skillsCount }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ t('home.stats.skills') }}</div>
        </div>
      </div>

      <!-- Highlights -->
      <div class="w-full border-t border-gray-100 pt-6">
        <h2 class="text-sm font-medium text-gray-500 mb-3">{{ t('home.highlights') }}</h2>
        <ul class="space-y-2">
          <li
            v-for="highlight in store.person.highlights"
            :key="highlight"
            class="flex items-start gap-2 text-sm text-gray-700"
          >
            <span class="text-gray-400 mt-0.5">▸</span>
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
