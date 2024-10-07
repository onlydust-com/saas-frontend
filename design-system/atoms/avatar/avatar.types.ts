import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface Variants {
  size: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shape: "rounded" | "squared";
}

interface ClassNames {
  base: string;
  image: string;
  name: string;
  icon: string;
}

interface AvatarImage {
  src?: string;
  alt?: string;
  fallback?: ReactNode;
}

export interface AvatarPort extends AvatarImage, Partial<Variants> {
  classNames?: Partial<ClassNames>;
  name?: string;
  icon?: AvatarImage;
  onlineIcon?: boolean;
  enableOptimizedImage?: boolean;
  iconProps?: IconPort;
}
