import { BaseHTMLAttributes } from "react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface ClassNames {
  base: string;
}

export interface IconPort extends BaseHTMLAttributes<HTMLSpanElement> {
  classNames?: Partial<ClassNames>;
  size?: number;
  color?: string;
  name: RemixIconsName;
}
