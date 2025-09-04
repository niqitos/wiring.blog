<template>
  <pre
    :class="[
      'not-prose bg-gray-300 text-black dark:bg-gray-700 dark:text-white px-1.5 py-0.5 font-mono p-4 rounded-lg overflow-x-auto',
      $props.class
    ]"
  >
    <slot />
  </pre>
</template>

<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
</script>

<style>
pre code .line {
  display: block;
}
</style>
