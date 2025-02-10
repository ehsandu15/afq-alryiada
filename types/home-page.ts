import type { ArticleType } from "./blogs";
import type { CooperationType } from "./cooperation";
import type { ServiceType } from "./services";
import type {
  AdvancedButton,
  AdvancedLink,
  ImageType,
  SectionTitle,
  SocialMedia,
  StrapiType,
} from "./shared";
import type { TechnologyType } from "./technologies";
import type { TestimonialsType } from "./testimonials";

export interface HeroSectionType {
  heroHeadingTitle: string;
  heroAdvancedSubTitle: string;
  heroAdvancedMobileSubTitle: string;
  heroDescription: string;
  heroAdvancedTitle: SectionTitle;
  contactBtn: AdvancedLink;
}

export interface ServicesSectionType {
  servicesHeadingTitle: string;
  servicesDescription: string;
  servicesSecondaryHeading: string;
  servicesSecondaryDescription: string;
  servicesSectionTitle: SectionTitle;
  servicesContactBtn: Omit<AdvancedButton, "elementId" | "media">;
  services_lists: ServiceType[];
}

export interface PrivilegeSectionType {
  privilegeHeadingTitle: string;
  privilegeDescription: string;
  privilegeSectionTitle: SectionTitle;
  privilegeBackgroundImag?: ImageType;
  privilegePatternImage?: ImageType;
  privilegePersonImage?: ImageType;
}

export interface CooperationSectionType {
  cooperationHeadingTitle: string;
  cooperationDescription: string;
  cooperation_lists: CooperationType[];
}

export interface TechSectionType {
  techHeadingTitle: string;
  techDescription: string;
  techSectionTitle: SectionTitle;
  technologies_lists: TechnologyType[];
}

export interface BlogSectionType {
  blogHeaingTitle: string;
  blogDescription: string;
  blogShowMoreBtn: AdvancedLink;
  articles: ArticleType[];
}

export interface TestimonialsSectionType {
  testimonialsHeadingTitle: string;
  testimonialsSectionTitle: SectionTitle;
  testimonials_lists: TestimonialsType[];
  testimonialsPeoplesPatternImg: ImageType | null;
}

export interface PartnersSectionType {
  partnersHeaingtitle: string;
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
