import { ReactNode } from "react";

interface Variants {
  size: "xxs" | "xs" | "s" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shape: "rounded" | "squared";
}

interface ClassNames {
  base: string;
  img: string;
  fallback: string;
  name: string;
}

export interface AvatarPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  src?: string;
  alt?: string;
  name?: string;
  showFallback?: boolean;
  fallback?: ReactNode;
}
