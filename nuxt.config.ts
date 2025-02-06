// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@vueuse/motion/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/strapi",
  ],
  css: ["~/assets/css/tailwind.css"],
  app: {
    head: {
      title: "AfqAlryiada | مؤسسة أفق الريادة لتقنية المعلومات",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          key: "description",
          content: `
            مؤسسة برمجية تطمح لتقديم حلول برمجية ذات جودة عالية في السوق السعودي
            خبرة وريادة في مجال البرمجة
            ☎️للإستفسار: 0581822058 📞
            E-MINFO@AFQALRIYADA.COM
          `,
        },
      ],
      htmlAttrs: {
        dir: "rtl",
        lang: "ar",
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    admin: "/admin",
    version: "v5",
    cookie: {},
    cookieName: "strapi_jwt",
  },
  runtimeConfig: {
    strapi: {
      url: "http://localhost:1337",
    },
    public: {
      motion: {
        directives: {
          "pop-down": {
            initial: { opacity: 0, y: -60 },
            visible: { opacity: 1, y: 0 },
          },
          "pop-up": {
            initial: { scale: 0.9, opacity: 0, y: 60 },
            visible: { scale: 1, opacity: 1, y: 0 },
          },
        },
      },
      strapi: {
        url: "http://localhost:1337",
      },
    },
  },
});
