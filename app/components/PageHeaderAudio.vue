<template>
  <UFieldGroup>
    <UButton
      v-bind="buttons.play"
      @click="togglePlay"
    />

    <UButton
      v-if="buttons.stop"
      color="error"
      variant="subtle"
      icon="i-lucide:square"
      :title="$t('article.audio.stop')"
      :disabled="!playing"
      @click="stopPlay"
    />
  </UFieldGroup>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const { t } = useI18n()

const audio = ref<any>(null)
const playing = ref(false)
const paused = ref(false)

const buttons = computed<any>(() => {
  if (paused.value && audio.value?.currentTime > 0) {
    return {
      play: {
        variant: 'subtle',
        color: 'primary',
        title: t('article.audio.resume'),
        icon: 'i-lucide:play'
      },
      stop: true
    }
  } else if (playing.value) {
    return {
      play: {
        variant: 'subtle',
        color: 'primary',
        title: t('article.audio.pause'),
        icon: 'i-lucide:pause'
      },
      stop: true
    }
  } else {
    return {
      play: {
        variant: 'outline',
        color: 'neutral',
        label: t('article.audio.listen'),
        icon: 'i-lucide:audio-lines'
      },
      stop: false
    }
  }
})

const initAudio = () => {
  if (!audio.value) {
    audio.value = new Audio(props.src)

    audio.value.addEventListener('play', () => {
      playing.value = true
      paused.value = false
    })

    audio.value.addEventListener('pause', () => {
      if (!audio.value.ended) {
        paused.value = true
      }
    })

    audio.value.addEventListener('ended', () => {
      playing.value = false
      paused.value = false
    })
  }
}

const togglePlay = () => {
  initAudio()

  if (paused.value) {
    audio.value.play()
    paused.value = false

    return
  }

  if (playing.value && !paused.value) {
    audio.value.pause()
    paused.value = true

    return
  }

  // Start from beginning
  audio.value.currentTime = 0
  audio.value.play()
}

const stopPlay = () => {
  if (!audio.value) return
  audio.value.pause()
  audio.value.currentTime = 0
  playing.value = false
  paused.value = false
}

onBeforeUnmount(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})
</script>
