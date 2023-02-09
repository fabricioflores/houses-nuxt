// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  app: {
    head: {
      titleTemplate: 'HomeApp | %s',
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL,
      appId: process.env.BACKEND_APP_ID,
      apiKey: process.env.BACKEND_API_KEY,
      googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
})
