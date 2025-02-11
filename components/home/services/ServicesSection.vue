<template>
  <section
    class="flex min-h-screen w-full flex-col items-center justify-center bg-[#2444530D]"
    :id="content.servicesId.elementId"
  >
    <AdvancedSectionHeading
      icon-color-class="bg-secondary"
      :title="content.servicesSectionTitle.title"
      text-color-class="text-app-black-secondary"
      :class="clsx(`!border-[#C7C7CC]`)"
    />
    <h3
      v-html="headingTitle"
      class="my-4 text-center text-[36px] leading-[52px] md:text-5xl md:font-extrabold"
    ></h3>
    <p
      class="mb-11 max-w-[350px] text-center text-[20px] font-medium leading-[32px] text-app-black-secondary md:max-w-full md:text-lg"
    >
      {{ content.servicesDescription }}
    </p>
    <Carousel
      ref="carouselRef"
      class="app-container container mb-4 pb-9 lg:px-0"
      snap-align="start"
      items-to-show="6.3"
      :items-to-scroll="1"
      :gap="32"
      breakpoint-mode="viewport"
      :pause-autoplay-on-hover="true"
      :mouse-drag="true"
      :transition="600"
      :touch-drag="true"
      slide-effect="slide"
      :dir="appDir"
      :breakpoints="{
        300: {
          itemsToShow: 2.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 27,
        },
        768: {
          itemsToShow: 3.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 27,
        },
        922: {
          itemsToShow: 4.5,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 30,
        },
        1024: {
          itemsToShow: 6.5,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 32,
        },
      }"
    >
      <Slide
        v-for="(service, index) of content.services_lists"
        :key="service.id"
      >
        <HomeServicesServiceCard
          :class="clsx({ active: service.id === selectedService?.id })"
          @click="handleSelectService(service)"
          :service="service"
          :index="index"
          :is-slide-mounted="Boolean(carouselRef)"
        >
        </HomeServicesServiceCard>
      </Slide>
      <template #addons>
        <CarouselPagination />
      </template>
    </Carousel>

    <div
      class="app-container container mb-12 grid grid-cols-1 items-start justify-between gap-5 px-4 md:grid-cols-2 md:px-0"
    >
      <h4
        class="order-2 h-full max-h-full w-full overflow-x-auto text-xl font-semibold leading-[37.48px] md:order-2"
      >
        {{ selectedService?.content }}
      </h4>
      <figure
        class="order-1 flex h-[323px] w-full items-center justify-center overflow-hidden rounded-app-radius md:order-2"
      >
        <img
          :src="selectedService?.cover?.url"
          :alt="selectedService?.cover?.url"
          class="h-full w-full rounded-app-radius object-cover md:max-w-full"
        />
      </figure>
    </div>
    <div
      class="app-container container mb-[80px] mt-[60px] flex flex-col items-center justify-center"
    >
      <h2
        v-html="joinToUsText"
        v-motion="{
          initial: { opacity: 0, y: -150 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
        class="mb-4 text-center text-5xl font-extrabold leading-[61px] text-app-black-secondary lg:text-[56px]"
      ></h2>
      <p
        class="mb-8 px-4 text-center text-base font-medium leading-[29px] text-app-black-secondary md:text-lg lg:max-w-[925px]"
        v-motion="{
          initial: { opacity: 0, y: -100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :delay="100"
        :duration="MOTION_DURATION"
      >
        {{ content.servicesSecondaryDescription }}
      </p>
      <NuxtLink
        class="btn btn-primary"
        :href="content.servicesContactBtn.href"
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :delay="130"
        :duration="MOTION_DURATION"
      >
        <p>{{ content.servicesContactBtn.title }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import clsx from "clsx";
import type { ServiceType } from "~/types/services";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import { MOTION_DURATION } from "~/constants/motion-config";
// import { PATHS } from "~/constants/paths";
const carouselRef = ref<HTMLDivElement | null>(null);
import type { ServicesSectionType } from "~/types/home-page";
import {
  Carousel,
  Slide,
  Pagination as CarouselPagination,
} from "vue3-carousel";
import "vue3-carousel/carousel.css";
import { theme } from "#tailwind-config";

const props = defineProps<{ content: ServicesSectionType }>();
const { appDir } = useAppDir();

const selectedService = ref<ServiceType | undefined>(
  props.content.services_lists.at(0),
);

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: props.content.servicesHeadingTitle,
    word: "خدمات",
    classNames: "text-app-black-third",
  }),
);

const joinToUsText = computed(() =>
  highlightSpecificWord({
    text: props.content.servicesSecondaryHeading,
    word: "اليوم!",
    classNames: "!text-secondary",
  }),
);

function handleSelectService(service: ServiceType) {
  selectedService.value = service;
}
</script>

<style scoped lang="css">
.carousel {
  --vc-pgn-background-color: #b8b8b8a0;
  --vc-pgn-active-color: v-bind(theme?.colors?.secondary || "#162F3B");
}
</style>
