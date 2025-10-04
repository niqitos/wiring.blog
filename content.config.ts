import { z } from 'zod'
import { defineContentConfig, defineCollection } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const schema = z.object({
  id: z.bigint(),
  title: z.string(),
  image: z.string(),
  audio: z.string().optional(),
  links: z.array(
    z.object({
      label: z.string(),
      to: z.string(),
      icon: z.string().optional(),
      target: z.string().optional()
    })
  ).optional(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  authors: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      avatar: z.object({
        src: z.string()
      })
    })
  ).optional(),
  readingTime: z.number().optional(),
  _draft: z.boolean()
})

export default defineContentConfig({
  collections: {
    content_uk: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'uk/**',
          prefix: ''
        },
        schema
      })
    ),
    content_ru: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'ru/**',
          prefix: '/ru'
        },
        schema
      })
    ),
    content_en: defineCollection(
      asSitemapCollection({
        type: 'page',
        source: {
          include: 'en/**',
          prefix: '/en'
        },
        schema
      })
    )
  }
})
