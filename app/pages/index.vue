<template>
  <UContainer class="py-6">
    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('index.title')"
    />

    <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
  .select('path', 'cover', 'title', 'description', 'date', 'tags', 'authors')
  .limit(12)
  .all()
)

useSeoMeta({
  title: t('index.title'),
  description: t('index.description')
})
</script>
