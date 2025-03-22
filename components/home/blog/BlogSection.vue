<template>
  <section
    data-section="true"
    class="app-container container flex min-h-[60vh] flex-col bg-white py-[60px]"
    :id="content?.blogsId?.elementId"
  >
    <div class="flex flex-col items-start gap-4">
      <HeadingHighlightedTitle
        :title="props.content.blogHeaingTitle.title"
        :words="props.content.blogHeaingTitle.highlightWords.map((w) => w.word)"
        main-text-color-class-name="text-app-black-secondary"
        marked-text-color-class-name="text-secondary"
        :duration="MOTION_DURATION"
        v-motion="{
          initial: { opacity: 0, x: 250 },
          visibleOnce: { opacity: 1, x: 0 },
          leave: { opacity: 0, x: 250 },
        }"
        class="max-w-full text-right text-5xl font-extrabold"
      />

      <span class="flex w-full items-center justify-between gap-3">
        <p
          v-motion="{
            initial: { opacity: 0, x: 250 },
            visibleOnce: { opacity: 1, x: 0 },
            leave: { opacity: 0, x: 250 },
          }"
          :duration="MOTION_DURATION"
          class="w-fit max-w-full text-start text-xl font-medium text-app-black-secondary"
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
          <NuxtImg
            :src="content.blogShowMoreBtn.media?.url"
            :alt="content.blogShowMoreBtn.media?.alternativeText"
            width="36"
            height="36"
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
        <NuxtImg
          :src="content.blogShowMoreBtn.media?.url"
          :alt="content.blogShowMoreBtn.media?.alternativeText"
          width="36"
          height="36"
        />
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import BlogCard from "~/components/BlogCard.vue";
import { MOTION_DURATION } from "~/constants/motion-config";
import type { BlogSectionType } from "~/types/home-page";

const props = defineProps<{ content: BlogSectionType }>();
</script>
