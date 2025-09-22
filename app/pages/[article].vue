<template>
  <UContainer
    v-if="article"
    class="py-6 relative"
  >
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-5"
    />

    <div class="grid grid-cols-12 gap-8">
      <aside
        v-if="Array.isArray(article.body?.toc?.links) && article.body?.toc?.links.length"
        class="hidden md:block md:col-span-4 lg:col-span-3 xl:col-span-3 sticky top-(--ui-header-height)"
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
      </aside>

      <article class="col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 wrap-break-word prose dark:prose-invert">
        <header class="space-y-5 mb-5">
          <h1 v-text="article.title" />

          <NuxtImg
            v-if="article.image"
            :src="String(article.image)"
          />

          <p v-text="article.description" />

          <AuthorCloud
            :article="article"
          />

          <UContentToc
            :links="article.body?.toc?.links"
            :ui="{
              root: 'md:hidden'
            }"
          />
        </header>

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
      </article>
    </div>
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

const { t, locale, locales, defaultLocale } = useI18n()
// const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()

const { data: article } = await useAsyncData(() => queryCollection(`content_${locale.value}`)
  .select('path', 'image', 'title', 'description', 'body', 'date', 'tags', 'authors', 'readingTime', 'seo')
  .path(`${locale.value !== defaultLocale ? `/${locale.value}` : ''}/${route.params.article}`)
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

setI18nParams(alternate.value)

// const i18nHead = useLocaleHead()
// console.log(i18nHead)

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
