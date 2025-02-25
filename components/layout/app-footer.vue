<template>
  <footer
    class="flex min-h-[297px] w-full flex-col items-center justify-between gap-7 bg-app-white-main"
  >
    <div
      class="app-container container mt-[93px] grid grid-cols-2 items-center justify-center lg:grid-cols-3"
    >
      <figure
        class="flex items-center justify-start max-lg:order-1 lg:justify-start"
      >
        <img
          v-if="content"
          :src="imagePathPrefix(content.logo.url)"
          alt="full-logo.svg"
          class="max-w-[calc(100%-2.5rem)] md:w-fit"
        />
      </figure>
      <nav
        class="flex w-fit items-center justify-center gap-3 max-lg:order-3 max-lg:col-span-2 max-lg:mt-11 md:gap-6"
      >
        <NuxtLink
          v-for="link of navigationLinks"
          :href="link.href"
          :key="link.documentId"
          class="w-fit truncate text-wrap text-base font-medium capitalize md:text-nowrap md:text-lg"
          >{{ link.title }}</NuxtLink
        >
      </nav>
      <div class="flex items-center justify-end max-lg:order-2 lg:justify-end">
        <NuxtLink :href="content?.ctaBtn.href" class="btn btn-primary">
          <p
            class="text-lg font-semibold text-white md:text-[22px] md:font-bold"
          >
            {{ content?.ctaBtn.title }}
          </p>
          <img
            v-if="content?.ctaBtn.media"
            :src="imagePathPrefix(content?.ctaBtn.media?.url)"
            :alt="content?.ctaBtn.media?.alternativeText"
          />
        </NuxtLink>
      </div>
    </div>
    <hr
      class="md:app-container inline-block h-[1px] w-full bg-app-black-secondary bg-opacity-10 md:container"
    />
    <div
      class="app-container container mb-9 flex flex-col items-center justify-between gap-5 md:mb-5 md:flex-row md:gap-4"
    >
      <a
        target="_blank"
        referrerpolicy="no-referrer"
        :href="content?.privacyPolicyLink.href"
        class="text-sm font-normal text-app-black-secondary"
        >{{ content?.privacyPolicyLink.title }}
      </a>
      <p class="text-sm font-normal text-app-black-secondary">
        {{ content?.copyRights }}
      </p>
    </div>
    <div class="flex h-[52px] w-full items-center justify-between">
      <span class="flex h-[52px] flex-1 rounded-tl-[100px] bg-[#e9e9e9]"></span>
      <ul class="flex min-w-[266px] items-center justify-center gap-5">
        <li
          v-for="item of content?.social_medias"
          :key="item.id"
          class="size-[32px] rounded-full bg-white"
        >
          <NuxtLink :href="item.href" rel="noreferrer" target="_blank">
            <img
              v-if="item.icon?.url"
              :src="imagePathPrefix(item.icon.url)"
              :alt="item.icon?.alternativeText"
            />
          </NuxtLink>
        </li>
      </ul>
      <span class="flex h-[52px] flex-1 rounded-tr-[100px] bg-[#e9e9e9]"></span>
    </div>
  </footer>
</template>
<script setup lang="ts">
// import logo from "~/assets/images/shared/full-logo.svg";
// import contactIcon from "~/assets/images/contact-us/contact-us-icon.svg";
// import { PATHS } from "~/constants/paths";
// import { NAV_LINKS, SOCIAL_LINKS } from "~/constants/app-data";
import type { AppFooterType } from "~/types/footer";
import type { NavigationLinkType } from "~/types/shared";

defineProps<{
  content: AppFooterType | undefined;
  navigationLinks: NavigationLinkType[] | undefined;
}>();
</script>
