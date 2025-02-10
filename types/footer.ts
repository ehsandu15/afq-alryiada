import type {
  AdvancedButton,
  AdvancedLink,
  BasicButton,
  ImageType,
  SocialMedia,
  StrapiType,
} from "./shared";

export type AppFooterType = StrapiType & {
  logo: ImageType;
  ctaBtn: AdvancedLink;
  copyRights: string;
  privacyPolicyLink: BasicButton;
  social_medias: SocialMedia[];
};
