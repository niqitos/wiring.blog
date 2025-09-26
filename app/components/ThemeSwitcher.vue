<template>
  <ClientOnly v-if="mounted">
    <UDropdownMenu
      :items="modes"
      :content="{
        align: 'start',
        sideOffset: 8,
        alignOffset: -4
      }"
      size="lg"
      :ui="{
        item: 'cursor-pointer'
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        size="lg"
        :icon="currentMode?.icon"
        :title="$t('themeswitcher.title')"
      />
    </UDropdownMenu>
  </ClientOnly>

  <USkeleton
    v-else
    class="size-7 m-1"
  />
  <!-- <UColorModeSelect
    v-if="breakpoints.greater('sm').value"
    variant="ghost"
  /> -->
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const mounted = ref(false)

const modes = ref([
  {
    label: t('theme.light'),
    value: 'light',
    icon: 'i-lucide:sun',
    checked: colorMode.value === 'light',
    onSelect: () => setTheme('light')
  },
  {
    label: t('theme.dark'),
    value: 'dark',
    icon: 'i-lucide:moon',
    checked: colorMode.value === 'dark',
    onSelect: () => setTheme('dark')
  },
  {
    label: t('theme.system'),
    value: 'system',
    icon: 'i-lucide:monitor',
    checked: colorMode.value === 'system',
    onSelect: () => setTheme('system')
  }
])

const currentMode = computed(() => modes.value.find(m => m.value === colorMode.value) || modes.value[0])

const setTheme = (theme: string) => {
  colorMode.value = theme
  colorMode.preference = theme
}

onMounted(() => {
  mounted.value = true
})
</script>
