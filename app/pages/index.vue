<template>
  <UContainer class="py-6">
    <h1
      class="text-3xl font-bold mb-8"
      v-text="$t('index.title')"
    />

    <TagCloud />

    <UBlogPosts class="gap-4 lg:gap-y-4">
      <UBlogPost
        v-for="(post, index) in articles"
        :key="index"
        :to="post.path"
        v-bind="post"
        :ui="{
          image: 'pt-4 px-4'
        }"
      >
        <template #badge>
          <UBadge
            v-for="(postTag, postTagIndex) in post.tags"
            :key="postTagIndex"
            variant="subtle"
            :label="postTag"
            color="primary"
          />
        </template>
      </UBlogPost>
    </UBlogPosts>

    <UPagination
      v-if="total && total > itemsPerPage"
      v-model:page="page"
      :total="total"
      :items-per-page="itemsPerPage"
      :ui="{
        root: 'flex justify-center mt-4'
      }"
    />
  </UContainer>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const route = useRoute()

const page = ref<number>(1)
const itemsPerPage = ref<number>(12)

const tag = computed(() => route.query.tag || '')

const { data: total } = await useAsyncData(() => {
  const query = queryCollection(`content_${locale.value}`)
    .where('extension', '=', 'md')

  if (tag.value) {
    query.where('tags', 'LIKE', `%"${tag.value}"%`)
  }

  return query.count()
},
{
  watch: [tag]
})

const { data: articles } = await useAsyncData(() => {
  const query = queryCollection(`content_${locale.value}`)
    .select('path', 'image', 'title', 'description', 'date', 'tags', 'authors')
    .where('extension', '=', 'md')

  if (tag.value) {
    query.where('tags', 'LIKE', `%"${tag.value}"%`)
  }

  if (page.value > 1) {
    query.skip(itemsPerPage.value)
  }

  return query.limit(itemsPerPage.value).order('date', 'DESC').all()
},
{
  watch: [tag, page]
})

useSeoMeta({
  title: t('index.title'),
  description: t('index.description')
})
</script>
