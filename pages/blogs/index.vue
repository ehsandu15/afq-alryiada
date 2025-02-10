<template>
  <section
    class="app-container container flex min-h-screen flex-col items-center justify-start"
  >
    <AdvancedSectionHeading
      icon-color-class="bg-secondary"
      :title="content?.data.sectionTitle.title!"
      text-color-class="text-app-black-secondary"
      class="mb-5 !border-[#C7C7CC]"
    />
    <h3
      v-html="headingTitle"
      class="text-5xl font-extrabold capitalize leading-[70px] text-app-black-secondary"
    ></h3>
    <div class="mt-5 flex w-full items-center justify-start gap-12">
      <span
        class="relative flex w-[222px] items-center justify-center gap-2 rounded-full border border-[#C7C7CC] p-1.5 text-[#C7C7CC] focus-within:border-app-black-secondary"
      >
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
          class="w-full flex-1 border-x-4 border-y-2 border-transparent text-app-black-secondary focus:outline-none"
          v-model="searchQuery"
        />
      </span>
      <div class="flex-1">
        <div class="embla" ref="emblaRef">
          <div class="embla__container">
            <NuxtLink
              class="embla__slide"
              v-for="category of categories?.data"
              :key="category.documentId"
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
          </div>
        </div>
      </div>
    </div>
    <div class="mt-7 flex w-full flex-col gap-7">
      <ul class="mb-11 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="article of articles?.data"
          :key="article.id"
          :article="article"
        />
      </ul>
      <PaginationItems
        v-if="
          articleStatus === 'success' && articles && articles?.data?.length >= 1
        "
        :current-page="Number(route?.query.page) || 1"
        :total-pages="articles?.meta?.pagination.pageCount || 1"
        @on-next-page="handleGetNextPage"
        @on-toggle-page="handleTogglePage"
        @on-prev-page="handleGetPrevPage"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import clsx from "clsx";
import emblaCarouselVue from "embla-carousel-vue";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import type {
  ArticleCategoryType,
  ArticleType,
  BlogContentType,
} from "~/types/blogs";

const [emblaRef] = emblaCarouselVue();

const route = useRoute();
const searchQuery = ref("");
const debouncedSearchQuery = useDebounce(searchQuery, 450);
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

const isComplexFiltering = computed(() =>
  Boolean(route.query.category && route.query.search),
);

const isFiltering = computed(() =>
  Boolean(route.query.category || searchQuery.value),
);

// FIXME: cant able to search and filter by category together
const filterWith = computed(() => {
  if (isFiltering.value) {
    if (Boolean(route.query.category) && route.query.category !== "all") {
      return { category: { slug: { $eq: route.query.category } } };
    }

    if (Boolean(searchQuery.value) || route.query.category === "all") {
      return { title: { $contains: searchQuery.value } };
    }
    if (
      Boolean(searchQuery.value) &&
      Boolean(route.query.category) &&
      route.query.category !== "all"
    ) {
      return {
        $and: [
          { title: { $contains: searchQuery.value } },
          { category: { slug: { $eq: route.query.category } } },
        ],
      };
    }
    return undefined;
  } else {
    return undefined;
  }
});

const {
  data: articles,
  status: articleStatus,
  error: articleError,
} = useAsyncData(
  STRAPI_ENDPOINT.ARTICLES,
  () =>
    find<ArticleType>(STRAPI_ENDPOINT.ARTICLES, {
      populate: {
        cover: true,
      },
      filters: filterWith.value,
      pagination: {
        page:
          route.query.page && !isNaN(route.query.page as any)
            ? Number(route.query.page)
            : 1,
        pageSize: 9,
      },
    }),
  {
    watch: [
      () => route.query.page,
      () => debouncedSearchQuery.value,
      () => route.query.category,
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

useSeoMeta({
  title: content.value?.data.seoTitle,
  description: content.value?.data.seoDescription,
});

const headingTitle = computed(() => {
  if (contentStatus.value !== "success" || !content.value?.data) {
    return "NA-NA";
  }
  return highlightSpecificWord({
    text: content.value?.data.headingTitle,
    word: content.value?.data.highlightWord,
    classNames: "text-secondary",
  });
});
</script>
<style scoped lang="css">
.embla {
  overflow: hidden;
  width: 100%;
}
.embla__container {
  display: flex;
  gap: 24px;
  flex-direction: row;
}

.embla__slide {
  flex: 0 0 max-content;
  min-width: 0;
  border: 2px solid transparent;
  padding-block: 8px;
  border-radius: 0px;
  margin: 0;
}
</style>
