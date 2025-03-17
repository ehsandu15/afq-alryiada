<template>
  <section class="flex min-h-fit w-full flex-col items-center justify-start">
    <div
      class="app-container container mt-[84px] flex flex-col items-center justify-start"
    >
      <HeadingHighlightedTitle
        v-if="content?.data"
        :title="content.data.headingTitle.title"
        :words="content.data.headingTitle.highlightWords.map((w) => w.word)"
        main-text-color-class-name="text-app-black-secondary"
        marked-text-color-class-name="text-secondary"
        class="mb-6 text-center text-[44px] font-extrabold leading-[61px] md:text-[56px]"
      />
      <p class="text-center text-lg font-medium text-app-black-secondary">
        {{ content?.data.thirdDescription }}
      </p>
    </div>
    <div
      class="app-container container mt-[64px] flex w-full flex-col items-center justify-center"
    >
      <img
        :src="content?.data.logo?.url"
        :alt="content?.data.logo?.alternativeText"
        class="mb-12 h-[120px] w-full md:w-[295px]"
      />
      <p
        class="mb-8 text-center text-[20px] font-semibold capitalize text-app-black-secondary md:text-[28px]"
      >
        {{ content?.data.primaryDescription }}
      </p>
      <ul
        class="mb-[34px] flex min-w-[266px] items-center justify-center gap-5"
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
  </section>
</template>
<script setup lang="ts">
import type { AboutUsContent } from "~/types/about-us";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
const nextConf = useNuxtApp();
const { findOne } = useStrapi<AboutUsContent>();

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
        headingTitle: {
          populate: {
            highlightWords: true,
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

watchEffect(() => {
  if (status.value !== "success" || !content.value) return;
  useServerSeoMeta({
    title: content.value?.data.seoTitle,
    description: content.value?.data.seoDescription,
    ogTitle: content.value?.data.seoTitle,
    ogDescription: content.value?.data.seoDescription,
  });
});
</script>
