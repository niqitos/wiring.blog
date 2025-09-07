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

      <div class="flex gap-2 absolute bottom-2 sm:bottom-4 right-4 z-1 !border-none">
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide:minus"
          :ui="{
            base: 'flex justify-center'
          }"
          :disabled="scale <= 1"
          @click="zoomOut"
        />

        <UTooltip :text="$t('zoom.reset')">
          <UButton
            :label="scale"
            color="neutral"
            variant="subtle"
            :ui="{
              base: 'flex justify-center w-14'
            }"
            :disabled="scale <= 1"
            @click="resetZoom"
          />
        </UTooltip>

        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide:plus"
          :ui="{
            base: 'flex justify-center'
          }"
          :disabled="scale >= 3"
          @click="zoomIn"
        />
      </div>

      <NuxtImg
        v-if="modalImg"
        :src="modalImg"
        class="w-full max-h-full rounded-xl"
        :style="{
          transform: `scale(${scale})`
        }"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { UModal } from '#components'

const isOpen = ref(false)
const modalImg = ref<string | null>(null)
const scale = ref(1)

const containerSelector = '.prose'

let cleanupFns: (() => void)[] = []

onMounted(() => {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const images = container.querySelectorAll<HTMLImageElement>('img')

  images.forEach(img => {
    const handler = () => {
      modalImg.value = img.src
      scale.value = 1
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


const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.25, 5)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.25, 0.25)
}

const resetZoom = () => {
  scale.value = 1
}
</script>
