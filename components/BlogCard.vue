<template>
  <li class="relative">
    <div
      class="group relative rounded-app-radius flex max-h-[230px] items-center justify-center md:max-h-[257px] overflow-hidden"
    >
    
      <NuxtLink
        :href="article.title"
        class="absolute top-1/2 left-1/2 bg-app-black-secondary bg-opacity-60 scale-150 group-hover:scale-100 backdrop-blur-md px-4 py-3.5 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-500  flex items-center justify-center gap-2.5 rounded-full"
      >
        <p class="text-lg text-white">عرض البلوج</p>
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
      <img :src="article?.cover.url" :alt="article?.cover.alternativeText" class="mb-2 w-full object-cover self-center justify-self-center" />
    </div>
    <nav class="mb-2 flex items-center gap-2">
      <p
        v-for="keyword of keywordArray"
        :key="keyword"
        class="text-xs font-semibold text-secondary md:text-base"
      >
        <h3>{{ keyword }}</h3>
      </p>
      <!-- TODO: un-comment after setup strapi -->
      <!-- <NuxtLink
        v-for="keyword of article?.keywords"
        :href="`${PATHS.BLOG}?keyword=${keyword}`"
        :key="keyword"
        class="text-xs font-semibold text-secondary md:text-base"
      >
        <h3>{{ keyword }}</h3>
      </NuxtLink> -->
    </nav>
    <h4 class="mb-1 text-lg font-bold text-app-black-secondary md:text-xl">
      {{ article?.title }}
    </h4>
    <time class="text-xs font-semibold text-[#797979] md:text-sm">{{
      Intl.DateTimeFormat("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(article?.createdAt) || new Date())
    }}</time>
  </li>
</template>
<script setup lang="ts">
import { PATHS } from "~/constants/paths";
import type { ArticleType } from "~/types/article";
const props = defineProps<{article: ArticleType}>();
const keywordArray = computed(()=> props.article?.keywords?.trim()?.split(",") || [])
const HREF = `$${PATHS.BLOG}/${props.article?.title || "#"}`;
</script>
