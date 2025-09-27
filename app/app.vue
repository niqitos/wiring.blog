<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />

    <AppHeader />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :links="links"
        :navigation="navigation"
      />

      <CookieConsent />
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { t, locale, defaultLocale } = useI18n()

const { data: navigation } = await useAsyncData(`content_${locale.value}_navigation`, () => queryCollectionNavigation(`content_${locale.value}`))

if (locale.value !== defaultLocale && navigation.value?.length && navigation.value[0]?.children) {
  navigation.value = navigation.value[0]?.children
}

const { data: files } = useLazyAsyncData(`search_${locale.value}`, () => queryCollectionSearchSections(`content_${locale.value}`), {
  server: false
})

const links = [
  {
    label: t('about.title'),
    icon: 'i-lucide:presentation',
    to: '/about'
  }
]

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark'
  ? useCssVar('--ui-color-neutral-900').value
  : useCssVar('--ui-color-white').value
)

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  meta: [
    {
      name: 'theme-color',
      content: color
    }
  ]
})

useSeoMeta({
  titleTemplate: `%s - Docs`,
  ogSiteName: 'Docs',
  twitterCard: 'summary_large_image'
})

provide('navigation', navigation)
provide('files', files)
</script>
