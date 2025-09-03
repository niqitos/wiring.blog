<template>
  <UDropdownMenu
    :items="modes"
    :content="{
      align: 'start'
    }"
    :ui="{
      content: 'min-w-[var(--reka-popper-anchor-width)]',
      item: 'cursor-pointer'
    }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      size="lg"
      :icon="currentMode?.icon"
      :title="currentMode?.label"
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
    onSelect: () => colorMode.value = 'light'
  },
  {
    label: t('theme.dark'),
    value: 'dark',
    icon: 'i-lucide:moon',
    onSelect: () => colorMode.value = 'dark'
  },
  {
    label: t('theme.system'),
    value: 'system',
    icon: 'i-lucide:monitor',
    onSelect: () => colorMode.value = 'system'
  }
])

const currentMode = computed(() => modes.value.find(m => m.value === colorMode.value) || modes.value[0])
</script>
