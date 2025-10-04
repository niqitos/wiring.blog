<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'bg-transparent max-w-full max-h-full flex items-center justify-center p-0'
    }"
  >
    <template #content>
      <UButton
        color="neutral"
        variant="subtle"
        icon="i-lucide:x"
        :ui="{
          base: 'absolute top-2 sm:top-4 right-2 sm:right-4 !border-none z-1'
        }"
        @click="isOpen = !isOpen"
      />

      <div class="flex gap-2 absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-1 !border-none">
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide:minus"
          :disabled="scale <= 1"
          @click="zoomOut"
        />

        <UTooltip :text="$t('zoom.reset')">
          <UButton
            :label="String(scale)"
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
          :disabled="scale >= 3"
          @click="zoomIn"
        />
      </div>

      <div
        ref="imageContainer"
        class="relative overflow-hidden w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        @pointerdown="startDrag"
      >
        <NuxtImg
          v-if="modalImg"
          ref="modalImage"
          :src="modalImg"
          class="w-full max-h-full rounded-xl select-none pointer-events-none"
          draggable="false"
          :style="{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: dragging ? 'none' : 'transform 0.1s ease-out'
          }"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const modalImg = ref<string | null>(null)
const scale = ref(1)
const position = reactive({ x: 0, y: 0 })
const start = reactive({ x: 0, y: 0 })
const dragging = ref(false)
const bounds = reactive({ maxX: 0, maxY: 0 })
const imageContainer = ref<HTMLElement | null>(null)
const modalImage = ref<any>(null)

const containerSelector = '#article'

let cleanupFns: (() => void)[] = []

onMounted(() => {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const images = container.querySelectorAll<HTMLImageElement>('img')

  images.forEach((img: any) => {
    const handler = () => {
      modalImg.value = img.src
      scale.value = 1
      position.x = 0
      position.y = 0
      isOpen.value = true
      nextTick(updateBounds)
    }
    img.style.cursor = 'zoom-in'
    img.addEventListener('click', handler)

    cleanupFns.push(() => img.removeEventListener('click', handler))
  })
})

onBeforeUnmount(() => {
  cleanupFns.forEach(fn => fn())
  cleanupFns = []
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', endDrag)
})

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.25, 5)

  nextTick(updateBounds)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.25, 0.25)

  nextTick(updateBounds)
}

const resetZoom = () => {
  scale.value = 1
  position.x = 0
  position.y = 0
  nextTick(updateBounds)
}

const startDrag = (e: PointerEvent) => {
  if (scale.value <= 1) return
  dragging.value = true
  start.x = e.clientX - position.x
  start.y = e.clientY - position.y
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', endDrag)
  updateBounds()
}

const onPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return

  const dx = e.clientX - start.x
  const dy = e.clientY - start.y

  position.x = Math.min(bounds.maxX, Math.max(-bounds.maxX, dx))
  position.y = Math.min(bounds.maxY, Math.max(-bounds.maxY, dy))
}

const endDrag = () => {
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', endDrag)
}

const updateBounds = () => {
  const container = imageContainer.value
  const img = modalImage.value?.$el || modalImage.value
  if (!container || !img) return

  const imgEl = img instanceof HTMLImageElement ? img : img.querySelector('img')
  if (!imgEl) return

  const containerRect = container.getBoundingClientRect()

  // Поточний рендерний розмір (в межах контейнера до scale)
  const style = getComputedStyle(imgEl)
  const displayedW = parseFloat(style.width)
  const displayedH = parseFloat(style.height)

  // Фактичні розміри після масштабу
  const scaledW = displayedW * scale.value
  const scaledH = displayedH * scale.value

  // Різниця між розміром картинки та контейнера
  const overflowX = (scaledW - containerRect.width) / 2
  const overflowY = (scaledH - containerRect.height) / 2

  // Якщо зображення менше контейнера — ставимо межу точно по контейнеру
  bounds.maxX = Math.max(0, overflowX)
  bounds.maxY = Math.max(0, overflowY)

  // Край зображення завжди або за межею, або точно на ній
  position.x = Math.min(bounds.maxX, Math.max(-bounds.maxX, position.x))
  position.y = Math.min(bounds.maxY, Math.max(-bounds.maxY, position.y))

  // Якщо зображення повністю вміщується — центруємо
  if (scaledW <= containerRect.width) position.x = 0
  if (scaledH <= containerRect.height) position.y = 0
}
</script>
