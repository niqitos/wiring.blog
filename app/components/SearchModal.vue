<template>
  <div>
    <UContentSearchButton
      variant="ghost"
      size="lg"
    />

    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation(`content_${locale.value}`)
  .where('published', '=', true)
)
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections(`content_${locale.value}`)
  .where('published', '=', true), {
  server: false
})

const links = [
  {
    label: t('about.title'),
    icon: 'i-lucide:presentation',
    to: '/about'
  }
]

const searchTerm = ref('')
</script>
