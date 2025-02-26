<template>
  <section
    data-section="true"
    class="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    v-motion="{
      initial: { backgroundColor: theme.colors.secondary },
      visibleOnce: { backgroundColor: theme.colors.white },
    }"
    :id="content?.cooperationId?.elementId"
    :duration="MOTION_DURATION + 200"
  >
    <div class="mb-11 mt-20 flex flex-col items-center justify-center">
      <h3
        v-html="headingTitle"
        class="z-10 mb-3 max-w-[350px] text-center text-[40px] font-extrabold leading-normal text-app-black-secondary md:max-w-fit md:font-bold lg:leading-[75px]"
        v-motion="{
          initial: { opacity: 0, scale: 3.1, y: 65 },
          visibleOnce: { opacity: 1, scale: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
      ></h3>

      <p
        class="app-container container text-center font-medium text-app-black-secondary"
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
        :delay="HEADING_MOTION_DELAY"
      >
        {{ props.content.cooperationDescription }}
      </p>
    </div>
    <ul
      class="app-container container grid grid-cols-1 gap-4 pb-16 md:grid-cols-2 xl:grid-cols-3"
    >
      <li
        class="relative flex flex-col justify-stretch gap-4 overflow-hidden rounded-app-radius p-8 max-md:order-1"
        v-for="(item, index) of content.cooperation_lists"
        :class="
          clsx(
            index === 0 ? 'md:col-span-2' : undefined,
            index === 0 ? 'lg:min-h-[372px]' : 'min-h-[372px]',
            index === 1 ? 'bg-[#B8AFC0]' : 'bg-app-black-secondary',
          )
        "
        v-motion="
          index <= 1
            ? {
                initial: { opacity: 0 },
                visibleOnce: { opacity: 1 },
              }
            : {
                initial: { opacity: 0, y: -120 },
                visibleOnce: { opacity: 1, y: 0 },
              }
        "
        :duration="MOTION_DURATION"
        :delay="HEADING_MOTION_DELAY"
      >
        <img
          v-if="item.cover"
          :src="item.cover.url"
          :alt="item.cover.alternativeText"
          class="absolute rounded-app-radius object-cover"
          :class="
            clsx(index === 1 ? 'bottom-0 left-0' : 'inset-0 h-full w-full')
          "
        />
        <h4
          v-if="item.title"
          class="text- isolate mb-6 text-[32px] font-extrabold text-white"
        >
          {{ item.title }}
        </h4>
        <p
          v-if="item.description"
          class="isolate mb-[30px] text-[24px] font-semibold text-white"
        >
          {{ item.description }}
        </p>
        <div
          class="isolate flex flex-wrap items-center justify-start gap-6 md:gap-3"
          v-if="item.ishasActions"
        >
          <NuxtLink
            href="#"
            class="flex items-center justify-center gap-3 rounded-full bg-secondary px-6 py-2 max-md:flex-grow"
          >
            <p class="text-center text-lg font-semibold text-white">
              {{ item.primaryAction?.title }}
            </p>
            <img
              :src="item.primaryAction?.media?.url"
              :alt="item.primaryAction?.media?.alternativeText"
            />
          </NuxtLink>
          <NuxtLink
            :href="item.secondaryAction?.href"
            class="flex items-center justify-center gap-3 rounded-full bg-white px-6 py-2 text-black max-md:flex-grow"
          >
            <p class="text-center text-lg font-semibold">
              {{ item.secondaryAction?.title }}
            </p>
          </NuxtLink>
        </div>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import { MOTION_DURATION } from "~/constants/motion-config";
import { theme } from "#tailwind-config";
import type { CooperationSectionType } from "~/types/home-page";
import clsx from "clsx";

const props = defineProps<{ content: CooperationSectionType }>();
const HEADING_MOTION_DELAY = 550;
const headingTitle = computed(() =>
  !props.content.cooperationHeadingTitle
    ? ""
    : highlightSpecificWord({
        text: props.content.cooperationHeadingTitle.title,
        word: props.content.cooperationHeadingTitle.highlightWords.map(
          (w) => w.word,
        ),
        classNames: "text-app-black-third",
      }),
);
</script>
