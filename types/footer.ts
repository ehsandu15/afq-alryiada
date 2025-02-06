import type {
  AdvancedButton,
  BasicButton,
  ImageType,
  SocialMedia,
  StrapiType,
} from "./shared";

export type AppFooterType = StrapiType & {
  logo: ImageType;
  ctaBtn: AdvancedButton;
  copyRights: string;
  privacyPolicyLink: BasicButton;
  social_medias: SocialMedia[];
};
