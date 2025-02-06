<template>
  <div
    v-if="isOpen"
    class="fixed right-0 z-40 h-screen w-full bg-white"
    :style="{ top: `${APP_HEADER_HEIGHT.MOBILE}px` }"
  >
    <nav class="flex flex-col items-start justify-start bg-white md:hidden">
      <NuxtLink
        v-for="link of navigationLinks"
        :key="link.documentId"
        :href="link.href"
        class="w-full px-5 py-[10px] text-base font-semibold leading-[22px] text-[#AEAEB2]"
        @click="$emit('onClose')"
        :class="{
          '!bg-[#f4f6f6] !text-[#244453]': router.fullPath.endsWith(link.href),
        }"
        >{{ link.title }}</NuxtLink
      >
    </nav>
  </div>
</template>
<script setup lang="ts">
import { APP_HEADER_HEIGHT } from "~/constants/app-data";
import type { NavigationLinkType } from "~/types/shared";
const router = useRoute();

const props = defineProps<{
  isOpen: boolean;
  navigationLinks: NavigationLinkType[] | undefined;
}>();

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
