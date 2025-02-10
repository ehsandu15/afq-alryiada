<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <LayoutAppHeader
      :content="headerContent?.data"
      :navigation-links="navigationLinks?.data"
    />
    <slot />
    <LayoutAppFooter
      :content="footerContent?.data"
      :navigation-links="navigationLinks?.data"
    />
  </main>
</template>
<script setup lang="ts">
import type { AppFooterType } from "~/types/footer";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { NavigationLinkType } from "~/types/shared";
import type { AppHeaderType } from "~/types/header";
import type { SiteData } from "~/types/seo";

const { findOne, find } = useStrapi<AppFooterType>();

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

const { data: navigationLinks } = await useAsyncData(
  STRAPI_ENDPOINT.NAVIGATION_LINKS,
  () =>
    find<NavigationLinkType>(STRAPI_ENDPOINT.NAVIGATION_LINKS, {
      locale: "ar-SA",
      sort: "createdAt:asc",
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
</script>
