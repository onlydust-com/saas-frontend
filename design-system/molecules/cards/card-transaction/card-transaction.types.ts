import { ComponentPropsWithoutRef, ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { PaperPort } from "@/design-system/atoms/paper";

interface Variants {}

interface ClassNames {
  base: string;
}

enum CardTransactionType {
  ALLOCATED = "ALLOCATED",
  GRANTED = "GRANTED",
  UNGRANTED = "UNGRANTED",
  UNALLOCATED = "UNALLOCATED",
}

export type CardTransactionTypes = `${CardTransactionType}`;

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
  usdEquivalent?: number;
}

export interface CardTransactionPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  type: CardTransactionTypes;
  date: string;
  amount: Amount;
  buttonProps?: ButtonPort<"button">;
  badgeProps?: BadgePort<"button">;
  size?: PaperPort<C>["size"];
  background?: PaperPort<C>["background"];
  border?: PaperPort<C>["border"];
}
