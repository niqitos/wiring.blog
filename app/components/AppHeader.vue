<template>
  <UHeader>
    <template #title>
      <NuxtLink
        :to="localePath('index')"
        class="flex items-center gap-2"
        title="Logo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 2511 1098" class="fill-current h-8">
          <path d="M1669.667 998.8c-77.984 62.987-187.462 98.98-325.434 98.98-158.619 0-285.643-40.292-373.776-116.926-100.63 74.135-230.853 116.926-378.074 116.926C250.451 1097.78.001 866.826.001 548.89S250.451 0 592.383 0c341.932 0 592.381 230.954 592.381 548.89 0 11.648-.35 23.145-1 34.543v37.443c0 125.974 47.991 190.461 154.47 190.461 107.978 0 154.469-64.487 154.469-190.461V23.995h353.93v596.88c0 125.975 47.99 190.462 155.968 190.462 106.479 0 154.469-64.487 154.469-190.461V23.995H2511v607.378c0 299.94-191.962 466.407-515.898 466.407-137.972 0-245.95-35.993-325.435-98.98ZM356.93 548.89c0 163.467 104.98 262.447 235.453 262.447 130.474 0 235.453-98.98 235.453-262.447 0-163.467-104.98-262.447-235.453-262.447-130.474 0-235.453 98.98-235.453 262.447Z"/>
        </svg>
      </NuxtLink>
    </template>

    <UNavigationMenu
      variant="link"
      :items="menu"
    />

    <template #right>
      <ThemeSwitcher />

      <LangSwitcher />

      <UContentSearchButton
        variant="ghost"
        size="lg"
      />
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="menu"
        class="-mx-2.5"
      />

      <UContentNavigation
        highlight
        :navigation="navigation"
        :type="'single'"
        :default-open="true"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const menu = ref<NavigationMenuItem[]>([
  {
    label: t('home.title'),
    to: localePath('index')
  },
  {
    label: t('about.title'),
    to: localePath('about')
  }
])
</script>
