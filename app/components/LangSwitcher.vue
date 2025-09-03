<template>
  <UDropdownMenu
    :items="locales.filter((l: any) => l.code !== locale).map((l: any) => ({
      ...l,
      label: l.name.substring(0, 3),
      onSelect: (e: Event) => setLocale(l.code)
    }))"
    :content="{
      align: 'start'
    }"
    :ui="{
      content: 'min-w-[var(--reka-popper-anchor-width)]',
      item: 'cursor-pointer'
    }"
  >
    <UButton
      icon="i-lucide:languages"
      color="neutral"
      variant="ghost"
      size="lg"
      :label="locales.find((l: LocaleObject) => l.code === locale)?.name?.substring(0, 3)"
      :ui="{
        leadingIcon: '!size-5'
      }"
    />
  </UDropdownMenu>
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
