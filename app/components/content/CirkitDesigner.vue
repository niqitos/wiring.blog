<template>
  <div class="space-y-2 text-xs">
    <div class="relative w-full !pt-[calc(max(56.25%,400px))] rounded-md overflow-clip">
      <iframe
        :src="`${src}?view=interactive_preview&persistent=false`"
        class="absolute top-0 left-0 w-full h-full border-none"
      />
    </div>

    <I18nT
      keypath="cirkitDesigner.caption"
      tag="p"
    >
      <NuxtLink
        :to="src"
        class="text-primary"
        target="_blank"
      >
        Cirkit Designer
      </NuxtLink>
    </I18nT>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>
