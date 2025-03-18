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
    <div class="app-container container">
      <ClientOnly>
        <swiper-container
          ref="carouselRef"
          class="carousel-overflow-indicators"
          :class="
            clsx({
              'before:!pointer-events-none before:!from-transparent':
                isShownFirstSlide,
              'after:!pointer-events-none after:!from-transparent':
                isShownLastSlide,
            })
          "
        >
          <swiper-slide
            v-for="(service, index) of content.services_lists"
            :key="service.id || index"
          >
            <HomeServicesServiceCard
              :class="clsx({ active: service.id === selectedService?.id })"
              @click="handleSelectService(service)"
              :service="service"
              :index="index"
              :is-slide-mounted="Boolean(carouselRef)"
              v-intersect="{
                callback: (entry: IntersectionObserverEntry) =>
                  intersectHandler(entry, index),
                options: { threshold: 0.8 },
              }"
            >
            </HomeServicesServiceCard>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <!-- <Carousel
        ref="carouselRef"
        is="ol"
        class="carousel-overflow-indicators"
        :class="
          clsx({
            'before:!pointer-events-none before:!from-transparent':
              isShownFirstSlide,
            'after:!pointer-events-none after:!from-transparent':
              isShownLastSlide,
          })
        "
        snap-align="center-odd"
        items-to-show="6.3"
        :items-to-scroll="1"
        :gap="32"
        breakpoint-mode="viewport"
        :pause-autoplay-on-hover="true"
        :mouse-drag="true"
        :transition="400"
        :touch-drag="true"
        slide-effect="slide"
        :dir="appDir"
        :breakpoints="breakpoints as Breakpoints"
      >
        <Slide
          v-for="(service, index) of content.services_lists"
          :key="service.id"
          v-intersect="{
            callback: (entry: IntersectionObserverEntry) =>
              intersectHandler(entry, index),
            options: { threshold: 1, root: carouselRef?.parentElement },
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
      </Carousel> -->
    </div>
    <div
      class="app-container mt-7 grid gap-5 tablet:grid-cols-2"
      style="grid-template-rows: repeat(2, minmax(0, auto))"
    >
      <figure class="overflow-hidden rounded-app-radius">
        <img
          :src="selectedService?.cover?.url"
          :alt="selectedService?.cover?.url"
          class="aspect-video h-full w-full rounded-app-radius object-cover max-md:h-[275px] md:max-w-full"
        />
      </figure>
      <h4
        class="text-justify text-lg font-semibold leading-[37.48px] tablet:self-center lg:text-xl"
      >
        {{ selectedService?.content }}
      </h4>
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
import type { ServicesSectionType } from "~/types/home-page";
import { Carousel, Slide } from "vue3-carousel";

import "vue3-carousel/carousel.css";

const carouselRef = ref(null);
const isShownFirstSlide = ref<boolean>(true);
const isShownLastSlide = ref<boolean>(false);
const intersectHandler = (entry: IntersectionObserverEntry, idx: number) => {
  let timeoutRef;
  if (timeoutRef) clearTimeout(timeoutRef);
  if (idx === props.content.services_lists.length - 1) {
    // timeoutRef = setTimeout(() => {
    // }, 100);
    // Last Slide
    if (entry.isIntersecting) {
      // visible
      isShownLastSlide.value = true;
    } else {
      // invisible
      isShownLastSlide.value = false;
    }
  } else {
    // timeoutRef = setTimeout(() => {
    // }, 100);
    // First Slide
    if (entry.isIntersecting) {
      // visible
      isShownFirstSlide.value = true;
    } else {
      // invisible
      isShownFirstSlide.value = false;
    }
  }
};
const props = defineProps<{ content: ServicesSectionType }>();
const { appDir } = useAppDir();
useSwiper(carouselRef, {
  mousewheel: {
    enabled: true,
    sensitivity: 50,
  },
  direction: appDir.value,
  initialSlide: 0,
  breakpoints: {
    300: {
      slidesPerView: 1.4,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.4,
      spaceBetween: 27,
    },
    922: {
      slidesPerView: 3.4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4.4,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4.4,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 4.4,
      spaceBetween: 12,
    },
  },
});
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

.carousel-overflow-indicators {
  @apply before:absolute before:right-0 before:top-0 before:z-20 before:h-full before:w-9 before:bg-opacity-25 before:bg-gradient-to-l before:from-neutral-400/20 before:transition-all before:content-[''] after:absolute after:left-0 after:top-0 after:z-20 after:h-full after:w-9 after:bg-opacity-25 after:bg-gradient-to-r after:from-neutral-400/20 after:transition-all after:content-[''] md:px-0 before:md:w-8 before:md:from-neutral-500/35 after:md:w-8 after:md:from-neutral-500/35;
}
</style>
