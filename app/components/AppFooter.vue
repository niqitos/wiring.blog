<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <UButton
        :to="`mailto:${runtimeConfig.public.email}`"
        color="neutral"
        variant="link"
        size="lg"
        icon="i-lucide:mail"
        :label="runtimeConfig.public.email"
      />
    </template>
  </UFooter>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
</script>
