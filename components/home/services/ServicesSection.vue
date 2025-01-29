<template>
  <section
    class="flex min-h-screen w-full flex-col items-center justify-center bg-[#2444530D]"
    :id="SECTIONS_IDS.SERVICES"
  >
    <AdvancedSectionHeading
      icon-color-class="bg-secondary"
      title="خدماتنا"
      text-color-class="text-app-black-secondary"
      class="!border-[#C7C7CC]"
    />
    <h3
      v-html="headingTitle"
      class="my-4 text-center text-[36px] leading-[52px] md:text-5xl md:font-extrabold"
    ></h3>
    <p
      class="mb-11 max-w-[350px] text-center text-[20px] font-medium leading-[32px] text-app-black-secondary md:max-w-full md:text-lg"
    >
      لدى أفق الريادة امتيازات خاصة لضمان نمو خدماتك بصورة صحيحة وبخبرات متراكمة
    </p>
    <div class="app-container embla container py-8" ref="emblaRef">
      <ul class="embla__container">
        <HomeServicesServiceCard
          v-for="(service, index) of services"
          :key="service.id"
          :class="clsx({ active: service.id === selectedService.id })"
          @click="handleSelectService(service)"
          :service="service"
          :is-embla-ref="Boolean(emblaRef)"
          :index="index"
        >
        </HomeServicesServiceCard>
      </ul>
    </div>
    <div
      class="app-container container mb-12 flex flex-col-reverse items-start justify-between gap-5 px-0 lg:flex-row"
    >
      <p class="w-full text-xl font-semibold leading-[37.48px] lg:w-1/2">
        {{ selectedService?.description }}
      </p>
      <figure
        class="flex h-96 w-full items-center justify-center overflow-hidden rounded-app-radius lg:h-80 lg:w-1/2"
      >
        <img
          :src="selectedService?.image"
          :alt="selectedService.title"
          class="h-full w-full rounded-app-radius object-cover md:max-w-full"
        />
      </figure>
    </div>
    <div
      class="app-container container mb-[80px] mt-[60px] flex flex-col items-center justify-center"
    >
      <h2
        v-html="joinToUsText"
        v-motion="{
          initial: { opacity: 0, y: -150 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="MOTION_DURATION"
        class="mb-4 text-center text-5xl font-extrabold leading-[61px] text-app-black-secondary lg:text-[56px]"
      ></h2>
      <p
        class="mb-8 px-4 text-center text-base font-medium leading-[29px] text-app-black-secondary md:text-lg lg:max-w-[925px]"
        v-motion="{
          initial: { opacity: 0, y: -100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :delay="100"
        :duration="MOTION_DURATION"
      >
        هل أنتم مستعدون لتحويل أعمالكم؟ تواصلوا معنا لاكتشاف الإمكانيات الكاملة
        للتكنولوجيا. سواء كنتم ترغبون في التطوير، الابتكار، أو تأمين أنظمتكم،
        نحن هنا لدعمكم في كل خطوة على الطريق.
      </p>
      <NuxtLink
        class="btn btn-primary"
        :href="PATHS.CONTACT"
        v-motion="{
          initial: { opacity: 0, y: 100 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :delay="130"
        :duration="MOTION_DURATION"
      >
        <p>تواصل معنا</p>
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import emblaCarouselVue from "embla-carousel-vue";
import clsx from "clsx";
import type { ServiceType } from "~/types/services";
import { SECTIONS_IDS } from "~/constants/sections-ids";
import { MOTION_DURATION } from "~/constants/motion-config";
import { services as _services } from "~/constants/app-data";
import { PATHS } from "~/constants/paths";

const { appDir } = useAppDir();
const [emblaRef] = emblaCarouselVue({
  loop: false,
  direction: appDir.value || "rtl",
  align: "start",
  containScroll: false,
});

const services = ref<Array<ServiceType>>(_services);
const selectedService = ref<ServiceType>(_services[0]);

const headingTitle = computed(() =>
  highlightSpecificWord({
    text: "خدمات افق الريادة",
    word: "خدمات",
    classNames: "text-app-black-third",
  }),
);

const joinToUsText = computed(() =>
  highlightSpecificWord({
    text: "انضموا إلى أفق الريادة اليوم!",
    word: "اليوم!",
    classNames: "!text-secondary",
  }),
);

function handleSelectService(service: ServiceType) {
  selectedService.value = service;
}
</script>

<style scoped lang="css">
.embla {
  overflow: hidden;
  width: 100%;
  position: relative;
}
.embla__container {
  display: flex;
}
@media (max-width: 768px) {
  .embla {
    padding-inline: 1rem;
  }
}
/* .embla::before {
  content: "";
  position: absolute;
  top: 0;
  left: 1rem;
  width: 16px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(81 81 81 / 25%),
    rgb(255 255 255 / 40%)
  );
  pointer-events: none;
  z-index: 1;
}
.embla::after {
  content: "";
  position: absolute;
  top: 0;
  right: 1rem;
  width: 16px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(255 255 255 / 40%),
    rgb(81 81 81 / 25%)
  );
  pointer-events: none;
  z-index: 1;
} */
</style>
