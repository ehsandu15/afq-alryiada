<template>
  <section
    data-section="true"
    class="app-container container flex flex-wrap items-center justify-between gap-6 py-5 md:py-[26px] lg:py-[30px]"
    :id="content?.technologiesId?.elementId"
  >
    <div class="flex w-full flex-col lg:py-6 xl:w-[calc(60%-1.5rem)]">
      <div v-motion="MOTION_FADE_DOWN_TOP" :duration="MOTION_DURATION">
        <AdvancedSectionHeading
          :title="content.techSectionTitle.title"
          icon-color-class="bg-[#30B0C7]"
          text-color-class="text-app-black-secondary"
          class="border-[#c7c7cc]"
        />
      </div>

      <span class="flex flex-col items-start justify-between">
        <HeadingHighlightedTitle
          :title="content.techHeadingTitle.title"
          :words="content.techHeadingTitle.highlightWords.map((w) => w.word)"
          main-text-color-class-name="text-app-black-secondary"
          marked-text-color-class-name="opacity-50"
          v-motion="MOTION_FADE_DOWN_SIMPLE"
          :duration="MOTION_DURATION"
          class="mb-4 max-w-[350px] text-[36px] font-extrabold md:max-w-fit md:text-center xl:text-5xl"
        />

        <p
          v-motion="MOTION_FADE_DOWN"
          :delay="DELAY"
          :duration="MOTION_DURATION"
          class="text-sm font-medium text-black xl:text-xl"
        >
          {{ content.techDescription }}
        </p>
      </span>
    </div>
    <ul
      class="grid w-full grid-cols-2 gap-[17px] md:mt-[60px] md:gap-5 xl:w-[calc(40%-1.5rem)] xl:gap-3.5"
    >
      <li
        v-for="(image, index) of content.technologies_lists"
        v-motion="index <= 1 ? MOTION_FADE_DOWN_TOP : MOTION_FADE_TOP_SIMPLE"
        :duration="MOTION_DURATION"
        :delay="index <= 1 ? DELAY : undefined"
        class="flex h-24 items-center justify-center rounded-app-radius border border-[#C7C7CC] lg:h-[84px] xl:w-[192px]"
      >
        <NuxtImg
          :src="image?.image.at(0)?.url"
          :alt="image.image.at(0)?.alternativeText"
          width="64"
          height="84"
          class="max-h-full object-cover"
        />
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { MOTION_DURATION } from "~/constants/motion-config";
import type { TechSectionType } from "~/types/home-page";

const props = defineProps<{ content: TechSectionType }>();
const DELAY = 100;
const MOTION_FADE_TOP_SIMPLE = {
  initial: { opacity: 0, y: 5 },
  visibleOnce: { opacity: 1, y: 0 },
};
const MOTION_FADE_DOWN_SIMPLE = {
  initial: { opacity: 0, y: -5 },
  visibleOnce: { opacity: 1, y: 0 },
};
const MOTION_FADE_DOWN = {
  initial: { opacity: 0, y: -40 },
  visibleOnce: { opacity: 1, y: 0 },
};
const MOTION_FADE_DOWN_TOP = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0 },
};
</script>
