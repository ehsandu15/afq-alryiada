import type { StrapiType } from "./shared";

export type MessageBody = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  ipV4?: string;
  location: {
    city?: string;
    country?: string;
  };
};

export type ContactRequestType = StrapiType & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  ipV4: string;
  location: string;
};
export type MessageResponseType = {
  message: string;
  success: boolean;
  details: string;
};
