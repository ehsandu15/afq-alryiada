<template>
  <header class="app-header">
    <section
      class="app-container container top-0 flex flex-row-reverse items-center justify-between lg:flex-row"
    >
      <NuxtLink href="/">
        <img
          :src="imagePathPrefix(content?.logo?.icon?.url as string)"
          :alt="content?.logo?.icon?.alternativeText"
        />
      </NuxtLink>
      <button
        type="button"
        class="flex items-center justify-center lg:hidden"
        @click="isOpenNavLinks = !isOpenNavLinks"
      >
        <span v-if="!isOpenNavLinks">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7H21"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 12H21"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 17H21"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>

        <span v-if="isOpenNavLinks">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.63574 19L18.3637 6.27208"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M5.63574 6L18.3637 18.7279"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </button>
      <nav class="item center hidden gap-4 lg:flex">
        <NuxtLink
          v-for="link of navigationLinks"
          :href="link.href"
          class="nav-link"
          :class="{
            'nav-link__active':
              currentActiveSectionId && router.hash
                ? currentActiveSectionId.endsWith(link.elementId)
                : router.fullPath.endsWith(link.elementId),
          }"
        >
          <p>{{ link.title }}</p>
        </NuxtLink>
      </nav>
      <NuxtLink
        :href="content?.ctaBtn.href"
        class="btn btn-primary hidden lg:flex"
      >
        <p>{{ content?.ctaBtn.title }}</p>
      </NuxtLink>
      <SmallScreenNavLinks
        :is-open="isOpenNavLinks"
        :navigation-links="navigationLinks"
        @on-close="isOpenNavLinks = false"
      />
    </section>
  </header>
</template>
<script setup lang="ts">
import { APP_HEADER_HEIGHT } from "~/constants/app-data";
import type { AppHeaderType } from "~/types/header";
import type { NavigationLinkType } from "~/types/shared";

// USED IN CSS !!
const appHeaderHeight = ref(APP_HEADER_HEIGHT);
const isOpenNavLinks = ref(false);
const router = useRoute();
defineProps<{
  content: AppHeaderType | undefined;
  navigationLinks: NavigationLinkType[] | undefined;
  currentActiveSectionId: string;
}>();
</script>
<style scoped>
@media (min-width: 768px) {
  .app-header {
    height: v-bind(`${appHeaderHeight.MOBILE}px`);
  }
}
.app-header {
  @apply sticky top-0 z-30 flex w-full items-center justify-center border-b border-[#E5E5EA] bg-white py-2;
  height: v-bind(`${appHeaderHeight.DESKTOP}px`);
}
.nav-link {
  @apply text-center font-bold text-app-gray-main;
}
.nav-link__active {
  @apply text-app-black-secondary;
}
</style>
