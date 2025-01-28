<template>
  <section
    :id="SECTIONS_IDS.HERO"
    class="relative flex min-h-screen w-full flex-col items-center justify-center bg-app-white-main"
  >
    <div
      class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <!-- Circle Waves animations -->
      <div class="wave delay-1"></div>
      <div class="wave delay-2"></div>
      <div class="wave delay-3"></div>
      <div class="wave delay-4"></div>

      <!-- End Circle Waves animations -->
      <span
        class="item-center z-[5] mb-2 flex max-h-[60px] w-fit items-center justify-center gap-3 rounded-full border border-[#C7C7CC] px-6 py-3"
      >
        <span class="item-center flex size-10 rounded-[8px] bg-secondary p-2.5">
          <img :src="flagIcon" alt="flag-icon.svd" />
        </span>
        <p class="font-semi-bold text-[22px] text-secondary">مرحباً بكم</p>
        <span
          v-motion="{
            initial: {
              opacity: 0,
              width: 0,
              overflow: 'hidden',
              transformOrigin: 'right',
            },
            envisibleOnceter: {
              opacity: 1,
              width: 'auto',
            },
          }"
          :duration="MOTION_DURATION"
          :delay="SHARED_DELAY"
          class="font-semi-bold text-[22px] transition-[width] duration-500"
        >
          <p class="hidden shrink-0 md:flex">
            في أفق الريادة : حيث تلتقي الابتكار بالتميز!
          </p>
          <p class="flex shrink-0 md:hidden">في أفق الريادة</p>
        </span>
      </span>
      <h2
        v-motion="{
          initial: $config.public.motion.directives['pop-down'].initial,
          visibleOnce: $config.public.motion.directives['pop-down'].visible,
        }"
        :duration="MOTION_DURATION"
        class="item-center isolate mb-8 max-w-[80%] text-center text-5xl font-extrabold leading-[69px] text-app-black-secondary md:max-w-[700px] md:text-[56px] md:font-bold md:leading-[81px] lg:max-w-[766px]"
        v-html="headingTitle"
      ></h2>

      <p
        v-motion="{
          initial: $config.public.motion.directives['pop-down'].initial,
          visibleOnce: $config.public.motion.directives['pop-down'].visible,
        }"
        :duration="MOTION_DURATION"
        class="text-black-secondary z-[5] mb-5 max-w-[350px] text-center md:max-w-[692px]"
      >
        أفق الريادة هو وجهتكم الشاملة للحصول على خدمات التكنولوجيا المتقدمة.
        نقدم لكم نتائج مصممة خصيصاً لتلبية احتياجاتكم الفريدة.
      </p>
      <NuxtLink
        v-motion="{
          initial: $config.public.motion.directives['pop-down'].initial,
          visibleOnce: $config.public.motion.directives['pop-down'].visible,
        }"
        href="#contact"
        :duration="MOTION_DURATION"
        :delay="SHARED_DELAY"
        class="btn btn-primary isolate"
      >
        <p
          class="text-[18px] font-semibold text-white md:text-[22px] md:font-bold"
        >
          تواصل معنا
        </p>
        <img :src="contactIcon" alt="contact-us-icon.svg" />
      </NuxtLink>
      <!-- <MouseWaves /> -->
    </div>
  </section>
</template>
<script setup lang="ts">
import flagIcon from "~/assets/images/shared/flag-icon.svg";
import contactIcon from "~/assets/images/contact-us/contact-us-icon.svg";
import { SECTIONS_IDS } from "~/constants/sections-ids";

const MOTION_DURATION = 750;
const SHARED_DELAY = 800;

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: "شريككم الموثوق لخدمات رقمية متطورة",
    word: ["شريككم", "رقمية"],
    classNames: "text-app-black-third",
  }),
);
</script>
<style scoped lang="css">
.wave {
  --waves-duration: 3s;
  --waves-fill-mode: both;
  --wave-direction: alternate-reverse;
  --wave-timing-function: cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  width: 750px;
  height: 750px;
  display: block;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #c7c7cc;
  animation-name: waves;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  transition: 5s ease-in-out;
}
.delay-1 {
  animation-name: waves;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.3s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.delay-2 {
  animation-name: waves-1;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.7s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.delay-3 {
  animation-name: waves-2;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 1.3s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.delay-4 {
  animation-name: waves-3;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 1.6s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}

@keyframes waves {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}
@keyframes waves-1 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.3);
    opacity: 0.2;
  }
}
@keyframes waves-2 {
  0% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0.2;
  }
}
@keyframes waves-3 {
  0% {
    transform: scale(1.6);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0.2;
  }
}
@keyframes bloop {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
@keyframes bloop {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
