import { ComponentPropsWithoutRef, ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { PaperPort } from "@/design-system/atoms/paper";

export enum CardBudgetType {
  GRANTED = "GRANTED",
  RECEIVED = "RECEIVED",
}

interface Variants {
  clickable: boolean;
  type: CardBudgetType;
}

interface ClassNames {
  base: string;
}

interface Currency {
  id: string;
  code: string;
  name: string;
  logoUrl?: string;
  decimals: number;
}

interface Amount {
  value: number;
  currency: Currency;
  usdEquivalent: number;
}

export interface CardBudgetPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  amount: Amount;
  badgeProps?: BadgePort<"span">;
  onClick?: () => void;
  size?: PaperPort<C>["size"];
  background?: PaperPort<C>["background"];
  border?: PaperPort<C>["border"];
  type?: CardBudgetType;
}
