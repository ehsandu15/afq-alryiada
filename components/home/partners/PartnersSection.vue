<template>
  <section
    class="flex min-h-[50vh] w-full flex-col items-center justify-center bg-white pb-[20px] pt-[26px]"
  >
    <h2
      v-html="headingTitle"
      class="mb-11 text-center text-2xl font-extrabold md:text-[36px]"
    ></h2>

    <Carousel
      class="hidden w-full md:flex"
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
      :breakpoints="{
        768: {
          itemsToShow: 3.3,
          snapAlign: 'center-even',
        },
        992: {
          itemsToShow: 4.3,
          snapAlign: 'center-even',
        },
        1280: {
          itemsToShow: 5.6,
          snapAlign: 'center-even',
        },
      }"
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
        <img
          v-if="partner.logo.url"
          :src="imagePathPrefix(partner.logo.url)"
          :alt="partner.logo.alternativeText"
          class="h-full object-contain grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </Slide>
    </Carousel>

    <!-- Partners list in Small screens -->
    <ul
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
        <img
          v-if="partner.logo.url"
          :src="imagePathPrefix(partner.logo.url)"
          :alt="partner.logo.alternativeText"
          class="h-full object-contain grayscale transition-[filter] duration-500 hover:grayscale-0"
        />
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
// import { PARTNERS } from "~/constants/app-data";
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

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: props.content.partnersHeaingtitle,
    word: "النجاح",
    classNames: "text-[#797979]",
  }),
);
</script>

<style scoped lang="css">
/* .embla {
  overflow: hidden;
  width: 100%;
  display: none;
  position: relative;
}
@media (min-width: 768px) {
  .embla {
    display: block;
  }
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 50%;
  max-width: 100%;
  user-select: none;
  cursor: grab;
}

@media (min-width: 768px) {
  .embla__slide {
    margin-right: 90px;
    flex: 0 0 max-content;
  }
}
.embla__slide {
  margin-right: 90px;
} */
</style>
