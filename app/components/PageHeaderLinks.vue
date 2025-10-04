<template>
  <UFieldGroup>
    <UButton
      :label="$t('article.copy.link')"
      :icon="copied ? 'i-lucide:copy-check' : 'i-lucide:copy'"
      color="neutral"
      variant="outline"
      :loading="copying"
      :ui="{
        leadingIcon: [
          'size-3.5',
          copied ? 'text-primary' : 'text-neutral'
        ]
      }"
      @click="copyLink"
    />

    <UDropdownMenu
      :items="items"
      :content="{
        align: 'end',
        side: 'bottom',
        sideOffset: 8
      }"
      :ui="{
        content: 'content-min-width'
      }"
    >
      <UButton
        icon="i-lucide-chevron-down"
        size="sm"
        color="neutral"
        variant="outline"
      />
    </UDropdownMenu>
  </UFieldGroup>
</template>

<script setup lang="ts">
const route = useRoute()
const requestUrl = useRequestURL()
const { copy, copied } = useClipboard()
const { t, locale } = useI18n()
const site = useSiteConfig()
const copying = ref(false)

const path = ref<string>(`/${locale.value}/raw${route.path}.md`)
const url = ref<string>(`${site.url}${path.value}`)

const items = ref<any[]>([
  {
    label: t('article.view.markdown'),
    icon: 'i-simple-icons:markdown',
    target: '_blank',
    to: url.value
  },
  {
    label: t('article.ai.chatgpt'),
    icon: 'i-simple-icons:openai',
    target: '_blank',
    to: `https://chatgpt.com/?hints=search&q=${encodeURIComponent(t('article.ai.read', { path: url.value }))}`
  // },
  // {
  //   label: t('article.ai.claude'),
  //   icon: 'i-simple-icons:anthropic',
  //   target: '_blank',
  //   to: `https://claude.ai/new?q=${encodeURIComponent(t('article.ai.read', { path: url.value }))}`
  }
])

const copyLink = () => {
  copying.value = true

  copy(requestUrl.href)

  copying.value = false
}
</script>
