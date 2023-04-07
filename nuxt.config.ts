export default defineNuxtConfig({
    nitro: {
        preset: 'aws-lambda',
      },
    css: ['vuetify/lib/styles/main.sass'],
    build: {
    transpile: ['vuetify'],
    },
})
