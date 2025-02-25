<template>
  <section class="app-container container">
    <h3
      v-html="headingTitle"
      class="mb-16 mt-12 text-center text-[40px] font-extrabold leading-[61px] text-app-black-secondary md:text-[56px]"
    ></h3>
    <ArticleContent :content="privacyPolicy?.data.terms" />
  </section>
</template>
<script setup lang="ts">
import ArticleContent from "~/components/blogs/ArticleContent.vue";
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
  ogImage: {
    url: imagePathPrefix(privacyPolicy.value?.data.seo.shareImage?.url),
    alt: privacyPolicy.value?.data.seo.shareImage.alternativeText,
    width: privacyPolicy.value?.data.seo.shareImage.width,
    height: privacyPolicy.value?.data.seo.shareImage.height,
    type: privacyPolicy.value?.data.seo.shareImage.mime,
  },
  robots: privacyPolicy.value?.data.seo.robots,
  keywords: privacyPolicy.value?.data.seo.keywords,
  ogUrl: privacyPolicy.value?.data.seo.canonicalUrl,
});

const headingTitle = computed(() =>
  !privacyPolicy.value?.data.headingTitle
    ? ""
    : highlightSpecificWord({
        text: privacyPolicy.value?.data.headingTitle.title,
        word: privacyPolicy.value?.data.headingTitle.highlightWords.map(
          (w) => w.word,
        ),
        classNames: "text-secondary",
      }),
);
</script>
