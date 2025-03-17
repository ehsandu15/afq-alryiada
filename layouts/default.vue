<template>
  <LayoutAppHeader
    :content="headerContent?.data"
    :navigation-links="navigationLinks?.data"
    :current-active-section-id="currentActiveSectionId"
  />
  <main
    class="relative flex min-h-fit w-full max-w-full flex-col items-center justify-start"
    id="home-sections-wrapper"
  >
    <slot />
    <div
      class="fixed bottom-5 right-0 isolate z-30 flex w-full max-w-[100vw] items-center justify-between px-4 lg:px-20"
    >
      <ScrollTopButton :button-visible-position="1000" />
      <FlutingWhatsappButton
        v-if="shared?.data.whatsapp"
        :phone-number="shared?.data.whatsapp.href"
        :icon-url="shared.data.whatsapp.icon.url!"
        class="!ms-auto"
      />
    </div>
  </main>
  <LayoutAppFooter
    :content="footerContent?.data"
    :navigation-links="navigationLinks?.data"
  />
</template>
<script setup lang="ts">
import type { AppFooterType } from "~/types/footer";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { AppSharedContent, NavigationLinkType } from "~/types/shared";
import type { AppHeaderType } from "~/types/header";
import type { SiteData } from "~/types/seo";
import { useEventListener } from "@vueuse/core";
import { APP_HEADER_HEIGHT } from "~/constants/app-data";

const { findOne, find } = useStrapi<AppFooterType>();
const nuxtApp = useNuxtApp();
const { data: footerContent } = await useAsyncData(
  STRAPI_ENDPOINT.APP_FOOTER,
  () =>
    findOne(STRAPI_ENDPOINT.APP_FOOTER, {
      locale: "ar-SA",
      populate: {
        logo: true,
        ctaBtn: true,
        privacyPolicyLink: true,
        social_medias: {
          populate: ["icon"],
        },
      },
    }),
);

const currentActiveSectionId = ref("#");
const { data: navigationLinks } = await useAsyncData(
  STRAPI_ENDPOINT.NAVIGATION_LINKS,
  () =>
    find<NavigationLinkType>(STRAPI_ENDPOINT.NAVIGATION_LINKS, {
      locale: "ar-SA",
      sort: "order:asc",
    }),
);

const { data: headerContent } = await useAsyncData(
  STRAPI_ENDPOINT.APP_HEADER,
  () =>
    findOne<AppHeaderType>(STRAPI_ENDPOINT.APP_HEADER, {
      locale: "ar-SA",
      populate: {
        ctaBtn: true,
        logo: {
          populate: {
            icon: true,
          },
        },
      },
    }),
);

const { data: shared } = useAsyncData(
  STRAPI_ENDPOINT.SHARED,
  () =>
    findOne<AppSharedContent>(STRAPI_ENDPOINT.SHARED, {
      locale: "ar-SA",
      populate: {
        whatsapp: {
          populate: {
            icon: true,
          },
        },
      },
    }),
  {
    transform: (res) => {
      return nuxtApp.runWithContext(() => ({
        data: {
          ...res.data,
          whatsapp: {
            ...res.data.whatsapp,
            icon: {
              ...res.data.whatsapp.icon,
              url: imagePathPrefix(res.data.whatsapp.icon.url),
            },
          },
        },
      }));
    },
  },
);

const { data: seoData } = useAsyncData(STRAPI_ENDPOINT.GLOBAL_SEO, () =>
  findOne<SiteData>(STRAPI_ENDPOINT.GLOBAL_SEO, {
    locale: "ar-SA",
    populate: {
      defaultSeo: {
        populate: {
          shareImage: true,
        },
      },
      twitter: {
        populate: {
          twitterImage: true,
        },
      },
    },
  }),
);

useSeoMeta({
  title: seoData.value?.data.siteName,
  description: seoData.value?.data.siteDescription,
  twitterCard: seoData.value?.data.twitter.twitterCard,
  twitterTitle: seoData.value?.data.twitter.twitterTitle,
  twitterDescription: seoData.value?.data.twitter.twitterDescription,
  twitterImage: {
    url: imagePathPrefix(seoData.value?.data.twitter.twitterImage.url),
    alt: seoData.value?.data.twitter.twitterImage.alternativeText,
    width: seoData.value?.data.twitter.twitterImage.width,
    height: seoData.value?.data.twitter.twitterImage.height,
    type: seoData.value?.data.twitter.twitterImage.mime,
  },
  twitterImageAlt: seoData.value?.data.twitter.twitterImageAlt,
  twitterSite: seoData.value?.data.twitter.twitterSite,
  twitterCreator: seoData.value?.data.twitter.twitterCreator,
  ogImage: {
    url: imagePathPrefix(seoData.value?.data.defaultSeo.shareImage.url),
    alt: seoData.value?.data.defaultSeo.shareImage.alternativeText,
    width: seoData.value?.data.defaultSeo.shareImage.width,
    height: seoData.value?.data.defaultSeo.shareImage.height,
    type: seoData.value?.data.defaultSeo.shareImage.mime,
  },
  colorScheme: seoData.value?.data.colorScheme,
  themeColor: seoData.value?.data.themeColor,
  ogUrl: seoData.value?.data.defaultSeo.canonicalUrl,
  ogTitle: seoData.value?.data.siteName,
  ogSiteName: seoData.value?.data.siteName,
  ogDescription: seoData.value?.data.siteDescription,
  ogType: "website",
  ogLocale: "ar-SA",
  robots: seoData.value?.data.defaultSeo.robots,
  keywords: seoData.value?.data.defaultSeo.keywords,
});

useHead({
  link: [
    {
      rel: "canonical",
      href: seoData.value?.data.defaultSeo.canonicalUrl,
    },
  ],
  script: [
    {
      async: true,
      type: "application/ld+json",
      children: seoData.value?.data.structuredData || {},
    },
  ],
});

useEventListener(window, "scroll", function (ev) {
  if (typeof window !== "undefined") {
    const sectionsWrapper = document.body.querySelector(
      "#home-sections-wrapper",
    );

    if (sectionsWrapper) {
      const sections = sectionsWrapper.querySelectorAll("[data-section=true]");
      const currentScroll = window.pageYOffset || window.scrollY;

      const currentSection = Array.from(sections as NodeListOf<HTMLDivElement>)
        // .reverse()
        .find((section) => {
          const top = section.offsetTop - APP_HEADER_HEIGHT.DESKTOP;
          const bottom = top + section.offsetHeight;
          return currentScroll >= top && currentScroll <= bottom;
        });

      currentActiveSectionId.value =
        currentSection?.id.replaceAll("#", "") || "#"; // Default to "#"
    }
  }
});
</script>
