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
    "nuxt-swiper",
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

      title: "AfqAlryiada | مؤسسة أفق الريادة لتقنية المعلومات",
      meta: [
        {
          name: "description",
          content:
            "مؤسسة برمجية تطمح لتقديم حلول برمجية ذات جودة عالية في السوق السعودي خبرة وريادة في مجال البرمجة",
        },
        {
          name: "keywords",
          content:
            "Software solutions in Saudi Arabia, IT services company KSA, Custom software development Riyadh, Web development Saudi Arabia, Mobile app development Jeddah, Cloud solutions provider KSA, AI and automation services Saudi Arabia, ERP software solutions Riyadh, Cybersecurity services in Saudi Arabia, Best IT consulting firm KSA, E-commerce solutions Jeddah, Digital transformation Saudi Arabia, Business software solutions KSA, Top software development company Riyadh, IT support and managed services Saudi Arabia",
        },
        {
          property: "og:title",
          content: "AfqAlryiada | مؤسسة أفق الريادة لتقنية المعلومات",
        },
        {
          property: "og:description",
          content:
            "مؤسسة برمجية تطمح لتقديم حلول برمجية ذات جودة عالية في السوق السعودي خبرة وريادة في مجال البرمجة",
        },
        { property: "og:image", content: "/website-cover-image.webp" },
        { property: "og:url", content: process.env.FRONTEND_URL },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "AfqAlryiada | مؤسسة أفق الريادة لتقنية المعلومات",
        },
        {
          name: "twitter:description",
          content:
            "مؤسسة برمجية تطمح لتقديم حلول برمجية ذات جودة عالية في السوق السعودي خبرة وريادة في مجال البرمجة",
        },
        { name: "twitter:image", content: "/website-cover-image.webp" },
      ],
      link: [
        {
          rel: "canonical",
          href: process.env.FRONTEND_URL,
        },
      ],
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
        siteKey: process.env.CLOUDFLARE_TURNSITE_SITE_KEY,
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
      messageSend: {
        duplicatedMessageDelayDays: process.env.DUPLICATED_MESSAGE_DELAY_DAYS,
      },
      env: process.env.NODE_ENV,
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
      "/blogs": { isr: 86400 }, // 24 hour
      "/blogs/:articleSlug": { isr: 86400 }, // 24 hour
      "/privacy-policy": { isr: 86400 }, // 24 hour
    },
  },
  vite: {
    server: {
      allowedHosts: ["3b45-62-114-111-226.ngrok-free.app"],
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
