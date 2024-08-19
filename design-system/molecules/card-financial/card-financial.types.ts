import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { AvatarGroupPort } from "@/design-system/molecules/avatar-group";

interface Variants {
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
}

interface ClassNames {
  base: string;
}

export interface CardFinancialPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  classNames?: Partial<ClassNames>;
  htmlProps?: ComponentPropsWithoutRef<C>;
  title: "Available" | "Granted" | "Rewarded";
  amount: number;
  currency: string;
  avatarGroup?: AvatarGroupPort<"div">;
  cta?: ButtonPort<"button">;
  size?: "m" | "xl";
}
