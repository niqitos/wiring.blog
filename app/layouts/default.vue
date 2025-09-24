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
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark'
  ? useCssVar('--ui-color-neutral-900').value
  : useCssVar('--ui-color-white').value
)

useHead({
  meta: [
    {
      name: 'theme-color',
      content: color
    }
  ],
  htmlAttrs: {
    lang: locale.value
  }
})
</script>
