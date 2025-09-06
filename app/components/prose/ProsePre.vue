<template>
  <div class="relative">
    <code
      v-if="filename"
      class="not-prose text-sm text-mono text-gray-500 absolute top-3.5 left-4"
      v-text="filename"
    />

    <UButton
      color="neutral"
      variant="soft"
      :trailing-icon="copied ? 'i-lucide:copy-check' : 'i-lucide:copy'"
      :label="copied ? 'Copied' : 'Copy'"
      :ui="{
        base: 'absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition',
        trailingIcon: 'size-4'
      }"
      @click="copyCode"
    />

    <pre
      :class="[
        'bg-elevated text-default',
        filename ? 'pt-8' : '',
        $props.class
      ]"
    >
      <slot />
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps({
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

const copied = ref(false)
const { copy } = useClipboard()

const copyCode = async () => {
  await copy(props.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<style>
pre code .line {
  display: block;
}
</style>
