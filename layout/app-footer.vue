<template>
  <footer
    class="flex min-h-[297px] w-full flex-col items-center justify-between gap-7 bg-app-white-main"
  >
    <div
      class="app-container container mt-[93px] grid grid-cols-2 items-center justify-center lg:grid-cols-3"
    >
      <figure
        class="flex items-center justify-start max-lg:order-1 lg:justify-start lg:justify-center"
      >
        <img :src="logo" alt="full-logo.svg" class="max-w-[157px] md:w-fit" />
      </figure>
      <nav
        class="flex items-center justify-end gap-3 max-lg:order-3 max-lg:col-span-2 max-lg:mt-11 md:gap-6 lg:justify-center"
      >
        <NuxtLink
          v-for="link of NAV_LINKS"
          :href="link.href"
          class="text-base font-medium capitalize md:text-lg"
          >{{ link.name }}</NuxtLink
        >
      </nav>
      <div
        class="flex items-center justify-end max-lg:order-2 lg:justify-end lg:justify-center"
      >
        <NuxtLink :href="PATHS.CONTACT" class="btn btn-primary">
          <p
            class="text-lg font-semibold text-white md:text-[22px] md:font-bold"
          >
            تواصل معنا
          </p>
          <img :src="contactIcon" alt="contact-us-icon.svg" />
        </NuxtLink>
      </div>
    </div>
    <hr
      class="md:app-container inline-block h-[1px] w-full bg-app-black-secondary bg-opacity-10 md:container"
    />
    <div
      class="app-container container mb-9 flex flex-col items-center justify-between gap-5 md:mb-5 md:flex-row md:gap-4"
    >
      <p class="text-sm font-normal text-app-black-secondary">سياسة الخصوصية</p>
      <p class="text-sm font-normal text-app-black-secondary">
        © 2024 جميع الحقوق محفوظة لشركة أفق الريادة
      </p>
    </div>
    <div class="flex h-[52px] w-full items-center justify-between">
      <span class="flex h-[52px] flex-1 rounded-tl-[100px] bg-[#e9e9e9]"></span>
      <ul class="flex min-w-[266px] items-center justify-center gap-5">
        <li
          v-for="item of SOCIAL_LINKS"
          :key="item.id"
          class="size-[32px] rounded-full bg-secondary"
        >
          <img :src="item.icon" :alt="item.title" />
        </li>
      </ul>
      <span class="flex h-[52px] flex-1 rounded-tr-[100px] bg-[#e9e9e9]"></span>
    </div>
  </footer>
</template>
<script setup lang="ts">
import logo from "~/assets/images/shared/full-logo.svg";
import contactIcon from "~/assets/images/contact-us/contact-us-icon.svg";
import { PATHS } from "~/constants/paths";
import { NAV_LINKS, SOCIAL_LINKS } from "~/constants/app-data";
</script>
