<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()

const langs = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
]

// 칩 하나만 보이고, 누르면 나머지 언어가 아래로 펼쳐진다 (좁은 화면에서 자리를 덜 차지하게).
const open = ref(false)
const root = ref<HTMLElement>()
const current = computed(() => langs.find(l => l.code === locale.value) ?? langs[0])

function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="root" class="relative shrink-0">
    <button
      type="button"
      @click="open = !open"
      :aria-expanded="open"
      aria-haspopup="true"
      class="flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-900 text-white whitespace-nowrap"
    >
      {{ current.label }}
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div
      v-if="open"
      class="absolute right-0 mt-1 z-50 bg-white border border-gray-200 rounded shadow-lg py-1 min-w-full"
    >
      <router-link
        v-for="lang in langs"
        :key="lang.code"
        :to="{ ...route, query: { ...route.query, lang: lang.code } }"
        replace
        @click="open = false"
        :class="[
          'block px-3 py-1.5 text-xs whitespace-nowrap transition-colors',
          locale === lang.code ? 'text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
        ]"
      >
        {{ lang.label }}
      </router-link>
    </div>
  </div>
</template>
