<template>
  <HomeHeroSection
    v-if="status === 'success'"
    :content="hero as HeroSectionType"
  />
  <HomeServicesSection
    v-if="status === 'success'"
    :content="services as ServicesSectionType"
  />
  <HomePrivilegesSection
    v-if="status === 'success'"
    :content="privilege as PrivilegeSectionType"
  />
  <HomeCooperationWithUs :content="cooperation as CooperationSectionType" />
  <HomeTechnologiesSection
    v-if="status === 'success'"
    :content="technologies as TechSectionType"
  />
  <HomeBlogSection
    v-if="status === 'success'"
    :content="blogs as BlogSectionType"
  />
  <HomePartnersSection
    v-if="status === 'success'"
    :content="partners as PartnersSectionType"
  />

  <HomeTestimonialsSection
    v-if="status === 'success'"
    :content="testimonials as TestimonialsSectionType"
  />

  <ScrollTopButton />
  <FlutingWhatsappButton
    v-if="whatsappNumber"
    :phone-number="whatsappNumber.href"
    :icon-url="whatsappNumber.icon.url"
  />
</template>
<script setup lang="ts">
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type {
  BlogSectionType,
  CooperationSectionType,
  HeroSectionType,
  IHomePage,
  PartnersSectionType,
  PrivilegeSectionType,
  ServicesSectionType,
  TechSectionType,
  TestimonialsSectionType,
} from "~/types/home-page";
import type { ImageType, SocialMedia } from "~/types/shared";
const { findOne, find } = useStrapi<IHomePage>();

const { data: homeData, status } = await useAsyncData(
  STRAPI_ENDPOINT.HOME_PAGE,
  () =>
    findOne(STRAPI_ENDPOINT.HOME_PAGE, {
      locale: "ar-SA",
      populate: {
        heroAdvancedTitle: {
          populate: "icon",
        },
        contactBtn: {
          populate: "media",
        },
        blogShowMoreBtn: {
          populate: ["media"],
        },
        servicesSectionTitle: {
          populate: "icon",
        },
        privilegeSectionTitle: {
          populate: "icon",
        },
        techSectionTitle: {
          populate: "icon",
        },
        testimonialsSectionTitle: {
          populate: "icon",
        },
        testimonials_lists: {
          populate: {
            authorCover: true,
          },
        },
        services_lists: {
          populate: {
            icon: true,
            cover: true,
          },
        },
        servicesContactBtn: true,
        privilegePersonImage: true,
        privilegePatternImage: true,
        cooperation_lists: {
          populate: {
            cover: true,
            secondaryAction: true,
            primaryAction: {
              populate: { media: true },
            },
          },
        },
        technologies_lists: {
          populate: {
            image: true,
          },
        },
        testimonialsPeoplesPatternImg: true,
        articles: {
          populate: {
            cover: true,
            keywords: true,
          },
        },
        whatsapp: {
          populate: {
            icon: true,
          },
        },
        heroId: true,
        testimonialsId: true,
        servicesId: true,
      },
    }),
);

const whatsappNumber: SocialMedia | any =
  status.value === "success"
    ? {
        ...homeData.value?.data.whatsapp,
        icon: {
          ...homeData.value?.data.whatsapp.icon,
          url: imagePathPrefix(
            homeData.value?.data.whatsapp.icon.url as string,
          ),
        },
      }
    : {};

const hero: HeroSectionType | object =
  status.value === "success"
    ? {
        heroHeadingTitle: homeData.value?.data?.heroHeadingTitle ?? "",
        heroAdvancedSubTitle: homeData.value?.data?.heroAdvancedSubTitle ?? "",
        heroAdvancedMobileSubTitle:
          homeData.value?.data?.heroAdvancedMobileSubTitle ?? "",
        heroDescription: homeData.value?.data?.heroDescription ?? "",
        heroAdvancedTitle: {
          ...homeData.value?.data?.heroAdvancedTitle,
          icon: {
            ...(homeData.value?.data?.heroAdvancedTitle.icon as ImageType),
            url: imagePathPrefix(
              homeData.value?.data?.heroAdvancedTitle.icon?.url as string,
            ),
          },
        },
        contactBtn: {
          ...homeData.value?.data?.contactBtn,
          media: {
            ...(homeData.value?.data?.contactBtn.media as ImageType),
            url: imagePathPrefix(
              homeData.value?.data?.contactBtn.media?.url as string,
            ),
          },
        },
        heroId: homeData.value?.data?.heroId,
      }
    : {};

