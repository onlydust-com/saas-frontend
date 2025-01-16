import { CSSProperties, ComponentProps, ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { COLORS } from "@/shared/theme/colors";
import { Translate } from "@/shared/translation/components/translate/translate";

export type TypoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type TypoAlign = "left" | "center" | "right";
export type TypoVariant = "text" | "heading";
export type TypoWeight = "regular" | "medium" | "semibold" | "bold";

interface Variants {
  weight: TypoWeight;
  variant: TypoVariant;
  size: TypoSize;
  align: TypoAlign;
  color: keyof typeof COLORS.typography;
  canHover?: boolean;
}

interface ClassNames {
  base: string;
}

export interface TypoPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: ComponentProps<typeof Translate>;
  style?: Partial<CSSProperties>;
}
