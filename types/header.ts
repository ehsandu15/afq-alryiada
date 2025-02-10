import type { AdvancedButton, AdvancedLink, ImageType } from "./shared";

export type AppHeaderType = {
  ctaBtn: Omit<AdvancedLink, "elementId" | "media">;
  logo?: Omit<AdvancedButton, "media"> & { icon: ImageType };
};
