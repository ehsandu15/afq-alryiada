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
    <div class="embla py-8" ref="emblaRef">
      <ul class="embla__container">
        <li
          class="embla__slide"
          v-for="(service, index) of services"
          :key="service.id"
          :class="clsx({ active: service.id === selectedService.id })"
          @click="handleSelectService(service)"
          v-motion="{
            initial: { opacity: 0, x: -500 },
            visibleOnce: { opacity: 1, x: 0 },
            leave: { opacity: 0, x: 500 },
          }"
          :duration="MOTION_DURATION"
          :delay="index * 50"
        >
          <span class="icon-wrapper bg-secondary p-2">
            <img
              :src="service.icon"
              :alt="service.title"
              class="object-contain"
            />
          </span>
          <p
            class="px-[17px] pb-7 text-center text-xl font-semibold leading-9 text-app-black-secondary md:px-5"
          >
            {{ service.title }}
          </p>
        </li>
      </ul>
    </div>
    <div
      class="app-container container mb-12 flex flex-col-reverse items-start justify-between gap-5 lg:flex-row"
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
          class="h-full rounded-app-radius object-cover md:max-w-full"
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
        href="#contact-us"
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

const { appDir } = useAppDir();

const [emblaRef] = emblaCarouselVue({
  loop: false,
  direction: appDir.value || "rtl",
  align: "start",
});

const services = ref<Array<ServiceType>>(_services);
const selectedService = ref<ServiceType>(services.value[0]);

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
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 fit-content;
  max-width: 100%;
  user-select: none;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  cursor: grab;
  transition:
    background-color 0.4s ease-in-out,
    box-shadow 0.3s ease-in-out;
}
.embla__slide .icon-wrapper {
  margin: 23px;
  margin-bottom: 12px;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  align-self: center;
  border-radius: 16px;
  width: 40px;
  height: 40px;
}

@media (min-width: 768px) {
  .embla__slide .icon-wrapper {
    width: 48px;
    height: 48px;
    margin: 26px;
  }
}
.embla__slide:not(.active) .icon-wrapper {
  background-color: #aeaeb2;
}
.embla__slide p {
  color: #aeaeb2;
}
.embla__slide.active p {
  color: #1f1f1f;
}
.embla__slide.active {
  box-shadow: 0 4px 48px 0 #50505033;
  background-color: #fff;
}
.embla__slide {
  margin-right: 32px;
}
</style>
