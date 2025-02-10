import type {
  AdvancedLink,
  ImageType,
  SectionTitle,
  SocialMedia,
} from "./shared";

export type AboutUsContent = {
  logo: ImageType;
  headingTitle: string;
  sectionTitle: SectionTitle;
  actionButton: AdvancedLink;
  primaryDescription: string;
  secondaryDescription: string;
  thirdDescription: string;
  social_medias: SocialMedia[];
  textHighlightWord: string;
  secondarySectionBackground: ImageType;
  seoTitle: string;
  seoDescription: string;
  highlightWord: string;
  whatsapp: SocialMedia;
};
