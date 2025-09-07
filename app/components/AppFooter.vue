<template>
  <footer class="border-t border-gray-200 dark:border-gray-800">
    <UContainer>
      <nav class="flex items-center gap-2 py-2">
        <UButton
          :to="`mailto:${runtimeConfig.public.email}`"
          color="neutral"
          variant="link"
          size="lg"
          icon="i-lucide:mail"
          :label="runtimeConfig.public.email"
        />
      </nav>
    </UContainer>
  </footer>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()
</script>
