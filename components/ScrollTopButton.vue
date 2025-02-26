<template>
  <button
    type="button"
    v-if="scrollY >= buttonVisiblePosition"
    v-motion-roll-visible-right
    class="flex size-11 items-center justify-center rounded-full bg-[#244453] p-4 lg:size-14"
    @click="handleScrollToTop"
  >
    <img
      :src="arrowUpIcon"
      alt="go-top-img"
      width="64"
      height="64"
      class="w-full"
    />
  </button>
</template>
<script setup lang="ts">
import arrowUpIcon from "~/assets/images/shared/arrow-up.svg";
import useTrackScroll from "~/composables/use-teack-scroll";

defineProps({
  buttonVisiblePosition: { type: Number, default: 918 },
});

const { scrollY } = useTrackScroll();
const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>
