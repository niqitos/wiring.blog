<template>
  <UContainer class="py-6">
    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('index.title')"
    />

    <div class="grid md:grid-cols-2 gap-6">
      <GridArticle
        v-for="(article, index) in articles"
        :key="`article-${index}`"
        :article="article"
      />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const { data: articles } = await useAsyncData(() => queryCollection('content')
  .limit(12)
  .all()
)

useSeoMeta({
  title: t('index.title'),
  description: t('index.description')
})
</script>
