import type { BlocksContent } from "vue-strapi-blocks-renderer";
import type { ImageType, SectionTitle, StrapiType } from "./shared";

export type BlogContentType = StrapiType & {
  sectionTitle: SectionTitle;
  headingTitle: string;
  searchPlaceholder: string;
  seoTitle: string;
  seoDescription: string;
  highlightWord: string;
  noArticlesFound: string;
};

export type KeywordType = {
  elementId: string | null;
  href: string;
  id: number;
  title: string;
  __component: "shared.basic-link";
};

export type ArticleType = StrapiType & {
  title: string;
  description: string;
  id: number;
  keywords: KeywordType[];
  slug: string;
  cover: ImageType | undefined;
  content: string;
};

export type ArticleCategoryType = StrapiType & {
  name: string;
  slug: string;
  description: string;
};
