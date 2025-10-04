import { withLeadingSlash } from 'ufo'
import { stringify } from 'minimark/stringify'
import type { Collections } from '@nuxt/content'

export default eventHandler(async (event) => {
  const slug = getRouterParams(event)['slug.md']
  const { locale } = getRouterParams(event)

  if (!slug?.endsWith('.md')) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true
    })
  }

  const path = withLeadingSlash(slug.replace('.md', ''))

  const page = await queryCollection(event, `content_${locale}` as keyof Collections).path(path).first()

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page not found',
      fatal: true
    })
  }

  if (page.body.value[0]?.[0] !== 'h1') {
    page.body.value.unshift(['blockquote', {}, page.description])
    page.body.value.unshift(['h1', {}, page.title])
  }

  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')

  return stringify(
    {
      ...page.body,
      type: 'minimark'
    },
    {
      format: 'markdown/html'
    }
  )
})
