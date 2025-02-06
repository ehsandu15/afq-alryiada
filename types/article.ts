import type { ImageType, StrapiType } from "./shared";

export type ArticleType = StrapiType & {
  title: string;
  description: string;
  id: number;
  keywords: string;
  slug: string;
  cover: ImageType;
};
