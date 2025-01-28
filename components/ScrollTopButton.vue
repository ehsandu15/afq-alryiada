<template>
  <button
    type="button"
    class="fixed bottom-14 right-12 isolate flex size-[64px] items-center justify-center rounded-full bg-[#244453] shadow-2xl"
    v-if="scrollY > buttonVisiblePosition"
    v-motion-roll-visible-right
    @click="handleScrollToTop"
  >
    <img :src="arrowUpIcon" alt="Arrow up icon" />
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
