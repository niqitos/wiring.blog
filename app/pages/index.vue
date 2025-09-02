<template>
  <UContainer class="py-6">
    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('index.title')"
    />

    <div class="grid md:grid-cols-2 gap-6">
      <UCard
        v-for="(article, index) in articles"
        :key="`article-${index}`"
        class="hover:shadow-lg transition"
      >
        <UCardHeader>
          <h2 class="text-xl font-semibold">
            <NuxtLink
              :to="article.path"
              class="hover:underline"
            >
              {{ article.title }}
            </NuxtLink>
          </h2>

          <p
            class="text-sm text-gray-500"
            v-text="formatDate(article.meta.date)"
          />
        </UCardHeader>

        <UCardContent>
          <p
            class="text-gray-600"
            v-text="article.description"
          />
        </UCardContent>

        <UCardFooter class="flex flex-wrap gap-2 mt-4">
          <UBadge
            v-for="tag in article.meta.tags"
            :key="tag"
            color="primary"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </UCardFooter>
      </UCard>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { formatDate } = useDate()

const { data: articles } = await useAsyncData(() => queryCollection('content')
  .limit(12)
  .all()
)

useSeoMeta({
  title: t('index.title'),
  description: t('index.description')
})
</script>
