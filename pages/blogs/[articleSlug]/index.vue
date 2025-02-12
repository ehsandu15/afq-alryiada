<template>
  <section
    class="app-container container flex flex-col items-center justify-center"
  >
    <time
      :datetime="articleDetails?.data.at(0)?.createdAt"
      class="mt-[65px] text-base font-medium opacity-40"
      >{{ dateFormatted }}</time
    >
    <h2
      class="mt-1 text-[40px] font-extrabold leading-[58px] text-app-black-secondary"
    >
      {{ articleDetails?.data.at(0)?.title }}
    </h2>
    <ul
      class="mt-3 flex items-center justify-center divide-x-2 divide-secondary"
    >
      <li
        v-if="articleDetails?.data.at(0)?.keywords"
        v-for="keyword of articleDetails?.data
          .at(0)
          ?.keywords.split($config.public.articleKeywordsSplitSymbol)"
        class="border-e-2 border-secondary px-4 last:!border-e-0"
      >
        <p class="text-xl font-semibold leading-[28px] text-secondary">
          {{ keyword }}
        </p>
      </li>
    </ul>
    <figure class="mb-[22px] mt-11 w-full overflow-hidden rounded-app-radius">
      <img
        :src="
          articleDetails?.data.at(0)?.cover
            ? imagePathPrefix(articleDetails?.data.at(0)?.cover?.url)
            : articleCoverPlaceholder
        "
        :alt="articleDetails?.data.at(0)?.cover?.alternativeText"
        class="aspect-video w-full object-cover"
      />
    </figure>

    <BlogsArticleContent
      v-if="articleDetails?.data.at(0)?.content"
      :content="articleDetails?.data.at(0)?.content"
    />
  </section>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { ArticleType } from "~/types/blogs";
import articleCoverPlaceholder from "~/assets/images/article-cover-placeholder.webp";

const route = useRoute();
const { find } = useStrapi<ArticleType>();
const { data: articleDetails } = useAsyncData(
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
      },
    }),
);

useSeoMeta({
  title: articleDetails.value?.data.at(0)?.title,
  description: articleDetails.value?.data.at(0)?.description,
});

const dateFormatted = useDateFormat(
  articleDetails.value?.data.at(0)?.createdAt,
  "DD MMMM , YYYY",
  { locales: "ar-EG" },
);
</script>
