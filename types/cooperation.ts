import type { AdvancedButton, BasicButton, ImageType } from "./shared";

export type CooperationType = {
  cover: ImageType;
  title: string;
  description: string;
  primaryAction?: AdvancedButton | null;
  secondaryAction?: BasicButton | null;
  ishasActions: boolean;
};
