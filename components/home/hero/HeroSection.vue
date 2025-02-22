<template>
  <section
    :id="content.heroId.elementId"
    data-section="true"
    class="relative flex min-h-screen w-full flex-col items-center justify-center bg-app-white-main"
  >
    <div
      class="relative mt-20 flex min-h-screen w-full flex-col items-center justify-start overflow-hidden px-3 md:mt-0 md:justify-center lg:px-0"
    >
      <!-- Circle Waves animations -->
      <div class="wave delay-1"></div>
      <div class="wave delay-2"></div>
      <div class="wave delay-3"></div>
      <div class="wave delay-4"></div>

      <!-- End Circle Waves animations -->
      <span
        class="item-center z-[5] mb-2 flex max-h-[60px] w-min items-center justify-center gap-3 rounded-full border border-[#C7C7CC] px-6 py-3 transition-[width] duration-500"
      >
        <span
          class="item-center ms-5 flex size-10 shrink-0 rounded-[8px] bg-secondary p-2.5"
        >
          <img
            :src="content.heroAdvancedTitle.icon?.url"
            :alt="content.heroAdvancedTitle.icon?.alternativeText"
          />
        </span>
        <p class="font-semi-bold shrink-0 text-[22px] text-secondary">
          {{ content.heroAdvancedTitle.title }}
        </p>
        <span class="me-5 w-min transition-[width] duration-500">
          <p
            class="hero-heading hidden shrink-0 md:flex"
            v-motion="{
              initial: { opacity: 0, x: -150, width: '0%', maxWidth: '100%' },
              visibleOnce: {
                opacity: 1,
                x: 0,
                width: '100%',
                maxWidth: '100%',
              },
              leave: { opacity: 0, x: -150, width: '0%', maxWidth: '100%' },
            }"
            :duration="500"
            :delay="SHARED_DELAY"
          >
            {{ content.heroAdvancedSubTitle }}
          </p>
          <p
            class="hero-heading flex shrink-0 md:hidden"
            v-motion="{
              initial: { opacity: 0, x: -150, width: '0%', maxWidth: '100%' },
              visibleOnce: {
                opacity: 1,
                x: 0,
                width: '100%',
                maxWidth: '100%',
              },
              leave: { opacity: 0, x: -150, width: '0%', maxWidth: '100%' },
            }"
            :duration="500"
            :delay="SHARED_DELAY"
          >
            {{ content.heroAdvancedMobileSubTitle }}
          </p>
        </span>
      </span>
      <h2
        v-motion="{
          initial: { opacity: 0, y: -100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
        class="item-center isolate mb-8 max-w-full text-center text-[44px] font-extrabold leading-[69px] text-app-black-secondary md:max-w-[700px] md:text-[56px] md:font-bold md:leading-[81px] lg:max-w-[766px]"
        v-html="headingTitle"
      ></h2>

      <p
        v-motion="{
          initial: { opacity: 0, y: -60 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
        class="text-black-secondary z-[5] mb-5 max-w-full text-center text-[16px] font-semibold md:max-w-[692px] md:text-xl"
      >
        {{ content.heroDescription }}
      </p>
      <NuxtLink
        v-motion="{
          initial: { opacity: 0, y: -30 },
          visibleOnce: { opacity: 1, y: 0 },
          leave: { opacity: 0, y: -30 },
        }"
        :href="content.contactBtn.href"
        :duration="MOTION_DURATION"
        :delay="SHARED_DELAY"
        class="btn btn-primary isolate"
      >
        <p
          class="text-[18px] font-semibold text-white md:text-[22px] md:font-bold"
        >
          {{ content.contactBtn.title }}
        </p>
        <img
          :src="content.contactBtn.media?.url"
          :alt="content.contactBtn.media?.alternativeText"
        />
      </NuxtLink>
      <MouseWaves />
    </div>
  </section>
</template>
<script setup lang="ts">
// import flagIcon from "~/assets/images/shared/flag-icon.svg";
// import contactIcon from "~/assets/images/contact-us/contact-us-icon.svg";
// import { PATHS } from "~/constants/paths";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import { MOTION_DURATION } from "~/constants/motion-config";
import type { HeroSectionType } from "~/types/home-page";

const props = defineProps<{ content: HeroSectionType }>();

const SHARED_DELAY = 800;

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: props.content.heroHeadingTitle,
    word: ["شريككم", "رقمية"],
    classNames: "text-app-black-third",
  }),
);
</script>
<style scoped lang="css">
.hero-heading {
  font-size: 22px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  width: 0;
  max-width: 100%;
  animation: expand 3s forwards;
  transition:
    width 0.7s ease-in-out,
    opacity 0.5s ease-in-out;
  animation-delay: 0.8s;
}

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
