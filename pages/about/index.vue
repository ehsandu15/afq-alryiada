<template>
  <section class="flex min-h-screen w-full flex-col items-center justify-start">
    <div
      class="app-container container flex w-full flex-col items-center justify-center"
    >
      <img
        :src="content?.data.logo?.url"
        :alt="content?.data.logo?.alternativeText"
        class="mb-8 mt-[84px] h-[120px] w-full md:w-[295px]"
      />
      <p
        class="mb-8 text-center text-[20px] font-semibold capitalize text-app-black-secondary md:text-[28px]"
      >
        {{ content?.data.primaryDescription }}
      </p>
      <ul
        class="mb-[104px] flex min-w-[266px] items-center justify-center gap-5"
      >
        <li
          v-for="item of content?.data.social_medias"
          :key="item.id"
          class="size-[32px] rounded-full bg-secondary"
        >
          <a target="_blank" referrerpolicy="no-referrer" :href="item.href">
            <img
              :src="item.icon?.url"
              :alt="item.icon?.alternativeText || item.title"
            />
          </a>
        </li>
      </ul>
    </div>
    <div
      class="flex w-full flex-col items-center justify-start"
      :style="{
        backgroundImage: `url(${content?.data.secondarySectionBackground.url})`,
      }"
    >
      <AdvancedSectionHeading
        :title="content?.data.sectionTitle.title as string"
        icon-color-class="bg-secondary"
        class="mb-10 mt-[60px]"
      />
      <p
        class="app-container container mb-10 text-center text-[20px] font-semibold capitalize text-white md:text-[28px]"
      >
        {{ content?.data.secondaryDescription }}
      </p>
      <NuxtLink
        :href="content?.data.actionButton.href"
        class="mb-[60px] flex items-center justify-center rounded-[200px] bg-secondary px-5 py-[10px]"
      >
        <p
          class="text-center text-[15px] font-semibold leading-[25px] text-white"
        >
          {{ content?.data.actionButton.title }}
        </p>
      </NuxtLink>
    </div>
    <div
      class="app-container container flex flex-col items-center justify-start"
    >
      <h3
        class="mb-4 mt-[100px] text-center text-[44px] font-extrabold leading-[61px] text-app-black-secondary md:text-[56px]"
        v-html="headingTitle"
      ></h3>
      <p
        class="mb-[104px] text-center text-lg font-medium text-app-black-secondary"
      >
        {{ content?.data.thirdDescription }}
      </p>
    </div>
  </section>
  <ScrollTopButton :button-visible-position="520" />
  <a
    :href="content?.data.whatsapp?.href"
    class="fixed bottom-10 left-6 isolate z-30 flex size-[54px] items-center justify-center rounded-full shadow-2xl md:bottom-14 md:left-12 md:size-[64px]"
  >
    <img
      :src="content?.data.whatsapp?.icon?.url"
      :alt="content?.data.whatsapp?.icon?.alternativeText"
    />
  </a>
</template>
<script setup lang="ts">
// import fullLogo from "~/assets/images/shared/full-logo.svg";
// import facebookIcon from "~/assets/images/shared/social-media/facebook.svg";
// import instagramIcon from "~/assets/images/shared/social-media/instagram.svg";
// import twitterIcon from "~/assets/images/shared/social-media/twitter.svg";
// import youtubeIcon from "~/assets/images/shared/social-media/youtube.svg";
// import backgroundPatterns from "~/assets/images/about/bg.svg";
// import { PATHS } from "~/constants/paths";
import type { AboutUsContent } from "~/types/about-us";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
const nextConf = useNuxtApp();
const { findOne } = useStrapi<AboutUsContent>();

// const SOCIAL_LINKS = [
//   {
//     id: 0,
//     title: "facebook",
//     icon: facebookIcon,
//   },
//   {
//     id: 1,
//     title: "instagram",
//     icon: instagramIcon,
//   },
//   {
//     id: 2,
//     title: "twitter",
//     icon: twitterIcon,
//   },
//   {
//     id: 3,
//     title: "youtube",
//     icon: youtubeIcon,
//   },
// ];

const { data: content, status } = useAsyncData(
  STRAPI_ENDPOINT.ABOUT_US,
  () =>
    findOne(STRAPI_ENDPOINT.ABOUT_US, {
      locale: "ar-SA",
      populate: {
        logo: true,
        secondarySectionBackground: true,
        actionButton: {
          populate: {
            media: true,
          },
        },
        social_medias: {
          populate: {
            icon: true,
          },
        },
        whatsapp: {
          populate: {
            icon: true,
          },
        },
        sectionTitle: {
          populate: {
            icon: true,
          },
        },
      },
    }),
  {
    transform: (res) =>
      nextConf.runWithContext(() => ({
        ...res,
        data: {
          ...res.data,
          secondarySectionBackground: {
            ...res.data.secondarySectionBackground,
            url: imagePathPrefix(res.data.secondarySectionBackground.url),
          },
          logo: res.data.logo
            ? { ...res.data.logo, url: imagePathPrefix(res.data.logo.url) }
            : undefined,
          actionButton: {
            ...res.data.actionButton,
            icon: res.data.actionButton.media
              ? {
                  ...res.data.actionButton.media,
                  media: {
                    ...res.data.actionButton.media,
                    url: imagePathPrefix(res.data.actionButton.media?.url),
                  },
                }
              : undefined,
          },
          social_medias: res.data.social_medias.map((item) => ({
            ...item,
            icon: item.icon
              ? {
                  ...item.icon,
                  url: imagePathPrefix(item.icon.url),
                }
              : undefined,
          })),
          whatsapp: {
            ...res.data.whatsapp,
            icon: {
              ...res.data.whatsapp.icon,
              url: imagePathPrefix(res.data.whatsapp.icon.url),
            },
          },
        },
      })),
  },
);

console.log("content: ", content.value);
useSeoMeta({
  title: content.value?.data.seoTitle,
  description: content.value?.data.seoDescription,
});

const headingTitle = computed(() => {
  if (content.value && status.value === "success") {
    return highlightSpecificWord({
      text: content.value?.data.headingTitle,
      word: content.value?.data.textHighlightWord,
      classNames: "text-secondary",
    });
  }
  return "NA-NA";
});
</script>
