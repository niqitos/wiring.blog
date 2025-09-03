<template>
  <UContainer class="py-6">
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-4"
    />

    <article
      v-if="article"
      class="prose prose-lg max-w-3xl mx-auto"
    >
      <header class="space-y-4 mb-8">
        <h1
          class="text-xl sm:text-2xl md:text-3xl font-bold"
          v-text="article.title"
        />

        <NuxtImg
          v-if="article.cover"
          :src="String(article.cover)"
        />

        <p
          class="text-gray-500"
          v-text="article.description"
        />

        <div class="flex gap-4 items-center">
          <UAvatarGroup>
            <UAvatar
              v-for="(author, index) in article.authors"
              :key="`author-avatar-${index}`"
              size="lg"
              :alt="author?.name"
              :src="author?.avatar"
            />
          </UAvatarGroup>

          <div class="text-sm">
            <div class="flex gap-1">
              <span
                v-for="(author, index) in article.authors"
                :key="`author-name-${index}`"
                class="after:content-[','] last:after:content-['']"
                v-text="author?.name"
              />
            </div>

            <div class="flex items-center gap-2 text-gray-400">
              <span v-text="formatDate(String(article.date))" />
              <span v-text="'•'" />
              <span v-text="$t('readingTime', Number(article.readingTime))" />
            </div>
          </div>
        </div>
      </header>

      <ContentRenderer
        v-if="article"
        :value="article"
        class="prose dark:prose-invert"
      />

      <footer class="mt-8">
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            color="primary"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </footer>
    </article>

    <div
      v-else
      class="grid place-items-center min-h-[calc(100dvh-149px)]"
    >
      <h1
        class="text-3xl font-bold"
        v-text="$t('error.404')"
      />

      <NuxtImg
        src="/404.gif"
        class="fixed bottom-0"
      />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { formatDate } = useDate()

const { data: article } = await useAsyncData(() => queryCollection(`content_${locale.value}`)
  .select('path', 'cover', 'title', 'description', 'body', 'date', 'tags', 'authors', 'readingTime')
  .path(`/${route.params.article}`)
  .where('published', '=', true)
  .first()
)

const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: t('home.title'),
    icon: 'i-lucide:house',
    to: localePath('index')
  }
])

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description
})
</script>
