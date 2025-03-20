import type { SEND_MESSAGE_RESPONSE } from "~/constants/send-message-response";
import type { StrapiType } from "./shared";

export type MessageBody = {
  firstName: string;
  lastName: string;
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

export type MessageResponseError = {
  error: true;
  url: string;
  statusCode: number;
  statusMessage: typeof SEND_MESSAGE_RESPONSE;
  message: string;
  stack: string;
};
