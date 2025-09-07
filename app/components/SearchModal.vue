<template>
  <UModal v-model:open="open">
    <UButton
      icon="i-lucide:search"
      color="neutral"
      variant="ghost"
      size="lg"
      :title="$t('search.title')"
      :ui="{
        base: '!p-2',
        leadingIcon: '!size-5'
      }"
    />

    <template #content>
      <UInput
        v-model="query"
        icon="i-lucide:search"
        size="xl"
        variant="none"
        :placeholder="$t('search.title')"
      >
        <template #trailing>
          <UButton
            icon="i-lucide:x"
            color="neutral"
            variant="link"
            @click="open = !open"
          />
        </template>
      </UInput>

      <UNavigationMenu
        v-if="result.length"
        orientation="vertical"
        color="neutral"
        :highlight="false"
        variant="link"
        :items="result.map((r: any) => ({
          to: r.id,
          label: r.title,
          icon: r.id.includes('#') ? 'i-lucide:hash' : 'i-lucide:file-text',
          onSelect: (e: Event) => onSelect(r.id)
        }))"
        :ui="{
          root: 'p-1 max-h-82 overflow-auto',
          linkLeadingIcon: 'text-inherit',
          link: '!text-muted hover:!text-highlighted'
        }"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import MiniSearch from 'minisearch'

const { locale } = useI18n()

const open = ref(false)
const query = ref('')

const { data } = await useAsyncData('search', () => queryCollectionSearchSections(`content_${locale.value}`)
  .where('published', '=', true)
)

const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title'],
  searchOptions: {
    boost: {
      title: 2
    },
    prefix: true,
    fuzzy: 0.2,
  },
})

miniSearch.addAll(toValue(data.value) as any)
const result = computed(() => miniSearch.search(toValue(query)))

const onSelect = (to: string) => {
  open.value = ! open.value

  navigateTo(to)
}
</script>
