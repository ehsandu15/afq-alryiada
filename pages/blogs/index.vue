<template>
  <section
    class="app-container container flex min-h-screen flex-col items-center justify-start"
  >
    <AdvancedSectionHeading
      icon-color-class="bg-secondary"
      :title="content?.data.sectionTitle.title!"
      text-color-class="text-app-black-secondary"
      class="mb-5 mt-16 !border-[#C7C7CC]"
    />
    <HeadingHighlightedTitle
      v-if="content?.data"
      :title="content?.data.headingTitle"
      :words="[content?.data.highlightWord]"
      main-text-color-class-name="text-app-black-secondary"
      marked-text-color-class-name="text-secondary"
      class="text-4xl font-extrabold capitalize leading-[70px] lg:text-5xl"
    />
    <div
      v-if="!route.query.tag"
      class="mt-5 flex w-full flex-col items-center justify-start gap-3 md:flex-row tablet:gap-6 lg:gap-12"
    >
      <span class="search-wrapper">
        <svg
          class="h-6 w-6 text-inherit dark:text-inherit"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="search"
          name="searchQuery"
          id="searchQuery"
          :placeholder="content?.data.searchPlaceholder"
          class="w-full flex-1 border-transparent text-app-black-secondary focus:border-none focus:outline-none"
          v-model="searchQuery"
        />
      </span>
      <div class="flex-1" v-if="categoriesStatus === 'success'">
        <Carousel
          items-to-show="fit-content"
          snap-align="start"
          :items-to-scroll="1"
          :gap="24"
          breakpoint-mode="viewport"
          :mouse-drag="true"
          :transition="600"
          :touch-drag="true"
          slide-effect="slide"
          :dir="appDir"
        >
          <Slide
            v-for="category of categories?.data"
            :key="category.documentId"
            style="width: fit-content !important"
          >
            <NuxtLink
              :href="{ query: { ...route.query, category: category.slug } }"
              :class="
                clsx(
                  {
                    '!border-b-secondary':
                      category.slug === route.query.category,
                  },
                  {
                    '!border-b-secondary':
                      category.slug === 'all' && !route.query.category,
                  },
                )
              "
            >
              <p
                class="text-base font-semibold capitalize leading-4 text-[#8E8E93]"
                :class="
                  clsx(
                    {
                      '!text-secondary': category.slug === route.query.category,
                    },
                    {
                      '!text-secondary':
                        category.slug === 'all' && !route.query.category,
                    },
                  )
                "
              >
                {{ category.name }}
              </p>
            </NuxtLink>
          </Slide>
        </Carousel>
      </div>
    </div>
    <div class="mt-7 flex w-full flex-col gap-7">
      <ul
        class="mb-11 grid grid-cols-1 gap-8 overflow-x-hidden md:grid-cols-2 lg:grid-cols-3"
        v-if="articles && articleStatus === 'success'"
      >
        <BlogCard
          v-for="(article, index) of articles.data"
          :key="article.id"
          v-motion="{
            initial: { opacity: 0, x: -23, scale: 1.02 },
            visibleOnce: { opacity: 1, x: 0, scale: 1.0 },
            leave: { opacity: 0, x: 23, scale: 1.02 },
          }"
          :duration="MOTION_DURATION - 550"
          :delay="index * 120"
          :article="article as ArticleType"
        />
      </ul>

      <PaginationItems
        v-if="
          articleStatus === 'success' && articles && articles?.data?.length >= 1
        "
        :buttons-limit="5"
        :page="Number(route?.query.page) || 1"
        :total-pages="(articles?.meta?.pagination as any).pageCount || 1"
        @on-next-page="handleGetNextPage"
        @on-toggle-page="handleTogglePage"
        @on-prev-page="handleGetPrevPage"
      />
      <div
        v-if="
          articleStatus === 'success' && articles && articles.data.length <= 0
        "
      >
        <h3
          class="mb-8 mt-16 text-center text-4xl font-semibold capitalize text-app-black-secondary text-opacity-55"
        >
          {{ content?.data.noArticlesFound }}
        </h3>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import clsx from "clsx";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type {
  ArticleCategoryType,
  ArticleType,
  BlogContentType,
} from "~/types/blogs";
import { Carousel, Slide } from "vue3-carousel";
import { MOTION_DURATION } from "~/constants/motion-config";

