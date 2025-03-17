// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@vueuse/motion/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/strapi",
    "@nuxtjs/turnstile",
    "@nuxt/icon",
  ],

  css: ["~/assets/css/tailwind.css"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
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
  turnstile: {
    addValidateEndpoint: true,
  },
  runtimeConfig: {
    strapi: {
      url: process.env.STRAPI_URL,
    },
    turnstile: {
      secretKey: process.env.CLOUDFLARE_TURNSITE_SECRET_KEY,
    },
    public: {
      turnstile: {
        siteKey: process.env.CLOUDFLARE_TURNSITE_SITE_KEY
      },
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
        url: process.env.STRAPI_URL,
        strapiRoleApiKey: process.env.STRAPI_ROLE_API_KEY,
      },
      socialShare: {
        baseUrl: process.env.FRONTEND_URL,
      },
    },
    findIp: {
      apiKey: process.env.FIND_IP_API_KEI,
    },
  },
  nitro: {
    routeRules: {
      "/": { isr: 86400 }, // 24 hour
      "/about": { isr: 86400 }, // 24 hour
      "/contact-us": { isr: 86400 }, // 24 hour
      "/blogs": { isr: 86400 }, // 1 hour
      "/blogs/:articleSlug": { isr: 86400 }, // 1 hour
      "/privacy-policy": { isr: 86400 }, // 24 hour
    },
  },
  vite: {
    server: {
      allowedHosts: ["f748-41-199-148-60.ngrok-free.app"],
    },
    esbuild: {
      drop: ["debugger"],
      pure: [
        "console.log",
        "console.error",
        "console.warn",
        "console.debug",
        "console.trace",
      ],
    },
  },
});
