<template>
  <li class="relative overflow-hidden">
    <div
      class="group relative flex aspect-video max-h-[230px] items-center justify-center rounded-app-radius md:max-h-[265px] lg:max-h-[285px] xl:max-h-[300px]"
    >
      <NuxtLink
        :href="`blogs/${article.slug}`"
        class="pointer-events-none absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 scale-150 items-center justify-center gap-2.5 rounded-full bg-app-black-secondary bg-opacity-60 px-4 py-3.5 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
      >
        <p class="text-nowrap text-lg text-white">عرض البلوج</p>
        <button
          type="button"
          class="flex size-7 items-center justify-center rounded-full bg-white p-1"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17L7 7M7 7V17M7 7H17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </NuxtLink>
      <img
        :src="article?.cover?.url || articleCoverPlaceholder"
        :alt="article?.cover?.alternativeText || article.title"
        class="mb-2 h-full w-full self-center justify-self-center object-contain"
      />
    </div>
    <nav
      class="mb-2 mt-2 flex w-full max-w-full items-center gap-2 overflow-hidden"
    >
      <NuxtLink
        v-for="tag of article.tags"
        :key="tag.id"
        class="w-fit text-xs font-semibold text-secondary md:text-base"
        :href="`/blogs?tag=${tag.normalizedTagName}`"
        :style="{ maxWidth: `calc(100% / ${article.tags.length})` }"
        :title="tag"
      >
        <h3 class="w-full truncate">
          {{ tag.tagName }}
        </h3>
      </NuxtLink>
    </nav>
    <h4 class="mb-1 text-lg font-bold text-app-black-secondary md:text-xl">
      {{ article?.title }}
    </h4>
    <time class="text-xs font-semibold text-[#797979] md:text-sm">{{
      formatDate
    }}</time>
  </li>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import articleCoverPlaceholder from "~/assets/images/article-cover-placeholder.webp";
// import { PATHS } from "~/constants/paths";
import type { ArticleType } from "~/types/blogs";
const route = useRoute();
const props = defineProps<{ article: ArticleType }>();
const lang = shallowRef("ar-SA");
const formatDate = useDateFormat(
  props.article.createdAt,
  "YYYY-MM-DD HH:mm dddd",
  { locales: lang },
);
</script>
