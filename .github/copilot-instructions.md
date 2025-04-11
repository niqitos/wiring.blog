# Copilot Instructions

This project is built with **Nuxt 3.16.1** and includes the following technologies and conventions:

## Stack Overview

- **Pinia** for state management
- **vue3-mq** for media query handling
- **Tailwind CSS** for styling
- **Nuxt i18n** for localization with support for `en`, `uk` and `ru` locales
- **Frontend and backend run on separate domains**

## Component Guidelines

- Use **Vue 3 Composition API** with `<script setup lang="ts">` wherever possible
- All components should be functional, using PascalCase (`UserCard.vue`)
- Pages should use kebab-case (`user-profile.vue`)
- Composables should use camelCase (`useAuth.ts`)
- Avoid using `any` in TypeScript if possible

## State Management

- Use `defineStore` from Pinia
- Store naming should follow the pattern: `useUserStore`, `useAuthStore`, etc.

## Forms & Validation

- Use `vee-validate` for form validation
- Provide accessible form labels and validation messages

## Translations

- Translation files are in JSON format
- Use key structure like `auth.login.title` or `dashboard.welcome.message`

## Styling

- Bulma CSS is used for all layout and styling
- Prefer utility-first CSS
- Use `@apply` in `<style lang="scss">` where necessary

---

**Note for Copilot:** Please follow the above patterns when generating new components, stores, or pages. The project favors clean, modular, and strongly typed code.
