import type {
  AdvancedButton,
  FormField,
  ImageType,
  StrapiType,
} from "./shared";

export type ContactForm = FormField[];

export type ContactInfo = {
  id: number;
  name: string;
  value: string;
  icon: ImageType;
  type: "TEXT" | "LINK";
};

export type ContactData = StrapiType & {
  contactForm: ContactForm;
  formActions: AdvancedButton[];
  contacts_infos: ContactInfo[];
  contactBoxImage: ImageType;
  contactBoxHeading: string;
  seoTitle: string;
  seoDescription: string;
  highlightWord: string;
};
