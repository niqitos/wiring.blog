<template>
  <UContainer
    v-if="article"
    class="py-6 relative"
  >
    <UBreadcrumb
      :items="breadcrumbs"
    />

    <UPage>
      <template #left>
        <UPageAside
          v-if="Array.isArray(article.body?.toc?.links) && article.body?.toc?.links.length"
          class="pt-0"
        >
          <UContentToc
            :links="article.body?.toc?.links"
          />

          <!-- <ScriptGoogleAdsense
            :data-ad-client="runtimeConfig.public.googleAdsenseId"
            :data-ad-slot="runtimeConfig.googleAdsensePrivateId"
            data-ad-format="auto"
            data-full-width-responsive="true"
          /> -->
        </UPageAside>
      </template>

      <UPageBody class="wrap-break-word prose dark:prose-invert mx-auto mt-0">
        <UPageHeader
          :title="article.title"
          :description="article.description"
          class="border-none mb-0"
        >
          <template #description>
            <div class="flex grid-4 lg:hidden not-prose mb-4">
              <UUser
                v-for="(author, index) in article.authors"
                :key="`author-${index}`"
                v-bind="author"
              />
            </div>

            <div class="text-sm text-muted">
              <I18nT
                keypath="publishedOn"
                tag="span"
              >
                <time
                  :datetime="article.date"
                  v-text="publishedOn"
                />
              </I18nT>
              •
              <span
                v-text="$t('readingTime', Number(article.readingTime))"
              />
            </div>

            <p
              class="text-default text-base/7"
              v-text="article.description"
            />
          </template>

          <NuxtImg
            v-if="article.image"
            :src="String(article.image)"
            :alt="article.title"
            class="rounded-lg"
          />
        </UPageHeader>

        <UContentToc
          :links="article.body?.toc?.links"
          :ui="{
            root: 'lg:hidden not-prose !static'
          }"
        />

        <ContentRenderer :value="article" />

        <footer class="mt-8 not-prose">
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

        <ImageModal />
      </UPageBody>

      <template #right>
        <div class="space-y-2 py-8 hidden lg:block">
          <UUser
            v-for="(author, index) in article.authors"
            :key="`author-${index}`"
            v-bind="author"
          />
        </div>
      </template>
    </UPage>
  </UContainer>

  <UError
    v-else
    class="h-[calc(100dvh-var(--ui-header-height))]"
    :error="{
      statusCode: 404,
      statusMessage: $t('error.404'),
      message: $t('error.404')
    }"
    :ui="{
      root: 'p-4',
    }"
  />
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@nuxt/ui'
import type { LocaleObject } from '@nuxtjs/i18n'
import { useDateFormat } from '@vueuse/core'

const { t, locale, locales, defaultLocale } = useI18n()
// const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()

const { data: article } = await useAsyncData(() => queryCollection(`content_${locale.value}`)
  .select('path', 'image', 'title', 'description', 'body', 'date', 'tags', 'authors', 'readingTime', 'seo')
  .path(`${locale.value !== defaultLocale ? `/${locale.value}` : ''}/${route.params.article}`)
  .path(route.path)
  .where('published', '=', true)
  .first()
)

const alternate = computed(() => {
  const alternate = {}

  if (article.value?.seo?.alternate && Array.isArray(article.value?.seo.alternate)) {
    article.value?.seo.alternate.forEach((item: any) => {
      const key = Object.keys(item)[0]

      if (typeof key === 'string' && locales.value.find((l: LocaleObject) => l.code === key)) {
        Object.assign(alternate, {
          [key]: {
            article: item[key]
          }
        })
      }
    })
  }

  return alternate
})

const breadcrumbs = ref<BreadcrumbItem[]>([
  {
    label: t('home.title'),
    icon: 'i-lucide:house',
    to: localePath('index')
  }
])

const publishedOn = ref(useDateFormat(article.value?.date, 'D MMM YYYY', { locales: locale.value }))

setI18nParams(alternate.value)

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
