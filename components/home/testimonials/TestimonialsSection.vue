<template>
  <section
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F8F9F9] pb-[60px]"
    :id="SECTIONS_IDS.TESTIMONIALS"
  >
    <div
      class="absolute left-0 top-0 flex w-full items-center justify-between overflow-x-hidden py-[60px]"
    >
      <img
        :src="backgroundPeoples"
        alt="bg-patterns.svg"
        class="translate-x-[25%]"
      />
      <img
        :src="backgroundPeoples"
        alt="bg-patterns.svg"
        class="-translate-x-[25%]"
      />
    </div>
    <AdvancedSectionHeading
      title="أرآء العملاء"
      icon-color-class="bg-[#FF9500]"
      class="mt-[60px] border-app-black-third"
      text-color-class="text-app-black-secondary"
    />
    <h3
      v-html="headingTitle"
      class="mb-[60px] mt-4 max-w-[572px] text-center text-4xl font-extrabold capitalize text-app-black-secondary max-md:px-4 md:text-5xl"
    ></h3>
    <div
      class="embla mb-8"
      ref="emblaFirstSliderRef"
      :duration="MOTION_DURATION"
    >
      <ul class="embla__container">
        <HomeTestimonialsTestimonialCard
          v-for="(comment, index) of COMMENTS.slice(0, 3)"
          v-bind:comment
          :key="comment.id"
          class="embla__slide"
          :class="clsx({ active: index === 1 })"
        />
      </ul>
    </div>
    <div class="embla" ref="emblaSecondSliderRef" :duration="MOTION_DURATION">
      <ul class="embla__container">
        <HomeTestimonialsTestimonialCard
          v-for="comment of COMMENTS.slice(4)"
          v-bind:comment
          :key="comment.id"
          class="embla__slide"
        />
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import backgroundPeoples from "~/assets/images/testimonials/bg-peoples.svg";
import emblaCarouselVue from "embla-carousel-vue";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { MOTION_DURATION } from "~/constants/motion-config";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import { COMMENTS } from "~/constants/app-data";
import type { MotionVariants } from "@vueuse/motion";

const { appDir } = useAppDir();

const [emblaFirstSliderRef, firstSliderEmblaOptions] = emblaCarouselVue({
  loop: true,
  align: "center",
  active: true,
  direction: appDir.value,
  duration: 3000,
});
const [emblaSecondSliderRef, secondSliderEmblaOptions] = emblaCarouselVue(
  {
    loop: true,
    align: "end",
    direction: appDir.value,
    duration: 7000,
    slidesToScroll: "auto",
  },
  [Autoplay({ stopOnFocusIn: true })],
);

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
    text: "بعض من أراء العملاء عن ادائنا معهم",
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
