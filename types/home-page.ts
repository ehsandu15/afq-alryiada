import type { ArticleType } from "./blogs";
import type { CooperationType } from "./cooperation";
import type { ServiceType } from "./services";
import type {
  AdvancedButton,
  AdvancedLink,
  BasicButton,
  ImageType,
  SectionHeadingType,
  SectionTitle,
  SocialMedia,
  StrapiType,
} from "./shared";
import type { TechnologyType } from "./technologies";
import type { TestimonialsType } from "./testimonials";

export interface HeroSectionType {
  heroHeadingTitle: SectionHeadingType;
  heroAdvancedSubTitle: string;
  heroAdvancedMobileSubTitle: string;
  heroDescription: string;
  heroAdvancedTitle: SectionTitle;
  contactBtn: AdvancedLink;
  heroId: BasicButton;
}

export interface ServicesSectionType {
  servicesHeadingTitle: SectionHeadingType;
  servicesDescription: string;
  servicesSecondaryHeading: SectionHeadingType;
  servicesSecondaryDescription: string;
  servicesSectionTitle: SectionTitle;
  servicesContactBtn: Omit<AdvancedLink, "elementId" | "media">;
  services_lists: ServiceType[];
  servicesId: BasicButton;
}

export interface PrivilegeSectionType {
  privilegeHeadingTitle: SectionHeadingType;
  privilegeDescription: string;
  privilegeSectionTitle: SectionTitle;
  privilegeBackgroundImag?: ImageType;
  privilegePatternImage?: ImageType;
  privilegePersonImage?: ImageType;
  privilegesId: BasicButton;
}

export interface CooperationSectionType {
  cooperationHeadingTitle: SectionHeadingType;
  cooperationDescription: string;
  cooperation_lists: CooperationType[];
  cooperationId: BasicButton;
}

export interface TechSectionType {
  techHeadingTitle: SectionHeadingType;
  techDescription: string;
  techSectionTitle: SectionTitle;
  technologies_lists: TechnologyType[];
  technologiesId: BasicButton;
}

export interface BlogSectionType {
  blogHeaingTitle: SectionHeadingType;
  blogDescription: string;
  blogShowMoreBtn: AdvancedLink;
  articles: ArticleType[];
  blogsId: BasicButton;
}

export interface TestimonialsSectionType {
  testimonialsHeadingTitle: SectionHeadingType;
  testimonialsSectionTitle: SectionTitle;
  testimonials_lists: TestimonialsType[];
  testimonialsPeoplesPatternImg: ImageType | null;
  testimonialsId: BasicButton;
}

export interface PartnersSectionType {
  partnersHeaingtitle: SectionHeadingType;
}

export interface IHomePage
  extends StrapiType,
    HeroSectionType,
    ServicesSectionType,
    PrivilegeSectionType,
    CooperationSectionType,
    TechSectionType,
    BlogSectionType,
    TestimonialsSectionType,
    PartnersSectionType {
  whatsapp: SocialMedia;
}
