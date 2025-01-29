<template>
  <section
    class="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#244453] bg-cover bg-center bg-no-repeat md:justify-center"
  >
    <!-- :style="{ 'background-image': `url(${background})` }" -->
    <div
      class="absolute inset-0 flex h-full w-full -translate-y-4 items-start justify-center gap-[25px] opacity-[0.03]"
    >
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_TOP"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_BOTTOM"
        :duration="MOTION_DURATION + 250"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_TOP"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_BOTTOM"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_TOP"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_BOTTOM"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_TOP"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
      <img
        :src="backgroundPatterns"
        alt="background-patterns"
        class="object-cover"
        v-motion="SCROLL_FADING_BOTTOM"
        :duration="MOTION_DURATION"
        :delay="DELAY"
      />
    </div>
    <AdvancedSectionHeading
      title="امتيازاتنا"
      icon-color-class="bg-secondary"
      class="isolate"
    />
    <div class="mb-20 flex w-fit flex-col items-center justify-center gap-4">
      <h3
        class="isolate max-w-[350px] text-center text-5xl font-extrabold leading-[69.6px] text-white md:max-w-fit md:leading-[52.8px]"
        v-html="headingTitle"
        v-motion="{
          initial: { opacity: 0, y: 20 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="GLOBAL_MOTION_DURATION"
      ></h3>

      <p
        class="text-center text-xl font-medium text-white text-opacity-60"
        v-motion="{
          initial: { opacity: 0, y: -20 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="GLOBAL_MOTION_DURATION"
      >
        لدى أفق الريادة امتيازات خاصة لضمان نمو خدماتك بصورة صحيحة وبخبرات
        متراكمة
      </p>
    </div>
    <div
      class="isolate mb-4 flex items-center justify-center"
      v-motion="{
        initial: { opacity: 0, y: -100 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      :duration="MOTION_DURATION"
    >
      <img :src="menPrivileges" alt="man-and-privileges-img.svg" />
    </div>
  </section>
</template>
<script setup lang="ts">
import menPrivileges from "~/assets/images/privileges/man-and-privileges-img.svg";
import backgroundPatterns from "~/assets/images/privileges/bg-patterns.svg";
import { MOTION_DURATION as GLOBAL_MOTION_DURATION } from "~/constants/motion-config";

const DELAY = 350;
const MOTION_DURATION = GLOBAL_MOTION_DURATION + 250;
const SCROLL_FADING_TOP = {
  initial: { opacity: 0, y: -250 },
  visibleOnce: { opacity: 1, y: 0 },
};
const SCROLL_FADING_BOTTOM = {
  initial: { opacity: 0, y: 250 },
  visibleOnce: { opacity: 1, y: 0 },
};
const headingTitle = computed(() =>
  highlightSpecificWord({
    text: "ما تمتاز به أعمالنا",
    word: ["تمتاز", "به"],
    classNames: "opacity-60",
  }),
);
</script>
