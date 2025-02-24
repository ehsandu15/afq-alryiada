<template>
  <section
    data-section="true"
    class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F8F9F9] pb-[60px]"
    :id="content.testimonialsId.elementId"
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
      class="mt-8 border-app-black-third md:mt-[60px]"
      text-color-class="text-app-black-secondary"
    />
    <h3
      v-html="headingTitle"
      class="mb-[60px] mt-4 max-w-[572px] text-center text-4xl font-extrabold capitalize text-app-black-secondary max-md:px-4 md:text-5xl"
    ></h3>
    <div class="flex w-full flex-col gap-8">
      <carousel
        v-if="content.testimonials_lists"
        :autoplay="1500"
        snap-align="center"
        items-to-show="3.8"
        :items-to-scroll="1"
        :gap="32"
        breakpoint-mode="viewport"
        :breakpoints="{
          300: {
            itemsToShow: 1.08,
            snapAlign: 'center',
          },

          768: {
            itemsToShow: 1.5,
            snapAlign: 'center',
          },

          992: {
            itemsToShow: 3,
            snapAlign: 'center',
          },
          1280: {
            itemsToShow: 3.8,
            snapAlign: 'center',
          },
        }"
        :mouse-drag="true"
        :transition="3500"
        :touch-drag="true"
        :pause-autoplay-on-hover="true"
        slide-effect="slide"
        :wrap-around="true"
        dir="ltr"
        class="testimonials-part-one w-full"
      >
        <Slide
          v-for="testimonial of content.testimonials_lists.slice(0, 3)"
          :key="testimonial.documentId"
        >
          <HomeTestimonialsTestimonialCard
            :testimonial
            card-transition-delay="1500ms"
          />
        </Slide>
      </carousel>
      <carousel
        v-if="content.testimonials_lists"
        :autoplay="1400"
        snap-align="center-even"
        items-to-show="3.8"
        :items-to-scroll="1"
        :gap="32"
        breakpoint-mode="viewport"
        :pause-autoplay-on-hover="true"
        :breakpoints="{
          300: {
            itemsToShow: 1.2,
            snapAlign: 'center-even',
          },
          768: {
            itemsToShow: 2.1,
            snapAlign: 'center-even',
          },
          992: {
            itemsToShow: 3,
            snapAlign: 'center-even',
          },
          1280: {
            itemsToShow: 3.8,
            snapAlign: 'center-even',
          },
        }"
        :mouse-drag="true"
        :transition="3500"
        :touch-drag="true"
        slide-effect="slide"
        :wrap-around="true"
        dir="rtl"
        class="w-full"
      >
        <Slide
          v-for="testimonial of content.testimonials_lists.slice(3)"
          :key="testimonial.documentId"
        >
          <HomeTestimonialsTestimonialCard :testimonial />
        </Slide>
      </carousel>
    </div>
  </section>
</template>
<script setup lang="ts">
import { SECTIONS_IDS } from "~/constants/sections-ids";
import type { TestimonialsSectionType } from "~/types/home-page";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/carousel.css";

const props = defineProps<{ content: TestimonialsSectionType }>();

const headingTitle = computed(() =>
  !props.content.testimonialsHeadingTitle
    ? ""
    : highlightSpecificWord({
        text: props.content.testimonialsHeadingTitle.title,
        word: props.content.testimonialsHeadingTitle.highlightWords.map(
          (w) => w.word,
        ),
        classNames: "text-app-black-third",
      }),
);
</script>
<style scoped lang="css">
.testimonials-part-one .carousel__slide--active :first-child {
  @apply !bg-secondary;
}
.testimonials-part-one .carousel__slide--active :first-child > * {
  @apply !text-white;
}
</style>
