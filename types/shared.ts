export interface SectionTitle {
  id: number;
  title: string;
  color?: string;
  icon?: ImageType;
}

export interface AdvancedLink {
  id: number;
  title: string;
  href: string;
  elementId?: string;
  media?: ImageType;
}

export interface BasicButton {
  id: number;
  title: string;
  href: string;
}

export interface StrapiType {
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export type NavigationLinkType = StrapiType & {
  title: string;
  href: string;
};

export type ImageFormatType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

export type ImageType = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormatType;
    medium?: ImageFormatType;
    small?: ImageFormatType;
    large?: ImageFormatType;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type SocialMedia = Omit<AdvancedLink, "media"> &
  StrapiType & {
    icon: ImageType;
    id: number;
  };

export type FormField = {
  __component: "shared.form-field";
  id: number;
  title: string;
  type: string;
  placeholder: string;
  elemId: string;
  name: string;
};

export type AdvancedButton = {
  __component: "shared.advanced-button";
  id: number;
  title: string;
  elemId: string;
  icon: ImageType;
};
