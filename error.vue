<script setup lang="ts">
import type { NuxtError } from "#app";
import { STRAPI_ENDPOINT } from "./constants/strapi-endpoints";
import type { AppFooterType } from "./types/footer";
import type { AppHeaderType } from "./types/header";
import type { NavigationLinkType } from "./types/shared";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });

console.log("error :", props.error);

const { findOne, find } = useStrapi<AppFooterType>();

const config = useRuntimeConfig();

const { data: footerContent } = await useAsyncData(
  STRAPI_ENDPOINT.APP_FOOTER,
  () =>
    findOne(STRAPI_ENDPOINT.APP_FOOTER, {
      locale: "ar-SA",
      populate: {
        logo: true,
        ctaBtn: true,
        privacyPolicyLink: true,
        social_medias: {
          populate: ["icon"],
        },
      },
    }),
);

const currentActiveSectionId = ref("#");
const { data: navigationLinks } = await useAsyncData(
  STRAPI_ENDPOINT.NAVIGATION_LINKS,
  () =>
    find<NavigationLinkType>(STRAPI_ENDPOINT.NAVIGATION_LINKS, {
      locale: "ar-SA",
      sort: "order:asc",
    }),
);

const { data: headerContent } = await useAsyncData(
  STRAPI_ENDPOINT.APP_HEADER,
  () =>
    findOne<AppHeaderType>(STRAPI_ENDPOINT.APP_HEADER, {
      locale: "ar-SA",
      populate: {
        ctaBtn: true,
        logo: {
          populate: {
            icon: true,
          },
        },
      },
    }),
);
</script>

<template>
  <LayoutAppHeader
    :content="headerContent?.data"
    :navigation-links="navigationLinks?.data"
    :current-active-section-id="currentActiveSectionId"
  />
  <div
    class="app-container container flex flex-col items-center justify-center gap-3 self-center justify-self-center pt-16"
  >
    <NuxtImg
      :src="
        error?.statusCode === 404
          ? '/error-404-image.webp'
          : '/error-500-image.webp'
      "
      alt="Error image"
      width="300"
      height="200"
      class="w-full rounded-md object-cover tablet:h-full tablet:w-fit lg:w-3/5"
    />
    <span
      class="mt-14 flex flex-col items-center justify-center gap-5 tablet:gap-16"
    >
      <h2
        class="text-center text-3xl font-medium text-app-black-secondary md:text-4xl lg:text-[60px]"
      >
        {{
          error?.statusCode === 404
            ? "الصفحة التي تبحث عنها غير موجودة"
            : "حدث خطأ ما"
        }}
      </h2>
      <P
        class="text-center text-sm font-normal leading-6 text-app-black-secondary text-opacity-60 tablet:text-base"
      >
        {{
          error?.statusCode === 404
            ? "الصفحة التي تبحث عنها غير موجودة برجاء التجقق من الصفحة التي تريد زيارتها و حاول مرة اخري"
            : "حدث عطل فني في الموقع او انه يوجد خطأ ما اثناء عمل التطبيق"
        }}
      </P>
      <div
        v-if="config.public.env === 'development'"
        class="flex flex-col gap-3 bg-gray-200 px-4 py-6"
      >
        <b>{{ error?.message }}</b>
        <pre>
          <code>
            {{error?.stack}}
          </code>
        </pre>
      </div>
    </span>
    <button @click="handleError" class="btn btn-primary mt-8">
      الرجوع للرئيسية
    </button>
  </div>
  <LayoutAppFooter
    :content="footerContent?.data"
    :navigation-links="navigationLinks?.data"
  />
</template>
