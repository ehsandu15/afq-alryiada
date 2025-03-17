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

const { data: privacyPolicy, status: privacyPolicyStatus } = await useAsyncData(
  () =>
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

watchEffect(() => {
  if (!privacyPolicy.value || privacyPolicyStatus.value !== "success") return;

  useServerSeoMeta({
    title: privacyPolicy.value?.data.seo?.metaTitle,
    description: privacyPolicy.value?.data.seo?.metaDescription,
    ogTitle: privacyPolicy.value?.data.seo?.metaTitle,
    ogDescription: privacyPolicy.value?.data.seo?.metaDescription,
  });
});
</script>
