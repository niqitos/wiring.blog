import { z } from 'zod'
import { defineContentConfig, defineCollection } from '@nuxt/content'

const schema = z.object({
  title: z.string(),
  cover: z.string(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  authors: z.array(
      z.object({
        name: z.string(),
        avatar: z.string()
      })
    )
    .optional(),
  readingTime: z.number().optional()
})


export default defineContentConfig({
  collections: {
    content_uk: defineCollection({
      type: 'page',
      source: {
        include: 'uk/**',
        prefix: '',
      },
      schema
    }),
    content_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/**',
        prefix: '',
      },
      schema
    }),
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
      schema
    })
  }
})
