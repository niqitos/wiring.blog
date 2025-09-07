<template>
  <UApp :locale="locales[locale]">
    <AppHeader />

    <NuxtPage />

    <AppFooter />

    <CookieConsent />
  </UApp>
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>
