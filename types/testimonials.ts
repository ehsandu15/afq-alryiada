import type { ImageType, StrapiType } from "./shared";

export type TestimonialsType = StrapiType & {
  authorName: string;
  authorTitle: string;
  comment: string;
  authorCover: ImageType;
};