const route = useRoute();
const searchQuery = ref("");
const debouncedSearchQuery = useDebounce(searchQuery, 650);
const router = useRouter();
const { find, findOne } = useStrapi<BlogContentType>();
const { data: content, status: contentStatus } = useAsyncData(
  STRAPI_ENDPOINT.BLOG,
  () =>
    findOne(STRAPI_ENDPOINT.BLOG, {
      locale: "ar-SA",
      populate: { sectionTitle: true },
    }),
);
const nuxtConf = useNuxtApp();

const { data: categories, status: categoriesStatus } = useAsyncData(
  STRAPI_ENDPOINT.CATEGORIES,
  () =>
    find<ArticleCategoryType>(STRAPI_ENDPOINT.CATEGORIES, {
      locale: "ar-SA",
    }),
);

const filterWith = computed(() => {
  if (route.query.tag) {
    return {
      tags: {
        normalizedTagName: {
          $eqi: route.query.tag,
        },
      },
    };
  }
  if (!route.query.category && !searchQuery.value) {
    return undefined;
  }

  if (
    Boolean(route.query.category) &&
    route.query.category !== "all" &&
    Boolean(searchQuery.value)
  ) {
    return {
      $and: [
        {
          category: {
            slug: {
              $eq: route.query.category,
            },
          },
        },
        {
          title: {
            $contains: searchQuery.value,
          },
        },
      ],
    };
  }

  if (Boolean(route.query.category) && route.query.category !== "all") {
    return {
      category: {
        slug: {
          $eq: route.query.category,
        },
      },
    };
  }

  if (Boolean(searchQuery.value)) {
    return {
      title: {
        $contains: searchQuery.value,
      },
    };
  }
});
const { appDir } = useAppDir();

const { data: articles, status: articleStatus } = useAsyncData(
  STRAPI_ENDPOINT.ARTICLES,
  () =>
    find<ArticleType>(STRAPI_ENDPOINT.ARTICLES, {
      populate: {
        cover: true,
        tags: true,
      },
      filters: filterWith.value,
      pagination: {
        page:
          route.query.page && !isNaN(route.query.page as any)
            ? Number(route.query.page)
            : 1,
        pageSize: 12,
      },
    }),
  {
    watch: [
      () => debouncedSearchQuery.value,
      () => route.query.page,
      () => route.query.category,
      () => route.query.tag,
    ],
    transform: function (res) {
      return nuxtConf.runWithContext(() => {
        const transformedData = res?.data.map((elem) => ({
          ...elem,
          cover: elem.cover
            ? { ...elem.cover, url: imagePathPrefix(elem.cover.url) }
            : undefined,
        }));

        return { ...res, data: transformedData };
      });
    },
  },
);

const handleGetNextPage = () => {
  if (!route.query.page) {
    console.log("Error get next page, Cannot find current page number");
    return;
  }
  router.push({
    query: {
      ...route.query,
      page: Number(route.query.page) + 1,
    },
  });
};
const handleTogglePage = (pageTarget: number) => {
  if (!pageTarget) {
    console.log("Error toggle page, Cannot find current page number");
    return;
  }
  router.push({
    query: {
      ...route.query,
      page: pageTarget,
    },
  });
};
const handleGetPrevPage = () => {
  if (!route.query.page) {
    console.log("Error get previous page, Cannot find current page number");
    return;
  }
  router.push({
    query: {
      ...route.query,
      page: Number(route.query.page) - 1,
    },
  });
};

watchEffect(() => {
  if (!content.value || contentStatus.value !== "success") return;
});
useServerSeoMeta({
  title: content.value?.data.seoTitle,
  description: content.value?.data.seoDescription,
  ogTitle: content.value?.data.seoTitle,
  ogDescription: content.value?.data.seoDescription,
});
</script>
<style lang="css" scoped>
.search-wrapper {
  @apply relative me-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#C7C7CC] p-1.5 px-2 text-[#C7C7CC] focus-within:border-app-black-secondary md:w-2/5 tablet:w-[222px];
}
.search-wrapper > input {
  @apply w-full flex-1 border-transparent text-app-black-secondary focus:border-none focus:outline-none;
}
</style>
