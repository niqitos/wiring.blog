<template>
  <UDropdownMenu
    :items="locales.filter((l: any) => l.code !== locale).map((l: any) => ({
      ...l,
      label: l.name.substring(0, 3),
      onSelect: (e: Event) => setLocale(l.code)
    }))"
    :content="{
      align: 'start',
      sideOffset: 8
    }"
    size="lg"
    :ui="{
      content: 'min-w-[var(--reka-popper-anchor-width)]',
      item: 'cursor-pointer'
    }"
  >
    <UButton
      trailing-icon="i-lucide:chevron-down"
      color="neutral"
      variant="ghost"
      size="lg"
      :label="locales.find((l: LocaleObject) => l.code === locale)?.name?.substring(0, 3)"
      :title="$t('langswitcher.title')"
    />
  </UDropdownMenu>
  <!-- <ULocaleSelect
    v-model="locale"
    variant="ghost"
    :leading="false"
    icon="i-lucide:languages"
    :locales="locales.map((l: LocaleObject) => ({
      name: l.name?.substring(0, 3),
      code: l.code
    }))"
    @update:model-value="setLocale($event)"
  /> -->
</template>

<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const setLocale = (value: SupportedLocale) => {
  if (locales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
  }
}
</script>
