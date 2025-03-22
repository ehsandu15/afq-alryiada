<template>
  <section
    data-section="true"
    class="flex min-h-fit w-full flex-col items-center justify-center bg-white pb-[20px] pt-[26px]"
  >
    <HeadingHighlightedTitle
      :title="props.content.partnersHeaingtitle.title"
      :words="
        props.content.partnersHeaingtitle.highlightWords.map((w) => w.word)
      "
      main-text-color-class-name="text-app-black-secondary"
      marked-text-color-class-name="opacity-50"
      class="app-container container mb-11 text-center text-2xl font-extrabold md:text-[36px]"
    />

    <Carousel
      class="flex w-full max-lg:mb-10"
      v-motion="{
        initial: { opacity: 0, x: 350 },
        visibleOnce: { opacity: 1, x: 0 },
        leave: { opacity: 0, x: 350 },
      }"
      :delay="false"
      :duration="MOTION_DURATION"
      :autoplay="1000"
      snap-align="center-even"
      items-to-show="5.6"
      :items-to-scroll="1"
      :gap="90"
      breakpoint-mode="viewport"
      :breakpoints="breakpoints"
      :pause-autoplay-on-hover="true"
      :mouse-drag="true"
      :transition="3500"
      :touch-drag="true"
      slide-effect="slide"
      :wrap-around="true"
      :dir="appDir"
    >
      <Slide
        v-if="partnersList?.data"
        v-for="partner of partnersList.data"
        :key="partner.documentId"
      >
        <NuxtImg
          v-if="partner.logo.url"
          :src="imagePathPrefix(partner.logo.url)"
          :alt="partner.logo.alternativeText"
          width="128"
          height="128"
          class="h-full object-contain grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </Slide>
    </Carousel>

    <!-- Partners list in Small screens -->
    <!-- <ul
      class="mb-16 mt-8 grid grid-cols-2 items-center justify-center gap-[55px] px-6 md:hidden"
    >
      <li
        v-if="partnersList?.data"
        v-for="(partner, index) of partnersList.data"
        :key="partner.documentId"
        v-motion="{
          initial: { opacity: 0, y: 150 },
          visibleOnce: { opacity: 1, y: 0 },
          leave: { opacity: 0, y: 150 },
        }"
        :delay="index * 70"
        :duration="MOTION_DURATION"
        class="flex items-center justify-center"
      >
        <NuxtImg
          v-if="partner.logo.url"
          :src="imagePathPrefix(partner.logo.url)"
          :alt="partner.logo.alternativeText"
          class="h-full object-contain grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </li>
    </ul> -->
  </section>
</template>
<script setup lang="ts">
import { MOTION_DURATION } from "~/constants/motion-config";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type { PartnersType } from "~/types/partners";
import type { PartnersSectionType } from "~/types/home-page";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/carousel.css";

const { find } = useStrapi<PartnersType>();
const { data: partnersList } = useAsyncData(STRAPI_ENDPOINT.PARTNERS_LIST, () =>
  find(STRAPI_ENDPOINT.PARTNERS_LIST, {
    populate: {
      logo: true,
    },
  }),
);

const { appDir } = useAppDir();

const props = defineProps<{ content: PartnersSectionType }>();

const breakpoints: any = {
  230: {
    itemsToShow: 1.2,
    snapAlign: "center",
    gap: 15,
  },
  576: {
    itemsToShow: 2.5,
    snapAlign: "center",
    gap: 20,
  },
  768: {
    itemsToShow: 3.3,
    snapAlign: "center-even",
    gap: 60,
  },
  992: {
    itemsToShow: 4.3,
    snapAlign: "center-even",
    gap: 60,
  },
  1024: {
    itemsToShow: 5.3,
    snapAlign: "center-even",
    gap: 60,
  },
  1280: {
    itemsToShow: 6.6,
    snapAlign: "center-even",
    gap: 60,
  },
  1080: {
    itemsToShow: 9.6,
    snapAlign: "center-even",
    gap: 60,
  },
  2080: {
    itemsToShow: 11.6,
    snapAlign: "center-even",
    gap: 60,
  },
};
</script>
