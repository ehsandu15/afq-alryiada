import type { ImageType, StrapiType } from "./shared";

export type ServiceType = StrapiType & {
  id: number;
  title: string;
  content: string;
  icon: ImageType;
  cover: ImageType;
};