const services: ServicesSectionType | object =
  status.value === "success"
    ? {
        servicesHeadingTitle: homeData.value?.data?.servicesHeadingTitle ?? "",
        servicesDescription: homeData.value?.data?.servicesDescription ?? "",
        servicesSecondaryHeading:
          homeData.value?.data?.servicesSecondaryHeading ?? "",
        servicesSecondaryDescription:
          homeData.value?.data?.servicesSecondaryDescription ?? "",
        servicesSectionTitle: homeData.value?.data?.servicesSectionTitle,
        servicesContactBtn: homeData.value?.data?.servicesContactBtn ?? {},
        services_lists:
          homeData.value?.data?.services_lists?.map((item) => ({
            ...item,
            cover: { ...item.cover, url: imagePathPrefix(item.cover.url) },
            icon: { ...item.icon, url: imagePathPrefix(item.icon.url) },
          })) ?? [],
        servicesId: homeData.value?.data?.servicesId,
      }
    : {};

const privilege: PrivilegeSectionType | object =
  status.value === "success"
    ? {
        privilegeHeadingTitle:
          homeData.value?.data?.privilegeHeadingTitle ?? "",
        privilegeDescription: homeData.value?.data?.privilegeDescription ?? "",
        privilegeSectionTitle:
          homeData.value?.data?.privilegeSectionTitle ?? "",
        privilegeBackgroundImag: {
          ...homeData.value?.data?.privilegeBackgroundImag,
          url: imagePathPrefix(
            homeData.value?.data?.privilegeBackgroundImag?.url as string,
          ),
        } as ImageType,
        privilegePatternImage: {
          ...homeData.value?.data?.privilegePatternImage,
          url: imagePathPrefix(
            homeData.value?.data?.privilegePatternImage?.url as string,
          ),
        } as ImageType,
        privilegePersonImage: {
          ...homeData.value?.data?.privilegePersonImage,
          url: imagePathPrefix(
            homeData.value?.data?.privilegePersonImage?.url as string,
          ),
        } as ImageType,
      }
    : {};

const cooperation: CooperationSectionType | object =
  status.value === "success"
    ? {
        cooperationHeadingTitle:
          homeData.value?.data?.cooperationHeadingTitle ?? "",
        cooperationDescription:
          homeData.value?.data?.cooperationDescription ?? "",
        cooperation_lists:
          homeData.value?.data?.cooperation_lists?.map((item) => ({
            ...item,
            cover: { ...item.cover, url: imagePathPrefix(item.cover.url) },
            primaryAction: item.ishasActions
              ? {
                  ...item.primaryAction,
                  media: {
                    ...item.primaryAction?.media,
                    url: imagePathPrefix(
                      item.primaryAction?.media?.url as string,
                    ),
                  },
                }
              : (item.primaryAction as any),
          })) ?? [],
      }
    : {};

const technologies: TechSectionType | object =
  status.value === "success"
    ? {
        techHeadingTitle: homeData.value?.data?.techHeadingTitle ?? "",
        techDescription: homeData.value?.data?.techDescription ?? "",
        techSectionTitle: homeData.value?.data?.techSectionTitle ?? "",
        technologies_lists:
          homeData.value?.data?.technologies_lists?.map((item) => ({
            ...item,
            image: item.image.map((img) => ({
              ...img,
              url: imagePathPrefix(img.url),
            })),
          })) ?? [],
      }
    : {};

const blogs: BlogSectionType | object =
  status.value === "success"
    ? {
        blogHeaingTitle: homeData.value?.data?.blogHeaingTitle ?? "",
        blogDescription: homeData.value?.data?.blogDescription ?? "",
        blogShowMoreBtn: {
          ...homeData.value?.data?.blogShowMoreBtn,
          media: {
            ...(homeData.value?.data?.blogShowMoreBtn.media as ImageType),
            url: imagePathPrefix(
              homeData.value?.data?.blogShowMoreBtn.media?.url as string,
            ),
          },
        },
        articles:
          homeData.value?.data?.articles?.map((item) => ({
            ...item,
            cover: { ...item.cover, url: imagePathPrefix(item.cover?.url) },
          })) ?? [],
      }
    : {};

const partners: PartnersSectionType | object =
  status.value === "success"
    ? {
        partnersHeaingtitle: homeData.value?.data?.partnersHeaingtitle ?? "",
      }
    : {};

const testimonials: TestimonialsSectionType | object =
  status.value === "success"
    ? {
        testimonialsHeadingTitle:
          homeData.value?.data?.testimonialsHeadingTitle ?? "",
        testimonialsSectionTitle:
          homeData.value?.data?.testimonialsSectionTitle ?? "",
        testimonials_lists:
          homeData.value?.data?.testimonials_lists?.map((item) => ({
            ...item,
            authorCover: {
              ...item.authorCover,
              url: imagePathPrefix(item.authorCover.url),
            },
          })) ?? [],
        testimonialsPeoplesPatternImg: homeData.value?.data
          ?.testimonialsPeoplesPatternImg
          ? {
              ...homeData.value?.data?.testimonialsPeoplesPatternImg,
              url: imagePathPrefix(
                homeData.value?.data?.testimonialsPeoplesPatternImg?.url,
              ),
            }
          : null,
        testimonialsId: homeData.value?.data?.testimonialsId,
      }
    : {};
</script>
