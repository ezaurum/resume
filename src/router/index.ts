import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import EntityView from '@/views/EntityView.vue'
import GraphView from '@/views/GraphView.vue'
import TimelineView from '@/views/TimelineView.vue'
import { i18n } from '@/i18n'

const VALID_LANGS = ['ko', 'en', 'ja'] as const
type Lang = typeof VALID_LANGS[number]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/search', name: 'search', component: SearchView },
    { path: '/timeline', name: 'timeline', component: TimelineView },
    { path: '/entity/:id', name: 'entity', component: EntityView },
    { path: '/graph', name: 'graph', component: GraphView }
  ]
})

router.beforeEach((to, from) => {
  const lang = to.query.lang as string | undefined

  // If lang is missing in the destination, carry it over from the source
  if (!lang) {
    const fallback = (from.query.lang as string) || localStorage.getItem('lang') || 'ko'
    return { ...to, query: { ...to.query, lang: fallback } }
  }

  // Sync locale when lang query param changes
  if (VALID_LANGS.includes(lang as Lang)) {
    i18n.global.locale.value = lang as Lang
    localStorage.setItem('lang', lang)
  }
})

export default router
