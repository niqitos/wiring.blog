<script setup lang="ts">
import type { NuxtError } from '#app'
const { locale } = useI18n()

const props = defineProps<{
  error: NuxtError
}>()

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
    />

    <AppFooter />
  </UApp>
</template>
