<template>
  <UContainer class="py-6">
    <!-- <UBreadcrumb
      :items="breadcrumbs"
      class="mb-4"
    /> -->

    <article
      v-if="page"
      class="prose prose-lg max-w-3xl mx-auto"
    >
      <header class="mb-8">
        <h1
          class="text-4xl font-bold mb-2"
          v-text="page.title"
        />

        <p
          class="text-gray-500"
          v-text="page.description"
        />

        <div class="flex gap-4 items-center mt-4">
          <UAvatarGroup>
            <UAvatar
              v-for="(author, index) in page.meta.authors"
              :key="`author-avatar-${index}`"
              size="lg"
              :alt="author?.name"
              :src="author?.avatar"
            />
          </UAvatarGroup>

          <div class="text-sm">
            <div class="flex gap-1">
              <span
                v-for="(author, index) in page.meta.authors"
                :key="`author-name-${index}`"
                class="after:content-[','] last:after:content-['']"
                v-text="author?.name"
              />
            </div>

            <div class="flex items-center gap-2 text-gray-400">
              <span v-text="formatDate(String(page.meta.date))" />
              <span v-text="'•'" />
              <span v-text="$t('readingTime', Number(page.readingTime))" />
            </div>
          </div>
        </div>
      </header>

      <ContentRenderer :value="page" class="prose dark:prose-invert" />

      <footer class="mt-12">
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in page.meta.tags"
            :key="tag"
            color="primary"
            variant="soft"
          >
            {{ tag }}
          </UBadge>
        </div>
      </footer>
    </article>
    <div v-else>Page not found</div>
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()
const localePath = useLocalePath()
const { formatDate } = useDate()

const { data: page } = await useAsyncData(() => queryCollection('content').path(`/${route.params.article}`).first())

// const breadcrumbs = ref<BreadcrumbItem[]>([
//   {
//     label: 'Home',
//     icon: 'i-lucide-house',
//     to: localePath('index')
//   }
// ])

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>
