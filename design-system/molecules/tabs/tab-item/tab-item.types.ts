import { PropsWithChildren } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {}

export type TabVariant = "underline" | "solid" | "flat" | "brand";
export type TabsSize = "sm" | "md";

interface DataAttributes {
  "data-hover"?: boolean;
  "data-focus"?: boolean;
}

interface ClassNames {
  base: string;
  startIcon: string;
  label: string;
  badge: string;
}

export interface TabItemPort extends Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
  badge?: BadgePort<"div">;
  startIcon?: IconPort;
  isSelected?: boolean;
  variant?: TabVariant;
  size?: TabsSize;
  attr?: DataAttributes;
  id: string;
  onClick?: (id: string) => void;
}
