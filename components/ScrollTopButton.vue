<template>
  <button
    type="button"
    v-show="scrollY >= buttonVisiblePosition"
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0, transition: { duration: 0.5 } }"
    class="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#244453] p-4 lg:h-16 lg:w-16"
    @click="handleScrollToTop"
  >
    <NuxtImg
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
