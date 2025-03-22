<template>
  <li
    class="service-card"
    v-if="isSlideMounted"
    v-motion="CAROUSEL_MOTION"
    :delay="index * 100"
    :duration="MOTION_DURATION"
  >
    <span class="icon-wrapper bg-secondary p-2">
      <NuxtImg
        :src="service.icon?.url"
        :alt="service.icon?.alternativeText"
        class="object-contain"
        width="48"
        height="48"
      />
    </span>
    <p class="text-app-black-secondary">
      {{ service.title }}
    </p>
  </li>
</template>

<script setup lang="ts">
import { MOTION_DURATION } from "~/constants/motion-config";
import type { ServiceType } from "~/types/services";
const props = defineProps<{
  service: ServiceType;
  isSlideMounted: boolean;
  index: number;
}>();

const CAROUSEL_MOTION = {
  initial: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0 },
};
</script>

<style>
.service-card {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  user-select: none;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.4s ease-in-out,
    box-shadow 0.3s ease-in-out;
}
.service-card .icon-wrapper {
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
  .service-card .icon-wrapper {
    width: 48px;
    height: 48px;
    margin: 26px;
  }
}
.service-card:not(.active) .icon-wrapper {
  background-color: #aeaeb2;
}
.service-card p {
  color: #aeaeb2;
  font-size: 1.15rem;
  line-height: 1.75rem;
  padding-bottom: 1.75rem;
  padding-inline: 8px;
  text-align: center;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; */
}

@media (min-width: 768px) {
  .service-card p {
    padding-bottom: 2rem;
    padding-inline: 15px;
  }
}
.service-card.active p {
  display: block;
  color: #1f1f1f;
}
.service-card.active {
  box-shadow: 0 4px 40px 0 #50505033;
  background-color: #fff;
}
</style>
