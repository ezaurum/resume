<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import LangSwitcher from '@/components/LangSwitcher.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const searchQuery = ref('')

function handleSearch(q: string) {
  if (q.trim()) {
    router.push({ name: 'search', query: { q } })
  }
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <header v-if="route.name !== 'home'" class="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
    <div class="max-w-6xl mx-auto flex items-center gap-6">
      <!-- Mini Logo -->
      <button @click="goHome" class="text-xl font-bold shrink-0 hover:opacity-70 transition-opacity text-gray-900">
        조석규
      </button>

      <!-- Search Bar -->
      <div class="flex-1 max-w-xl">
        <div class="google-search-bar">
          <svg class="w-4 h-4 text-gray-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch(searchQuery)"
            type="text"
            :placeholder="t('search.placeholder')"
            class="flex-1 outline-none text-sm text-gray-800 bg-transparent"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="ml-2 text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Nav Links -->
      <nav class="hidden md:flex items-center gap-4 text-sm text-gray-600">
        <router-link :to="{ name: 'timeline' }" class="hover:text-gray-900 transition-colors">{{ t('nav.timeline') }}</router-link>
        <router-link :to="{ name: 'projectList' }" class="hover:text-gray-900 transition-colors">{{ t('nav.projects') }}</router-link>
        <router-link :to="{ name: 'tagList' }" class="hover:text-gray-900 transition-colors">{{ t('nav.tags') }}</router-link>
        <router-link :to="{ name: 'graph' }" class="hover:text-gray-900 transition-colors">{{ t('nav.graph') }}</router-link>
        <router-link :to="{ name: 'profile' }" class="hover:text-gray-900 transition-colors">{{ t('nav.profile') }}</router-link>
      </nav>

      <LangSwitcher />
    </div>
  </header>

  <router-view />
</template>
