<template>
  <div
    v-if="active"
    class="w-full sm:!w-80 fixed !left-0 sm:!left-4 bottom-0 sm:!bottom-4 z-10000"
  >
    <div class="grid grid-cols-12 gap-4 gap-y-3 p-3 !shadow-fixed-button sm:!hidden bg-elevated">
      <div class="col-span-12 xs:col-span-7">
        <I18nT
          keypath="cookie.disclaimer"
          tag="p"
          class="!text-xs"
        >
          <NuxtLink
            :to="localePath({ name: 'privacy' })"
            class="underline underline-offset-4 !decoration-dashed"
            target="_blank"
          >
            {{ $t('cookie.link') }}
          </NuxtLink>
        </I18nT>
      </div>

      <div class="col-span-12 xs:col-span-5 !flex !items-center !justify-end gap-2">
        <UButton
          size="xs"
          color="neutral"
          variant="outline"
          :label="$t('cookie.buttons.deny')"
          @click="deny"
        />

        <UButton
          size="xs"
          color="primary"
          :label="$t('cookie.buttons.accept')"
          @click="accept"
        />
      </div>
    </div>

    <UCard
      :ui="{
        root: '!hidden sm:!block shadow-md shadow-gray-200 dark:shadow-gray-800',
        body: 'border-0 p-4 sm:p-4 !pb-0',
        footer: '!flex items-center justify-end gap-2 border-0 p-4 sm:p-4'
      }"
    >
      <div class="!text-xl sm:!text-2xl !font-bold mb-4 !flex !items-center">
        <UIcon
          name="i-lucide:cookie"
          class="!size-8 !min-w-8"
        />

        <span
          class="pl-4 text-2xl"
          v-text="$t('cookie.title')"
        />
      </div>

      <I18nT
        keypath="cookie.disclaimer"
        tag="p"
      >
        <NuxtLink
          :to="localePath({ name: 'privacy' })"
          class="underline underline-offset-4 !decoration-dashed"
          target="_blank"
        >
          {{ $t('cookie.link') }}
        </NuxtLink>
      </I18nT>

      <template #footer>
        <UButton
          color="neutral"
          variant="outline"
          size="sm"
          :label="$t('cookie.buttons.deny')"
          @click="deny"
        />

        <UButton
          color="primary"
          size="sm"
          :label="$t('cookie.buttons.accept')"
          @click="accept"
        />
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const active = ref(false)

const accept = () => {
  active.value = false
  localStorage.setItem('GDPR:accepted', 'true')
}

const deny = () => {
  active.value = false
  localStorage.setItem('GDPR:accepted', 'false')
}

useScript('https://www.google-analytics.com/analytics.js', {
  trigger: useScriptTriggerConsent({
    consent: active,
    // load 3 seconds after consent is granted
    postConsentTrigger: () => new Promise<void>(resolve => setTimeout(resolve, 3000))
  })
})

onMounted(() => {
  if (localStorage.getItem('GDPR:accepted') !== 'true') {
    active.value = true
  }
})
</script>
