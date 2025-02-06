import type { AdvancedButton, ImageType } from "./shared";

export type AppHeaderType = {
  ctaBtn: Omit<AdvancedButton, "elementId" | "media">;
  logo?: Omit<AdvancedButton, "media"> & { icon: ImageType };
};
