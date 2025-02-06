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
</script>
