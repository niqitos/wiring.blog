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
          :ui="{
            root: '!pr-0'
          }"
        >
          <UContentNavigation
            highlight
            :navigation="navigation?.map(item => ({
              ...item,
              children: item.children?.map(child => ({ ...child, icon: undefined }))
            }))"
            :type="'single'"
            :default-open="true"
          />
        </UPageAside>
      </template>

      <UPageBody
        id="article"
        class="mx-auto mt-0 select-none"
      >
        <UPageHeader
          :title="article.title"
          :description="article.description"
          :headline="headline"
          class="border-none mb-0"
          :ui="{
            root: 'pb-0',
            description: 'space-y-4 mb-4'
          }"
        >
          <template #description>
            <div class="flex grid-4 lg:hidden">
              <UUser
                v-for="(author, index) in article.authors"
                :key="`author-${index}`"
                v-bind="author"
              />
            </div>

            <div class="text-sm text-muted lg:hidden">
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

            <div
              v-if="article.audio || (article.links && Array.isArray(article.links))"
              class="flex gap-4 flex-wrap-reverse justify-between"
            >
              <PageHeaderAudio
                v-if="article.audio"
                :src="article.audio"
              />

              <PageHeaderResources
                v-if="article.links && Array.isArray(article.links)"
                :items="article.links"
              />
            </div>

            <p
              class="text-default text-base/7"
              v-text="article.description"
            />
          </template>

          <template #links>
            <PageHeaderLinks />
          </template>

          <NuxtImg
            v-if="article.image"
            :src="String(article.image)"
            :alt="article.title"
            class="rounded-lg"
          />
        </UPageHeader>

        <ContentRenderer
          id="content"
          :value="article"
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

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />

        <ImageModal />
      </UPageBody>

      <template #right>
        <UContentToc
          :links="article.body?.toc?.links"
          :ui="{
            bottom: 'gap-2'
          }"
        >
          <template #bottom>
            <USeparator
              type="dashed"
              class="mb-4"
            />

            <p
              class="font-bold"
              v-text="$t('article.authors.title', article?.authors?.length || 1)"
            />

            <div class="space-y-4 hidden lg:block">
              <UUser
                v-for="(author, index) in article.authors"
                :key="`author-${index}`"
                v-bind="author"
              />

              <USeparator
                type="dashed"
                class="my-6"
              />

              <I18nT
                keypath="publishedOn"
                tag="div"
                class="text-xs text-muted"
              >
                <time
                  :datetime="article.date"
                  class="text-default"
                  v-text="publishedOn"
                />
              </I18nT>

              <div
                class="text-xs"
                v-text="$t('readingTime', Number(article.readingTime))"
              />
            </div>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>

<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'
import type { BreadcrumbItem } from '@nuxt/ui'
import type { LocaleObject } from '@nuxtjs/i18n'
import { findPageHeadline } from '@nuxt/content/utils'

const { t, locale, locales } = useI18n()
// const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()

const { data: article } = await useAsyncData(`${route.path}`, () => queryCollection(`content_${locale.value}`)
  .select('path', 'image', 'audio', 'links', 'title', 'description', 'body', 'date', 'tags', 'authors', 'readingTime', 'seo')
  .where('extension', '=', 'md')
  .where('_draft', '=', false)
  .path(route.path)
  .first()
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: $t('error.404'),
    fatal: true
  })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryCollectionItemSurroundings(`content_${locale.value}`, route.path, {
  fields: ['description']
})
  .where('extension', '=', 'md')
  .where('_draft', '=', false)
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

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

const title = article.value?.seo?.title || article.value?.title
const description = article.value?.seo?.description || article.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const headline = computed(() => findPageHeadline(navigation?.value, article.value?.path))
</script>
