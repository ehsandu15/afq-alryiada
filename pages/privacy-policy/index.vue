<template>
  <section class="app-container container">
    <HeadingHighlightedTitle
      v-if="privacyPolicy?.data.headingTitle"
      :title="privacyPolicy?.data.headingTitle.title"
      :words="
        privacyPolicy?.data.headingTitle.highlightWords.map((w) => w.word)
      "
      main-text-color-class-name="text-app-black-secondary"
      marked-text-color-class-name="text-secondary"
      class="mb-16 mt-12 text-center text-[40px] font-extrabold leading-[61px] md:text-[56px]"
    />
    <RichTextRenderer
      v-if="privacyPolicy?.data.terms"
      :data="privacyPolicy?.data.terms"
    />
  </section>
</template>
<script setup lang="ts">
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { PrivacyPolicyContentType } from "~/types/privacy-policy";

const { findOne } = useStrapi<PrivacyPolicyContentType>();

const { data: privacyPolicy } = await useAsyncData(() =>
  findOne(STRAPI_ENDPOINT.PRIVACY_POLICY, {
    locale: "ar-SA",
    populate: {
      headingTitle: { populate: { highlightWords: true } },
      seo: {
        populate: {
          shareImage: true,
        },
      },
    },
  }),
);

useSeoMeta({
  title: privacyPolicy.value?.data.seo?.metaTitle,
  description: privacyPolicy.value?.data.seo?.metaDescription,
  ogImage: privacyPolicy.value?.data?.seo?.shareImage
    ? {
        url: imagePathPrefix(privacyPolicy.value?.data.seo.shareImage?.url),
        alt: privacyPolicy.value?.data.seo.shareImage?.alternativeText,
        width: privacyPolicy.value?.data.seo.shareImage?.width,
        height: privacyPolicy.value?.data.seo.shareImage?.height,
        type: privacyPolicy.value?.data.seo.shareImage?.mime,
      }
    : undefined,
  robots: privacyPolicy.value?.data.seo.robots,
  keywords: privacyPolicy.value?.data.seo.keywords,
  ogUrl: privacyPolicy.value?.data.seo.canonicalUrl,
});
</script>
