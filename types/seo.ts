import type { ImageType } from "./shared";

export type StructuredData = {
  "@context": string;
  "@type": string;
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
    postalCode: string;
    streetAddress: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  description: string;
  logo: string;
  name: string;
  sameAs: string[];
  url: string;
};

export type DefaultSeo = {
  canonicalUrl: string;
  keywords: string;
  metaDescription: string;
  metaTitle: string;
  robots: string;
  shareImage: ImageType;
};

export type TwitterType = {
  twitterCard: string;
  twitterCreator: string;
  twitterDescription: string;
  twitterImage: ImageType;
  twitterImageAlt: string;
  twitterSite: string | null;
  twitterTitle: string;
};

export type SiteData = {
  id: number;
  documentId: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  siteName: string;
  siteDescription: string;
  defaultSeo: DefaultSeo;
  structuredData: StructuredData;
  twitter: TwitterType;
  colorScheme: "normal" | "light dark" | "dark light" | "only light";
  themeColor: string;
};
