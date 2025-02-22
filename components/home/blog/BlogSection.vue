<template>
  <section
    data-section="true"
    class="app-container container flex min-h-[60vh] flex-col bg-white py-[60px]"
    :id="SECTIONS_IDS.BLOG"
  >
    <div class="flex flex-col gap-4">
      <h2
        class="text-right text-5xl font-extrabold"
        v-html="highlightHeading"
        :duration="MOTION_DURATION"
        v-motion="{
          initial: { opacity: 0, x: 250 },
          visibleOnce: { opacity: 1, x: 0 },
          leave: { opacity: 0, x: 250 },
        }"
      ></h2>
      <span class="flex items-center justify-between gap-3">
        <p
          v-motion="{
            initial: { opacity: 0, x: 250 },
            visibleOnce: { opacity: 1, x: 0 },
            leave: { opacity: 0, x: 250 },
          }"
          :duration="MOTION_DURATION"
          class="text-right text-xl font-medium text-app-black-secondary"
        >
          {{ content.blogDescription }}
        </p>
        <NuxtLink
          :href="content.blogShowMoreBtn.href"
          class="hidden items-center justify-center rounded-full border border-[#C7C7CC] p-1 lg:flex"
          v-motion="{
            initial: { opacity: 0, x: 250 },
            visibleOnce: { opacity: 1, x: 0 },
            leave: { opacity: 0, x: 250 },
          }"
          :duration="MOTION_DURATION"
        >
          <p
            class="px-[10px] py-[7.5px] font-semibold text-app-black-secondary"
          >
            {{ content.blogShowMoreBtn.title }}
          </p>
          <img
            :src="content.blogShowMoreBtn.media?.url"
            :alt="content.blogShowMoreBtn.media?.alternativeText"
          />
        </NuxtLink>
      </span>
    </div>
    <div class="flex w-full flex-col">
      <ul
        class="grid w-full grid-cols-1 gap-8 pt-[45px] md:grid-cols-2 lg:grid-cols-3"
      >
        <BlogCard
          v-motion="
            index === 2
              ? undefined
              : {
                  initial: { opacity: 0, x: 150 },
                  visibleOnce: { opacity: 1, x: 0 },
                  leave: { opacity: 0, x: 150 },
                }
          "
          v-for="(article, index) of content.articles"
          v-bind:article
          :duration="MOTION_DURATION"
          :key="index"
          :delay="index === 2 ? 0 : index * 200"
        />
      </ul>
      <NuxtLink
        :href="content.blogShowMoreBtn.href"
        class="mt-12 flex items-center justify-center rounded-full border border-[#C7C7CC] p-1 lg:hidden"
        v-motion="{
          initial: { opacity: 0, x: 250 },
          visibleOnce: { opacity: 1, x: 0 },
          leave: { opacity: 0, x: 250 },
        }"
        :duration="MOTION_DURATION"
      >
        <p class="px-[10px] py-[7.5px] font-semibold text-app-black-secondary">
          {{ content.blogShowMoreBtn.title }}
        </p>
        <img
          :src="content.blogShowMoreBtn.media?.url"
          :alt="content.blogShowMoreBtn.media?.alternativeText"
        />
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
// import arrowIcon from "~/assets/images/blog/arrow.svg";
// import { ARTICLES } from "~/constants/app-data";
import BlogCard from "~/components/BlogCard.vue";
import { MOTION_DURATION } from "~/constants/motion-config";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import type { BlogSectionType } from "~/types/home-page";

const props = defineProps<{ content: BlogSectionType }>();
const highlightHeading = computed(() =>
  highlightSpecificWord({
    text: props.content.blogHeaingTitle,
    word: "المقالات",
    classNames: "text-secondary",
  }),
);
</script>
