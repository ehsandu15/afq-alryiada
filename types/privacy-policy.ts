import type { DefaultSeo } from "./seo";
import type { SectionHeadingType, StrapiType } from "./shared";

export type PrivacyPolicyContentType = StrapiType & {
  headingTitle: SectionHeadingType;
  terms: string;
  seo: DefaultSeo;
};
