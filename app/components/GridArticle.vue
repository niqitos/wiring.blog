<template>
  <NuxtLink :to="localePath(article.path)">
    <UCard
      :ui="{
        root: 'hover:shadow-lg transition p-0 divide-none h-full flex flex-col',
        header: 'p-4 sm:px-4 !pb-0',
        body: 'p-4 sm:p-4 space-y-1',
        footer: 'flex items-end flex-1 p-4 sm:p-4 !pt-0'
      }"
    >
      <template #header>
        <NuxtImg
          v-if="article.cover"
          :src="String(article.cover) || placeholders.cover"
          class="!rounded-b-none"
        />
      </template>

      <h2
        class="text-xl font-semibold"
        v-text="article.title"
      />

      <p
        class="text-sm text-gray-500"
        v-text="formatDate(String(article.date))"
      />

      <p
        class="text-gray-600 wrap-break-word"
        v-text="article.description"
      />

      <template #footer>
        <div class="flex flex-wrap gap-2 max-h-fit">
          <UBadge
            v-for="tag in article.tags"
            :key="tag"
            color="primary"
            variant="subtle"
            :label="tag"
          />
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<script lang="ts" setup>
const { formatDate } = useDate()
const { placeholders } = useImages()
const localePath = useLocalePath()

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>
