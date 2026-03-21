import { createI18n } from 'vue-i18n'
import ko from '@/locales/ko'
import en from '@/locales/en'
import ja from '@/locales/ja'

export type MessageSchema = typeof ko

const urlLang = new URLSearchParams(window.location.search).get('lang')
const savedLang = urlLang || localStorage.getItem('lang') || 'ko'

export const i18n = createI18n<[MessageSchema], 'ko' | 'en' | 'ja'>({
  legacy: false,
  locale: savedLang as 'ko' | 'en' | 'ja',
  fallbackLocale: 'ko',
  messages: { ko, en, ja },
})
