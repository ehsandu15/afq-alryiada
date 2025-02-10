import type {
  AdvancedButton,
  AdvancedLink,
  BasicButton,
  ImageType,
} from "./shared";

export type CooperationType = {
  cover: ImageType;
  title: string;
  description: string;
  primaryAction?: AdvancedLink | null;
  secondaryAction?: BasicButton | null;
  ishasActions: boolean;
};
