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

interface Icon {
  src: string;
  alt?: string;
}

export interface AvatarPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  src?: string;
  alt?: string;
  name?: string;
  fallback?: ReactNode;
  icon?: Icon;
  onlineIcon?: boolean;
}
