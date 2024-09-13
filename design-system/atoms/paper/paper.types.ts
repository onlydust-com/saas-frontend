import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { COLORS } from "@/shared/theme/colors";

type paperSpacing =
  | "none"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "2md"
  | "lg"
  | "2lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl"
  | "11xl";

interface Variants {
  size?: paperSpacing;
  px?: paperSpacing;
  py?: paperSpacing;
  background: "transparent" | keyof typeof COLORS.background;
  border: "none" | keyof typeof COLORS.border;
  hasBorderHover?: boolean;
}

interface ClassNames {
  base: string;
}

export interface PaperPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  onClick?: () => void;
}
