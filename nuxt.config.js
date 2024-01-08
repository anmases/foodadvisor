export default {
  mode: 'universal',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FoodAdvisor: La web para descubrir restaurantes en tu ciudad',
    htmlAttrs: {
      lang: 'es'
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
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/axios',
    '@nuxtjs/bulma'
  ],
  googleAnalytics: {
    id: 'G-CPLL6FH9XM' // Tu ID de medición de GA4
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate:{
    async routes() {
      const routes = []; // Aquí obtendrías tus rutas dinámicas (por ejemplo, desde una API)
      // Por ejemplo: ['burgers', 'otra-categoria', ...]
      return routes.map(route => `/category/${route}`);
    }
  }
}
