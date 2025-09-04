<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <UBadge
      variant="subtle"
      :label="$t('tags.all')"
      :color="activeTag ? 'neutral' : 'primary'"
      :ui="{
        base: 'cursor-pointer'
      }"
      @click="selectTag('')"
    />

    <UBadge
      v-for="tag in tags"
      :key="tag"
      variant="subtle"
      :label="tag"
      :color="activeTag !== tag ? 'neutral' : 'primary'"
      :ui="{
        base: 'cursor-pointer'
      }"
      @click="selectTag(tag)"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const activeTag = ref((route.query.tag as string) || '')

watchEffect(() => {
  activeTag.value = (route.query.tag as string) || ''
})

const { data: articles } = await useAsyncData(() => queryCollection(`content_${locale.value}`)
  .select('tags')
  .where('published', '=', true)
  .all()
)

const tags = computed(() => Array.from(new Set(articles.value?.flatMap(a => a.tags ?? []))))

const selectTag = (tag: string) => {
  router.push({ query: tag ? { tag } : {} })
}
</script>
