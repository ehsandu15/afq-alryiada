<template>
  <li class="relative">
    <div
      class="group relative flex max-h-[230px] items-center justify-center md:max-h-[257px]"
    >
    
      <p
        class="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 rounded-full bg-app-black-secondary bg-opacity-50 px-[15px] py-[10px] opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
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
      </p>
      <img :src="article?.mediaUrl" :alt="article?.title" class="mb-2" />
    </div>
    <nav class="mb-2 flex items-center gap-2">
      <p
        v-for="keyword of article?.keywords"
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
      }).format(new Date(article?.date) || new Date())
    }}</time>
  </li>
</template>
<script setup lang="ts">
import arrowIcon from "~/assets/images/shared/arrow-up.svg";
import { PATHS } from "~/constants/paths";
const props = defineProps({
  article: Object,
});

const HREF = `$${PATHS.BLOG}/${props.article?.href || "#"}`;
</script>
