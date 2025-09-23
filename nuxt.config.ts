// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-01',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon-96x96.png'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        },
        {
          rel: 'shortcut icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ]
    }
  },
  runtimeConfig: {
    // googleAdsensePrivateId: process.env.GOOGLE_ADSENSE_PRIVATE_ID,
    public: {
      googleAdsenseId: process.env.GOOGLE_ADSENSE_PUBLIC_ID,
      email: process.env.EMAIL
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/mdc',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/css/main.css'
  ],
  i18n: {
    locales: [
      {
        name: 'Українська',
        code: 'uk',
        language: process.env.COUNTRY ? `uk-${process.env.COUNTRY.toUpperCase()}` : 'uk',
        file: 'uk.js',
        isCatchallLocale: true
      },
      {
        name: 'Русский',
        code: 'ru',
        language: process.env.COUNTRY ? `ru-${process.env.COUNTRY.toUpperCase()}` : 'ru',
        file: 'ru.js'
      },
      {
        name: 'English',
        code: 'en',
        language: process.env.COUNTRY ? `en-${process.env.COUNTRY.toUpperCase()}` : 'en',
        file: 'en.js'
      }
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: process.env.DEFAULT_LOCALE as 'uk' | 'ru' | 'en' | undefined,
    detectBrowserLanguage: false
  },
  mdc: {
    headings: {
      anchorLinks: {
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        h6: false,
      }
    }
  },
  content: {
    // renderer: {
    //   anchorLinks: {
    //     h1: false,
    //     h2: false,
    //     h3: false,
    //     h4: false,
    //     h5: false,
    //     h6: false,
    //   }
    // },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            light: 'github-light',
            dark: 'github-dark'
            // default: 'one-light',
            // light: 'one-light',
            // dark: 'one-dark-pro'
            // default: 'material-theme',
            // light: 'material-theme-lighter',
            // dark: 'material-theme-palenight'
          },
          langs: [
            'cpp',
            'js',
            'ts'
          ]
        }
      }
    }
  },
  icon: {
    clientBundle: {
      icons: [
        // Lucide Icons
        'lucide:x',
        'lucide:menu',
        'lucide:languages',
        'lucide:sun',
        'lucide:moon',
        'lucide:monitor',
        'lucide:house',
        'lucide:hash',
        'lucide:chevron-down',
        'lucide:copy',
        'lucide:copy-check',
        'lucide:cookie',
        'lucide:file-text',
        'lucide:search',
        'lucide:minus',
        'lucide:plus',
        'lucide:check',
        // VS Code Icons
        'vscode-icons:file-type-arduino',
        'vscode-icons:file-type-text',
        'vscode-icons:file-type-cpp'
      ]
    }
  },
  $production: {
    scripts: {
      registry: {
        googleTagManager: {
          id: process.env.GOOGLE_TAG_MANAGER_ID
        } as any,
        googleAdsense: {
          client: `ca-pub-${process.env.GOOGLE_ADSENSE_ID}`,
          autoAds: true
        }
      }
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/ads.txt'
      ]
    }
  },
  hooks: {
    'content:file:afterParse'(ctx) {
      const { file, content } = ctx;

      const wordsPerMinute = 180;
      const text = typeof file.body === 'string' ? file.body : '';
      const wordCount = text.split(/\s+/).length;

      content.readingTime = Math.ceil(wordCount / wordsPerMinute);
    }
  }
})
