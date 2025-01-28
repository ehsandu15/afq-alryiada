<template>
  <span
    class="mb-4 mt-[60px] flex w-fit items-center justify-center gap-[10px] overflow-x-hidden rounded-full border border-[#F4F5F6] px-1 transition-[width] duration-700"
  >
    <span
      class="z-[4] flex size-11 items-center justify-center rounded-full p-1"
      :class="clsx(iconColorClass)"
    >
      <img :src="flagIcon" alt="flag-icon.svg" />
    </span>
    <p
      v-motion="{
        initial: { opacity: 0, x: 20, width: 0 },
        visible: { opacity: 1, x: 0, width: 'auto' },
        leave: { opacity: 0, x: -20, width: 0 },
      }"
      :duration="MOTION_DURATION"
      class="py-4 pe-[15px] text-center text-base font-semibold transition-[width] duration-700"
      :class="clsx(textColorClass)"
    >
      {{ title }}
    </p>
  </span>
</template>
<script setup lang="ts">
import clsx from "clsx";
import flagIcon from "~/assets/images/shared/flag-icon.svg";
import { MOTION_DURATION } from "~/constants/motion-config";
defineProps({
  title: {
    type: String,
    required: true,
  },
  textColorClass: {
    type: String,
    default: "text-white",
    required: false,
  },
  iconColorClass: {
    type: String,
    default: "bg-secondary",
    required: false,
  },
});
</script>
