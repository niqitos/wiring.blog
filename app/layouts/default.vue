<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />

    <CookieConsent />
  </UApp>
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>
