<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'max-w-full max-h-full flex items-center justify-center p-4'
    }"
  >
    <template #content>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide:x"
        :ui="{
          base: 'absolute top-2 sm:top-4 right-2 sm:right-4 !border-none'
        }"
        @click="isOpen = !isOpen"
      />

      <NuxtImg
        v-if="modalImg"
        :src="modalImg"
        class="w-full max-h-full rounded-xl"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UModal } from '#components'

const isOpen = ref(false)
const modalImg = ref<string | null>(null)

const containerSelector = '.prose'

let cleanupFns: (() => void)[] = []

onMounted(() => {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const images = container.querySelectorAll<HTMLImageElement>('img')

  images.forEach(img => {
    const handler = () => {
      modalImg.value = img.src
      isOpen.value = true
    }
    img.style.cursor = 'zoom-in'
    img.addEventListener('click', handler)

    cleanupFns.push(() => img.removeEventListener('click', handler))
  })
})

onBeforeUnmount(() => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
})
</script>
