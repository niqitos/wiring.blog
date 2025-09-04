<template>
  <UContainer class="py-6">
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-4"
    />

    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('about.title')"
    />
  </UContainer>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: t('home.title'),
    icon: 'i-lucide:house',
    to: localePath('index')
  }
])

useSeoMeta({
  title: t('about.title'),
  description: t('about.description')
})
</script>
