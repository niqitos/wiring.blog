<template>
  <UCard class="hover:shadow-lg transition">
    <UCardHeader>
      <h2 class="text-xl font-semibold">
        <NuxtLink
          :to="article.path"
          class="hover:underline"
        >
          {{ article.title }}
        </NuxtLink>
      </h2>

      <p
        class="text-sm text-gray-500"
        v-text="formatDate(String(article.meta.date))"
      />
    </UCardHeader>

    <UCardContent>
      <p
        class="text-gray-600"
        v-text="article.description"
      />
    </UCardContent>

    <UCardFooter class="flex flex-wrap gap-2 mt-4">
      <UBadge
        v-for="tag in article.meta.tags"
        :key="tag"
        color="primary"
        variant="soft"
      >
        {{ tag }}
      </UBadge>
    </UCardFooter>
  </UCard>
</template>

<script lang="ts" setup>
const { formatDate } = useDate()

defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>
