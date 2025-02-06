<template>
  <section
    class="app-container container flex flex-wrap items-center justify-between gap-6 py-[60px]"
  >
    <div class="flex w-full flex-col py-6 lg:w-[calc(60%-1.5rem)]">
      <div v-motion="MOTION_FADE_DOWN_TOP" :duration="MOTION_DURATION">
        <AdvancedSectionHeading
          :title="content.techSectionTitle.title"
          icon-color-class="bg-[#30B0C7]"
          text-color-class="text-app-black-secondary"
          class="border-[#c7c7cc]"
        />
      </div>

      <span>
        <h2
          v-motion="MOTION_FADE_DOWN_SIMPLE"
          :duration="MOTION_DURATION"
          :delay="DELAY"
          class="mb-4 max-w-[350px] text-[36px] font-extrabold text-black md:max-w-fit md:text-center md:text-5xl"
          v-html="headingTitle"
        ></h2>
        <p
          v-motion="MOTION_FADE_DOWN"
          :delay="DELAY"
          :duration="MOTION_DURATION"
          class="text-sm font-medium text-black md:text-xl"
        >
          {{ content.techDescription }}
        </p>
      </span>
    </div>
    <ul
      class="grid w-full grid-cols-2 gap-[17px] md:gap-2 lg:w-[calc(40%-1.5rem)]"
    >
      <li
        v-for="(image, index) of content.technologies_lists"
        v-motion="index <= 1 ? MOTION_FADE_DOWN_TOP : MOTION_FADE_TOP_SIMPLE"
        :duration="MOTION_DURATION"
        :delay="index <= 1 ? DELAY : undefined"
        class="flex h-[84px] items-center justify-center rounded-app-radius border border-[#C7C7CC] lg:w-[192px]"
      >
        <img
          :src="image?.image.at(0)?.url"
          :alt="image.image.at(0)?.alternativeText"
        />
      </li>
      <!-- <li
        v-motion="MOTION_FADE_DOWN_TOP"
        :duration="MOTION_DURATION"
        :delay="DELAY"
        class="flex h-[84px] items-center justify-center rounded-app-radius border border-[#C7C7CC] lg:w-[192px]"
      >
        <img :src="wordpressIcon" alt="wordpress.svg" />
      </li>
      <li
        v-motion="MOTION_FADE_TOP_SIMPLE"
        :duration="MOTION_DURATION"
        class="flex h-[84px] items-center justify-center rounded-app-radius border border-[#C7C7CC] lg:w-[192px]"
      >
        <img :src="flutterIcon" alt="flutter.svg" />
      </li>
      <li
        v-motion="MOTION_FADE_TOP_SIMPLE"
        :duration="MOTION_DURATION"
        class="flex h-[84px] items-center justify-center rounded-app-radius border border-[#C7C7CC] lg:w-[192px]"
      >
        <img :src="odooIcon" alt="odoo.svg" />
      </li> -->
    </ul>
  </section>
</template>
<script setup lang="ts">
// import oracleIcon from "~/assets/images/technologies/oracle.svg";
// import wordpressIcon from "~/assets/images/technologies/wordpress.svg";
// import odooIcon from "~/assets/images/technologies/odoo.svg";
// import flutterIcon from "~/assets/images/technologies/flutter.svg";
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
const headingTitle = computed(() =>
  highlightSpecificWord({
    text: props.content.techHeadingTitle,
    word: "الخاصة",
    classNames: "text-app-black-third",
  }),
);
</script>
