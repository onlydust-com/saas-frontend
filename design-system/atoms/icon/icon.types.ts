import { LucideIcon } from "lucide-react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface ClassNames {
  base: string;
}

export interface IconPort {
  component: LucideIcon;
  classNames?: Partial<ClassNames>;
  size?: number;
  strokeWidth?: number;
}

export interface RemixIconPort extends Omit<IconPort, "component"> {
  name: RemixIconsName;
  color?: string;
}
