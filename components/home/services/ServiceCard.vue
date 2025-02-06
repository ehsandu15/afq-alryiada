<template>
  <li
    class="embla__slide"
    v-if="isEmblaRef"
    v-motion="CAROUSEL_MOTION"
    :delay="index * 120"
    :duration="MOTION_DURATION"
  >
    <span class="icon-wrapper bg-secondary p-2">
      <img
        :src="service.icon?.url"
        :alt="service.icon?.alternativeText"
        class="object-contain"
      />
    </span>
    <p
      class="px-[17px] pb-7 text-center text-xl font-semibold leading-9 text-app-black-secondary md:px-5"
    >
      {{ service.title }}
    </p>
  </li>
</template>

<script setup lang="ts">
import { MOTION_DURATION } from "~/constants/motion-config";
import type { ServiceType } from "~/types/services";

const props = defineProps<{
  service: ServiceType;
  isEmblaRef: boolean;
  index: number;
}>();

const CAROUSEL_MOTION = {
  initial: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0 },
};
</script>

<style>
.embla__slide {
  flex: 0 0 fit-content;
  max-width: 100%;
  user-select: none;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.4s ease-in-out,
    box-shadow 0.3s ease-in-out;
}
.embla__slide .icon-wrapper {
  margin: 23px;
  margin-bottom: 12px;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  align-self: center;
  border-radius: 16px;
  width: 40px;
  height: 40px;
}

@media (min-width: 768px) {
  .embla__slide .icon-wrapper {
    width: 48px;
    height: 48px;
    margin: 26px;
  }
}
.embla__slide:not(.active) .icon-wrapper {
  background-color: #aeaeb2;
}
.embla__slide p {
  color: #aeaeb2;
}
.embla__slide.active p {
  color: #1f1f1f;
}
.embla__slide.active {
  box-shadow: 0 4px 48px 0 #50505033;
  background-color: #fff;
}
.embla__slide {
  margin-right: 32px;
}
</style>
