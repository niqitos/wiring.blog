<template>
  <ClientOnly>
    <Giscus
      id="comments"
      :repo="runtimeConfig.public.giscusRepo"
      :repo-id="runtimeConfig.public.giscusRepoId"
      :category="runtimeConfig.public.giscusCategory"
      :category-id="runtimeConfig.public.giscusCategoryId"
      mapping="pathname"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="colorMode.value === 'light' ? 'light' : 'transparent_dark'"
      :lang="locale"
      loading="lazy"
    />

    <template #fallback>
      <USkeleton class="w-full h-100" />
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import Giscus from '@giscus/vue'

const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
</script>
