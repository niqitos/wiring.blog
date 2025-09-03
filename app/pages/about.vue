<template>
  <UContainer class="py-6">
    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('about.title')"
    />
  </UContainer>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useSeoMeta({
  title: t('about.title'),
  description: t('about.description')
})
</script>
