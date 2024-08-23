import { LucideIcon } from "lucide-react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface ClassNames {
  base: string;
}

export type IconSize = "xxs" | "xs" | "sm" | "md" | "lg";

export interface IconPort {
  component: LucideIcon;
  classNames?: Partial<ClassNames>;
  size?: IconSize;
}

export interface RemixIconPort extends Omit<IconPort, "component"> {
  name: RemixIconsName;
  color?: string;
}
