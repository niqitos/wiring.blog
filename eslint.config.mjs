// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      // '@typescript-eslint/no-unused-vars': 'off',
      'nuxt/nuxt-config-keys-order': 'off',
      'vue/no-mutating-props': 'off',
      'vue/valid-v-slot': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
)
