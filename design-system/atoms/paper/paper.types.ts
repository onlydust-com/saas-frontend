import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { COLORS } from "@/shared/theme/colors";
import { RADIUS } from "@/shared/theme/radius";
import { SPACING } from "@/shared/theme/spacing";

type Spacing = keyof typeof SPACING;

interface Variants {
  size?: Spacing;
  px?: Spacing;
  py?: Spacing;
  background: "transparent" | keyof typeof COLORS.background | "glass";
  border: "none" | keyof typeof COLORS.border;
  hasBorderHover?: boolean;
  rounded?: keyof typeof RADIUS;
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
