<template>
  <section
    data-section="true"
    class="flex min-h-screen w-full flex-col items-center justify-center bg-[#2444530D]"
    :id="content?.servicesId?.elementId"
  >
    <AdvancedSectionHeading
      icon-color-class="bg-secondary"
      :title="content.servicesSectionTitle.title"
      text-color-class="text-app-black-secondary"
      :class="clsx(`!border-[#C7C7CC]`, 'mt-8 md:mt-[60px]')"
    />
    <HeadingHighlightedTitle
      :title="content.servicesHeadingTitle.title"
      :words="content.servicesHeadingTitle.highlightWords?.map((w) => w.word)"
      markedTextColorClassName="text-app-black-third"
      mainTextColorClassName="text-app-black-secondary"
      class="my-4 text-center text-[36px] leading-[52px] md:text-5xl md:font-extrabold"
    />
    <p
      class="app-container container mb-11 text-center text-[20px] font-medium leading-[32px] text-app-black-secondary md:text-lg"
    >
      {{ content.servicesDescription }}
    </p>
    <Carousel
      ref="carouselRef"
      class="app-container container relative mx-0 mb-4 w-full before:absolute before:right-0 before:top-0 before:z-20 before:h-full before:w-9 before:bg-opacity-25 before:bg-gradient-to-l before:from-neutral-400/60 before:transition-colors before:content-[''] after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-9 after:bg-opacity-25 after:bg-gradient-to-r after:from-neutral-400/60 after:transition-colors after:content-[''] max-lg:pb-9 md:px-0 before:md:w-8 before:md:from-neutral-400/25 after:md:w-8 after:md:from-neutral-400/25"
      :class="
        clsx({
          'before:!pointer-events-none before:!from-transparent':
            isShownFirstSlide,
          'after:!pointer-events-none after:!from-transparent':
            isShownLastSlide,
        })
      "
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
          itemsToShow: 1.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 15,
        },
        768: {
          itemsToShow: 2.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 27,
        },
        922: {
          itemsToShow: 3.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 30,
        },
        1024: {
          itemsToShow: 4.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 30,
        },
        1280: {
          itemsToShow: 4.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 20,
        },
        1440: {
          itemsToShow: 4.4,
          itemsToScroll: 1,
          snapAlign: 'start',
          gap: 12,
        },
      }"
    >
      <Slide
        v-for="(service, index) of content.services_lists"
        :key="service.id"
        :data-first-slide="index === 0"
        :data-last-slide="index === content.services_lists?.length - 1"
        v-intersect="{
          callback: (entry: IntersectionObserverEntry) =>
            intersectHandler(entry, index),
          options: { threshold: 0.7, root: carouselRef },
        }"
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
    </Carousel>

    <div
      class="app-container container mb-12 grid grid-cols-1 items-start justify-between gap-5 px-0 lg:grid-cols-2"
    >
      <h4
        class="order-2 h-full max-h-full w-full max-w-full overflow-x-auto text-xl font-semibold leading-[37.48px] lg:order-2"
      >
        {{ selectedService?.content }}
      </h4>
      <figure
        class="order-1 flex h-[323px] w-full max-w-full items-center justify-center overflow-hidden rounded-app-radius lg:order-2"
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
      <HeadingHighlightedTitle
        :title="content.servicesSecondaryHeading.title"
        :words="
          content.servicesSecondaryHeading.highlightWords?.map((w) => w.word)
        "
        markedTextColorClassName="text-secondary"
        mainTextColorClassName="text-app-black-secondary"
        class="mb-4 text-center text-5xl font-extrabold leading-[61px] text-app-black-secondary lg:text-[56px]"
        v-motion="{
          initial: { opacity: 0, y: -150 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
      />
      <p
        class="mb-8 max-w-full px-4 text-center text-base font-medium leading-[29px] text-app-black-secondary md:text-lg lg:max-w-[925px]"
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

const isShownFirstSlide = ref<boolean>(true);
const isShownLastSlide = ref<boolean>(false);
const intersectHandler = (entry: IntersectionObserverEntry, idx: number) => {
  // First Slide
  if (entry.isIntersecting && idx === 0) {
    isShownFirstSlide.value = true;
  } else {
    isShownFirstSlide.value = false;
  }
  // Last Slide
  if (entry.isIntersecting && idx === props.content.services_lists.length - 1) {
    isShownLastSlide.value = true;
  } else {
    isShownLastSlide.value = false;
  }
};
const props = defineProps<{ content: ServicesSectionType }>();
const { appDir } = useAppDir();

const selectedService = ref<ServiceType | undefined>(
  props.content.services_lists.at(0),
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
