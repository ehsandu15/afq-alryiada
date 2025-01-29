<template>
  <HomeHeroSection />
  <HomeServicesSection />
  <HomePrivilegesSection />
  <HomeCooperationWithUs />
  <HomeTechnologiesSection />
  <HomeBlogSection />
  <HomePartnersSection />
  <HomeTestimonialsSection />
  <ScrollTopButton />
  <a
    :href="`https://wa.me/${WHATSAPP_NUMBER}`"
    class="fixed bottom-10 left-6 isolate z-30 flex size-[54px] items-center justify-center rounded-full shadow-2xl md:bottom-14 md:left-12 md:size-[64px]"
  >
    <img src="~/assets/images/shared/whatsapp.svg" alt="whatsapp.svg" />
  </a>
</template>
<script setup lang="ts">
import { WHATSAPP_NUMBER } from "~/constants/app-data";
</script>
