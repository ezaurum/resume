<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()

const langs = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
]
</script>

<template>
  <div class="flex items-center gap-0.5">
    <router-link
      v-for="lang in langs"
      :key="lang.code"
      :to="{ ...route, query: { ...route.query, lang: lang.code } }"
      replace
      :class="[
        'px-2 py-1 text-xs rounded transition-colors',
        locale === lang.code
          ? 'bg-gray-900 text-white'
          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
      ]"
    >
      {{ lang.label }}
    </router-link>
  </div>
</template>
