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
          class="after:content-[','] last:after:content-['']"
          v-text="author?.name"
        />
      </div>

      <div class="flex items-center gap-2 text-gray-400">
        <span v-text="formatDate(String(article.date))" />
        <span v-text="'•'" />
        <span v-text="$t('readingTime', Number(article.readingTime))" />
      </div>
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
