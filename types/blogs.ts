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

export type TagsType = {
  id: number;
  tagName: string;
  normalizedTagName: string;
};

export type ArticleType = StrapiType & {
  title: string;
  description: string;
  id: number;
  tags: TagsType[];
  slug: string;
  cover: ImageType | undefined;
  content: string;
};

export type ArticleCategoryType = StrapiType & {
  name: string;
  slug: string;
  description: string;
};
