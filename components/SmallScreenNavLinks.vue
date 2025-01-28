<template>
  <div
    v-if="isOpen"
    class="fixed right-0 z-40 h-screen w-full bg-white"
    :style="{ top: `${APP_HEADER_HEIGHT.MOBILE}px` }"
  >
    <nav class="flex flex-col items-start justify-start bg-white md:hidden">
      <NuxtLink
        v-for="link of NAV_LINKS"
        :key="link.href"
        :href="link.href"
        class="w-full px-5 py-[10px] text-base font-semibold leading-[22px] text-[#AEAEB2]"
        @click="$emit('onClose')"
        :class="{
          '!bg-[#f4f6f6] !text-[#244453]': router.fullPath.endsWith(link.href),
        }"
        >{{ link.name }}</NuxtLink
      >
    </nav>
  </div>
</template>
<script setup>
import { APP_HEADER_HEIGHT, NAV_LINKS } from "~/constants/app-data";
const router = useRoute();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const preventScroll = (ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   return false;
};

watch(
  () => [props.isOpen],
  () => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
      //   document.body.addEventListener("scroll", preventScroll, {
      //     passive: false,
      //   });
      //   document.body.addEventListener("touchmove", preventScroll, {
      //     passive: false,
      //   });
    } else {
      document.body.style.overflow = "auto";
      //   document.body.removeEventListener("scroll", preventScroll);
      //   document.body.removeEventListener("touchmove", preventScroll);
    }
  },
);

defineEmits(["onClose"]);
</script>
