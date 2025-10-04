<template>
  <UApp>
    <AppHeader />

    <UError
      :error="error"
      :clear="{
        label: $t('error.back'),
        color: 'primary',
        size: 'lg',
        variant: 'solid'
      }"
      :ui="{
        root: 'p-4'
      }"
    />

    <img
      v-if="errorImage"
      :src="errorImage"
      :alt="props.error.message"
      class="size-48 sm:size-64 absolute bottom-0 right-[calc(50%-6rem)] sm:right-[calc(50%-8rem)]"
    >

    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { locale } = useI18n()

const props = defineProps<{
  error: NuxtError
}>()

const errorImage = computed(() => {
  if (props.error && props.error.statusCode) {
    if (props.error.statusCode >= 400 && props.error.statusCode < 500) {
      return '/404.webp'
    } else if (props.error.statusCode >= 500 && props.error.statusCode < 600) {
      return '/500.webp'
    }
  }

  return ''
})

useHead({
  htmlAttrs: {
    lang: locale.value
  }
})

useSeoMeta({
  title: props.error.statusMessage,
  description: props.error.message
})
</script>
