<template>
  <UDropdownMenu
    :items="modes"
    :content="{
      align: 'start',
      sideOffset: 8
    }"
    :ui="{
      content: 'min-w-[var(--reka-popper-anchor-width)]',
      item: 'cursor-pointer',
      itemLeadingIcon: '!size-4'
    }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      size="lg"
      :icon="currentMode?.icon"
      :title="$t('themeswitcher.title')"
      :ui="{
        leadingIcon: '!size-5'
      }"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const modes = ref([
  {
    label: t('theme.light'),
    value: 'light',
    icon: 'i-lucide:sun',
    onSelect: () => setTheme('light')
  },
  {
    label: t('theme.dark'),
    value: 'dark',
    icon: 'i-lucide:moon',
    onSelect: () => setTheme('dark')
  },
  {
    label: t('theme.system'),
    value: 'system',
    icon: 'i-lucide:monitor',
    onSelect: () => setTheme('system')
  }
])

const currentMode = computed(() => modes.value.find(m => m.value === colorMode.value) || modes.value[0])

const setTheme = (theme: string) => {
  colorMode.value = theme
  colorMode.preference = theme
}
</script>
