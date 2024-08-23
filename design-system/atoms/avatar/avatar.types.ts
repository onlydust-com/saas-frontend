import { ReactNode } from "react";

interface Variants {
  size: "xxs" | "xs" | "s" | "md" | "lg" | "xl" | "2xl" | "3xl";
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
}
