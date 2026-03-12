export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/global.css',
  ],
  typescript: {
    strict: true,
    typeCheck: false,
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN ?? '',
    cohereKey: process.env.COHERE_API_KEY ?? '',
    public: {
      appName: 'GitHub AI Analyzer',
    },
  },
  app: {
    head: {
      title: 'GitHub AI Analyzer',
    },
  },
})
