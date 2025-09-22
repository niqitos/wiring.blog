<template>
  <!-- <div class="relative">
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
    ><slot /></pre>
  </div> -->
  <div
    :class="[
      'relative group my-5',
      {
        '[&>pre]:rounded-t-none [&>pre]:my-0': filename
      }
    ]"
  >
    <div
      v-if="filename"
      class="flex items-center gap-1.5 border border-muted bg-default border-b-0 relative rounded-t-md px-4 py-3"
    >
      <UIcon
        :name="`i-vscode-icons:file-type-${getIcon(filename)}`"
      />

      <span
        class="text-default text-sm/6"
        v-text="filename"
      />
    </div>

    <UButton
      color="neutral"
      variant="outline"
      :trailing-icon="copied ? 'i-lucide:copy-check' : 'i-lucide:copy'"
      :ui="{
        base: 'absolute top-[11px] right-[11px] lg:opacity-0 lg:group-hover:opacity-100 transition',
        trailingIcon: 'size-4'
      }"
      @click="copyCode"
    />

    <pre
      class="group font-mono text-sm/6 border border-muted bg-muted rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none language-md shiki shiki-themes material-theme-lighter material-theme material-theme-palenight"
    ><code><slot /></code></pre>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const { getIcon } = useVSCodeIcons()

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
