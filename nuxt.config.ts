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
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
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
  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1
        },
        highlight: {
          langs: [
            'cpp',
            'js',
            'ts'
          ]
        }
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'OneWire',
      short_name: 'OW',
      start_url: '/',
      display: 'standalone',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      lang: process.env.DEFAULT_LOCALE,
      icons: [
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
    }
  },
  icon: {
    clientBundle: {
      icons: [
        // Lucide Icons
        'lucide:audio-lines',
        'lucide:anthropic',
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:copy',
        'lucide:copy-check',
        'lucide:cookie',
        'lucide:diff',
        'lucide:file',
        'lucide:file-text',
        'lucide:hash',
        'lucide:house',
        'lucide:languages',
        'lucide:link',
        'lucide:mail',
        'lucide:markdown',
        'lucide:menu',
        'lucide:minus',
        'lucide:monitor',
        'lucide:moon',
        'lucide:openai',
        'lucide:pause',
        'lucide:pin',
        'lucide:play',
        'lucide:plus',
        'lucide:presentation',
        'lucide:scale',
        'lucide:search',
        'lucide:server',
        'lucide:sun',
        'lucide:square',
        'lucide:x',
        // Font Awesome Brands
        'fa7-brands:apple',
        'fa7-brands:linux',
        'fa7-brands:windows',
        // VS Code Icons
        'material-icon-theme:arduino',
        'material-icon-theme:cpp',
        'material-icon-theme:document',
        // Simple icons
        'simple-icons:arduino',
        'simple-icons:espressif',
        'simple-icons:github',
        'simple-icons:raspberrypi',
        'simple-icons:youtube'
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
        '/',
        '/ads.txt'
      ],
      crawlLinks: true,
      autoSubfolderIndex: false
    },
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
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
