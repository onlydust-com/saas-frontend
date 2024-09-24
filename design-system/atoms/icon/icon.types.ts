import { LucideIcon } from "lucide-react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface ClassNames {
  base: string;
}

export type IconSize = "xxs" | "xs" | "sm" | "md" | "lg";

interface BaseIconPort {
  classNames?: Partial<ClassNames>;
  size?: IconSize;
}

export interface LucideIconPort extends BaseIconPort {
  component: LucideIcon;
}

export interface RemixIconPort extends BaseIconPort {
  name: RemixIconsName;
  color?: string;
}

export type IconPort = LucideIconPort | RemixIconPort;
