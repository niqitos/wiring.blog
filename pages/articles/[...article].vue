<template>
  <ContentRenderer v-if="page" :value="page" />
  <div v-else>Page not found</div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(() => queryCollection('content').path(`/${route.params.article}`).first())

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>
