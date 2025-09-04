<template>
  <UNavigationMenu
    orientation="vertical"
    :items="article?.body?.toc?.links.map((l: any) => ({
      label: l.text,
      to: `#${l.id}`,
      icon: 'i-lucide:hash'
    }))"
    :ui="{
      list: 'space-y-4',
      link: 'p-0',
      linkLeadingIcon: 'size-5 text-primary'
    }"
  />
</template>

<script lang="ts" setup>
defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>
