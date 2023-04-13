export default {
  // The ssr property: https://nuxtjs.org/docs/configuration-glossary/configuration-ssr
  ssr: false,

  // The target property: https://nuxtjs.org/docs/configuration-glossary/configuration-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Auth Flow',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/role.js' }
  ],

  router: {
    middleware: ['auth', 'protected-page']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Auth module configuration: https://auth.nuxtjs.org/
  auth: {
    redirect: {
      home: '/',
      login: '/login',
      logout: '/login',
      callback: '/callback'
    },
    strategies: {
      idmapp: {
        scheme: '~/schemes/idmapp-scheme',
        endpoints: {
          configuration: `${process.env.KEYCLOAK_FRONTEND_URL}/realms/${process.env.KEYCLOAK_REALM_NAME}/.well-known/openid-configuration`
        },
        clientId: 'idmapp',
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 3600
        },
        idToken: {
          property: 'id_token',
          maxAge: 60 * 60 * 24 * 30
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'offline_access'],
        codeChallengeMethod: 'S256',
        redirectUri: `${process.env.BASE_URL}/callback`,
        logoutRedirectUri: process.env.BASE_URL,
        autoLogout: false
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ]
  }
}
