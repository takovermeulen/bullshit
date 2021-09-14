export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Bullshit Generator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        name: 'og:title',
        content: 'Bullshit Generator'
      },
      {
        name: 'og:site_name',
        content: 'Bullshit Generator'
      },
      {
        name: 'og:image',
        content: 'http://bullshit2.takovermeulen.eu/icon.png'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/argon/vendor/nucleo/css/nucleo.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '~assets/argon/scss/argon.scss',
    'bootstrap-vue/dist/bootstrap-vue.css',
    '~assets/transitions.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/argon/argon-kit'
  ],

  transition: {
    css: false
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      suffix: true,
      icons: {
        solid: true,
        brands: true
      }
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['vue-scrollto/nuxt'],
    // https://go.nuxtjs.dev/bootstrap
    ['bootstrap-vue/nuxt', {
      bootstrapCSS: false,
      bootstrapVueCSS: false,
      componentPlugins: [
        'Carousel',
        'Spinner'
      ],
      directivePlugins: [
        'Tooltip',
        'Popover'
      ]
    }],
    '@nuxtjs/pwa'
  ],

  pwa: {
    icon: {
      source: '/static/icon.png'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
    }
  }
}
