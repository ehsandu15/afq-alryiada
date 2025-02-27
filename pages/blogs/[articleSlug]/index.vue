<template>
  <section
    class="app-container container flex flex-col items-center justify-center"
  >
    <time
      :datetime="articleDetails?.data.at(0)?.createdAt"
      class="mt-8 text-base font-medium opacity-40 lg:mt-[65px]"
      >{{ dateFormatted }}</time
    >
    <h2
      class="mt-3 w-full text-center text-2xl font-extrabold leading-[44px] text-app-black-secondary md:text-4xl lg:text-[40px] lg:leading-[58px]"
    >
      {{ articleDetails?.data.at(0)?.title }}
    </h2>
    <ul
      class="mt-4 flex flex-wrap items-center justify-center gap-5 divide-x-0 divide-secondary max-md:gap-6 lg:divide-x-2"
    >
      <li
        v-if="articleDetails?.data.at(0)?.keywords"
        v-for="keyword of articleDetails?.data.at(0)?.keywords"
        class="border-e-0 border-secondary last:!border-e-0 lg:border-e-2 lg:px-4"
      >
        <p class="text-xl font-semibold leading-[28px] text-secondary">
          {{ keyword.title }}
        </p>
      </li>
    </ul>
    <ul class="mt-7 flex items-center justify-center gap-6">
      <SocialShare
        v-for="item of SHARE_SOCIAL_LIST"
        :network="item.network"
        :label="false"
        class="rounded-full bg-secondary p-2 text-white transition-transform hover:-translate-y-1 hover:scale-110"
      />
    </ul>
    <div
      class="flex w-full flex-col items-center justify-center sm:w-[95%] md:w-[80%] lg:w-[65] 2xl:w-[50%]"
    >
      <figure
        class="mb-[22px] mt-11 flex w-full items-center justify-center overflow-hidden rounded-app-radius"
      >
        <img
          :src="
            articleDetails?.data.at(0)?.cover
              ? imagePathPrefix(articleDetails?.data.at(0)?.cover?.url)
              : articleCoverPlaceholder
          "
          :alt="articleDetails?.data.at(0)?.cover?.alternativeText"
          class="aspect-video w-full rounded-app-radius object-cover"
        />
      </figure>
      <CodeBlockFC
        v-if="articleDetails?.data.at(0)?.content"
        :data="articleDetails?.data.at(0)?.content"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { ArticleType } from "~/types/blogs";
import articleCoverPlaceholder from "~/assets/images/article-cover-placeholder.webp";

const route = useRoute();
const shareFacebook = useSocialShare({
  network: "facebook", // Required!
  title: "My Custom Title", // Optional, available on networks supporting it
  user: "twitter_user", // Optional, available on networks supporting it
  hashtags: "list,of,hashtags", // Optional, available on networks supporting it
});
const { find } = useStrapi<ArticleType>();

const { data: articleDetails, status } = useAsyncData(
  `${STRAPI_ENDPOINT.ARTICLES}/${route.params.articleSlug}`,
  () =>
    find(STRAPI_ENDPOINT.ARTICLES, {
      filters: {
        slug: {
          $eqi: route.params.articleSlug,
        },
      },
      populate: {
        cover: true,
        keywords: true,
      },
    }),
);

const SHARE_SOCIAL_LIST = computed(() =>
  status.value !== "pending"
    ? [
        {
          network: "facebook",
        },
        {
          network: "twitter",
        },
        {
          network: "linkedin",
        },
        {
          network: "whatsapp",
        },
      ]
    : [],
);

useSeoMeta({
  title: articleDetails.value?.data.at(0)?.title,
  description: articleDetails.value?.data.at(0)?.description,
  ogType: "article",
  ogTitle: articleDetails.value?.data.at(0)?.title,
  ogDescription: articleDetails.value?.data.at(0)?.description,
  ogImage: imagePathPrefix(articleDetails.value?.data.at(0)?.cover?.url),
});

const dateFormatted = useDateFormat(
  articleDetails.value?.data.at(0)?.createdAt,
  "DD MMMM , YYYY",
  { locales: "ar-EG" },
);
</script>
