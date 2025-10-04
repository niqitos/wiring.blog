<template>
  <UFieldGroup>
    <UButton
      v-for="item in items"
      :key="item.label"
      color="neutral"
      variant="outline"
      v-bind="getButton(item)"
    />
  </UFieldGroup>
</template>

<script setup lang="ts">
defineProps({
  items: {
    required: true,
    type: Array as PropType<any[]>
  }
})

const getButton = (item: any) => {
  if (item.type === 'youtube') {
    return {
      label: 'YouTube',
      to: item.to,
      icon: 'i-simple-icons:youtube',
      ui: {
        leadingIcon: '!text-youtube'
      },
      target: '_blank'
    }
  } else if (item.type === 'arduino') {
    return {
      label: 'Arduino',
      to: item.to,
      icon: 'i-simple-icons:arduino',
      target: '_blank',
      ui: {
        leadingIcon: '!text-arduino'
      }
    }
  } else if (item.type === 'github') {
    return {
      label: 'GitHub',
      to: item.to,
      icon: 'i-simple-icons:github',
      target: '_blank',
      ui: {
        leadingIcon: '!text-black dark:!text-white'
      }
    }
  }
}
</script>
