import { z } from 'zod'
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
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
    })
  }
})
