import { BaseHTMLAttributes } from "react";

import { COLORS } from "@/shared/theme/colors";

interface Variants {
  shape: "square" | "circle";
  background: keyof typeof COLORS.background | "glass";
}

interface ClassNames {
  base: string;
}

export interface SkeletonPort extends BaseHTMLAttributes<HTMLDivElement>, Partial<Variants> {
  classNames?: Partial<ClassNames>;
}
