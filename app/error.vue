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
      :ui="{
        root: 'p-4'
      }"
    />

    <img
      src="/404.gif"
      :alt="props.error.message"
      class="size-48 sm:size-64 absolute bottom-0 right-[calc(50%-6rem)] sm:right-[calc(50%-8rem)]"
    >

    <AppFooter />
  </UApp>
</template>
