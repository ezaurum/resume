<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue?: string
  large?: boolean
  autofocus?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [query: string]
}>()

const router = useRouter()
const { t } = useI18n()
const inputRef = ref<HTMLInputElement>()
const localValue = ref(props.modelValue || '')

watch(() => props.modelValue, (val) => {
  localValue.value = val || ''
})

function handleInput() {
  emit('update:modelValue', localValue.value)
}

function handleSearch() {
  if (localValue.value.trim()) {
    emit('search', localValue.value)
    router.push({ name: 'search', query: { q: localValue.value } })
  }
}

function clear() {
  localValue.value = ''
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>

<template>
  <div :class="['google-search-bar', large ? 'max-w-2xl py-4 px-6' : 'max-w-xl py-3 px-4']">
    <svg
      :class="['text-gray-400 mr-3 shrink-0', large ? 'w-5 h-5' : 'w-4 h-4']"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <input
      ref="inputRef"
      v-model="localValue"
      @input="handleInput"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="large ? t('search.placeholderLarge') : t('search.placeholder')"
      :autofocus="autofocus"
      :class="['flex-1 outline-none bg-transparent text-gray-800', large ? 'text-base' : 'text-sm']"
    />
    <button v-if="localValue" @click="clear" class="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
      <svg :class="large ? 'w-5 h-5' : 'w-4 h-4'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <button
      @click="handleSearch"
      :class="['ml-3 px-4 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-700 transition-colors shrink-0', large ? 'py-2' : 'py-1']"
    >
      {{ t('search.button') }}
    </button>
  </div>
</template>
