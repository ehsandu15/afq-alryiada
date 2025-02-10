<template>
  <section
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F8F9F9] pb-[60px]"
    :id="SECTIONS_IDS.TESTIMONIALS"
  >
    <div
      class="absolute left-0 top-0 grid w-full grid-cols-3 items-center justify-between overflow-x-hidden py-[60px]"
    >
      <img
        :src="content.testimonialsPeoplesPatternImg?.url"
        :alt="content.testimonialsPeoplesPatternImg?.alternativeText"
        class="translate-x-[25%]"
      />
      <span></span>
      <img
        :src="content.testimonialsPeoplesPatternImg?.url"
        :alt="content.testimonialsPeoplesPatternImg?.alternativeText"
        class="-translate-x-[25%]"
      />
    </div>
    <AdvancedSectionHeading
      :title="content.testimonialsSectionTitle.title"
      icon-color-class="bg-[#FF9500]"
      class="mt-[60px] border-app-black-third"
      text-color-class="text-app-black-secondary"
    />
    <h3
      v-html="headingTitle"
      class="mb-[60px] mt-4 max-w-[572px] text-center text-4xl font-extrabold capitalize text-app-black-secondary max-md:px-4 md:text-5xl"
    ></h3>
    <!-- FIXME: fix embla carousel glitch -->
    <div class="embla mb-8" ref="emblaFirstSliderRef">
      <ul class="embla__container">
        <HomeTestimonialsTestimonialCard
          v-for="(comment, index) of content.testimonials_lists.slice(0, 3)"
          v-bind:comment
          :key="comment.documentId"
          class="embla__slide"
          :class="clsx({ active: index === 1 })"
        />
      </ul>
    </div>
    <div class="embla" ref="emblaSecondSliderRef">
      <ul class="embla__container">
        <HomeTestimonialsTestimonialCard
          v-for="comment of content.testimonials_lists.slice(4)"
          v-bind:comment
          :key="comment.documentId"
          class="embla__slide"
        />
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
// import { COMMENTS } from "~/constants/app-data";
// import backgroundPeoples from "~/assets/images/testimonials/bg-peoples.svg";
import emblaCarouselVue from "embla-carousel-vue";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import type { MotionVariants } from "@vueuse/motion";
import type { TestimonialsSectionType } from "~/types/home-page";

const { appDir } = useAppDir();

const [emblaFirstSliderRef, firstSliderEmblaOptions] = emblaCarouselVue(
  {
    loop: true,
    align: "start",
    active: true,
    direction: "ltr",
    duration: 3000,
    containScroll: false,
  },
  [
    Autoplay({
      stopOnMouseEnter: true,
      active: true,
      playOnInit: true,
    }),
  ],
);
const [emblaSecondSliderRef, secondSliderEmblaOptions] = emblaCarouselVue(
  {
    loop: true,
    align: "end",
    direction: appDir.value,
    duration: 3000,
    containScroll: false,
  },
  [
    Autoplay({
      stopOnMouseEnter: true,
      active: true,
      playOnInit: true,
    }),
  ],
);

const props = defineProps<{ content: TestimonialsSectionType }>();

const FIRST_SLIDER_MOTIONS_VARIANTS = ref<MotionVariants<any>>({
  initial: { opacity: 0, x: 250 },
  visibleOnce: { opacity: 1, x: 0 },
});
const SECOND_SLIDER_MOTIONS_VARIANTS = ref<MotionVariants<any>>({
  initial: { opacity: 0, x: -250 },
  visibleOnce: { opacity: 1, x: 0 },
});

const motionFirstSlider = useMotion(
  emblaFirstSliderRef,
  FIRST_SLIDER_MOTIONS_VARIANTS,
);
const motionSecondSlider = useMotion(
  emblaSecondSliderRef,
  SECOND_SLIDER_MOTIONS_VARIANTS,
);

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: props.content.testimonialsHeadingTitle,
    word: ["أراء", "العملاء"],
    classNames: "text-app-black-third",
  }),
);
</script>
<style scoped lang="css">
.embla {
  overflow: hidden;
  width: 100%;
  padding-inline: 1.5rem;
}

@media (min-width: 768px) {
  .embla {
    width: 100%;
  }
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 33%;
  max-width: 100%;
  user-select: none;
}

.embla__slide {
  margin-right: 32px;
}
</style>
