<template>
  <header
    class="app-header relative flex w-full items-center justify-center border-b border-[#E5E5EA] py-2"
  >
    <section
      class="app-container container top-0 flex flex-row-reverse items-center justify-between md:flex-row"
    >
      <NuxtLink href="/">
        <img :src="logo" alt="logo.svg" />
      </NuxtLink>
      <button
        type="button"
        class="flex items-center justify-center md:hidden"
        @click="isOpenNavLinks = !isOpenNavLinks"
      >
        <img v-if="!isOpenNavLinks" :src="burgerIcon" alt="burger-icon.svg" />
        <img v-if="isOpenNavLinks" :src="closeIcon" alt="burger-icon.svg" />
      </button>
      <nav class="item center hidden gap-4 md:flex">
        <NuxtLink
          v-for="link of NAV_LINKS"
          :href="link.href"
          class="text-center font-bold text-app-gray-main"
          :class="{
            '!text-app-black-secondary': router.fullPath.endsWith(link.href),
          }"
        >
          <p>{{ link.name }}</p>
        </NuxtLink>
      </nav>
      <NuxtLink :href="PATHS.CONTACT" class="btn btn-primary hidden md:flex">
        <p>تواصل معنا</p>
      </NuxtLink>
      <SmallScreenNavLinks
        :is-open="isOpenNavLinks"
        @on-close="isOpenNavLinks = false"
      />
    </section>
  </header>
</template>
<script setup lang="ts">
import logo from "~/assets/images/shared/logo.svg";
import burgerIcon from "~/assets/images/shared/burger-icon.svg";
import closeIcon from "~/assets/images/shared/close-icon.svg";
import { PATHS } from "~/constants/paths";
import { APP_HEADER_HEIGHT, NAV_LINKS } from "~/constants/app-data";

const appHeaderHeight = ref(APP_HEADER_HEIGHT);
const isOpenNavLinks = ref(false);

const router = useRoute();
</script>
<style scoped>
@media (min-width: 768px) {
  .app-header {
    height: v-bind(`${appHeaderHeight.MOBILE}px`);
  }
}
.app-header {
  height: v-bind(`${appHeaderHeight.DESKTOP}px`);
}
</style>
