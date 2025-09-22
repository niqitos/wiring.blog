<template>
  <div class="flex gap-4 items-center">
    <UAvatarGroup :max="2">
      <UAvatar
        v-for="(author, index) in article.authors"
        :key="`author-avatar-${index}`"
        size="lg"
        :alt="author?.name"
        :src="author?.avatar"
        :ui="{
          root: 'overflow-hidden'
        }"
      />
    </UAvatarGroup>

    <div class="text-sm">
      <div class="flex gap-1">
        <span
          v-for="(author, index) in article.authors"
          :key="`author-name-${index}`"
          class="font-medium text-highlighted after:content-[','] last:after:content-['']"
          v-text="author?.name"
        />
      </div>

      <div
        class="text-muted text-xs"
        v-text="`${formatDate(String(article.date))} • ${$t('readingTime', Number(article.readingTime))}`"
      />
    </div>
  </div>
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
