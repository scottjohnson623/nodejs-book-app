export default defineNuxtConfig({
  nitro: {
    preset: "aws-lambda",
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "/api",
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300",
        },
      ],
      style: [],
      script: [],
      noscript: [],
    },
  },
});
