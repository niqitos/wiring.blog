<template>
  <UContainer class="py-6">
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-5"
    />

    <div
      v-if="article"
      class="grid grid-cols-12 gap-8"
    >
      <aside class="hidden md:block md:col-span-4 lg:col-span-3 xl:col-span-3 mt-3">
        <div
          v-if="Array.isArray(article.body?.toc) && article.body?.toc.length"
          class="sticky top-4"
        >
          <p
            class="text-lg font-bold mb-5"
            v-text="$t('toc')"
          />

          <TableOfContents
            :article="article"
          />
        </div>
      </aside>

      <article class="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 wrap-break-word">
        <header class="space-y-5 mb-5 prose dark:prose-invert">
          <h1 v-text="article.title" />

          <NuxtImg
            v-if="article.cover"
            :src="String(article.cover)"
          />

          <p v-text="article.description" />

          <AuthorCloud
            :article="article"
          />

          <UCollapsible
            v-if="Array.isArray(article.body?.toc) && article.body?.toc.length"
            :ui="{
              root: 'md:hidden',
              content: 'mt-5'
            }"
          >
            <UButton
              :label="$t('toc')"
              color="neutral"
              variant="soft"
              trailing-icon="i-lucide:chevron-down"
              block
            />

            <template #content>
              <TableOfContents
                :article="article"
              />
            </template>
          </UCollapsible>
        </header>

        <ContentRenderer
          v-if="article"
          :value="article"
          class="prose dark:prose-invert"
        />

        <footer class="mt-8">
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="tag in article.tags"
              :key="tag"
              :to="localePath({
                name: 'index',
                query: { tag }
              })"
              color="primary"
              variant="subtle"
              :label="tag"
            />
          </div>
        </footer>
      </article>
    </div>

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

const { t, locale, defaultLocale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const { data: article } = await useAsyncData(() => queryCollection(`content_${locale.value}`)
  .select('path', 'cover', 'title', 'description', 'body', 'date', 'tags', 'authors', 'readingTime')
  .path(`${locale.value !== defaultLocale ? `/${locale.value}` : ''}/${route.params.article}`)
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

useHead({
  htmlAttrs: {
    class: 'scroll-smooth'
  }
})

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description
})
</script>
