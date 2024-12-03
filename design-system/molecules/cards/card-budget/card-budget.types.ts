import { ElementType } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { CardTemplatePort } from "@/design-system/molecules/cards/card-template";

export enum CardBudgetType {
  GRANTED = "GRANTED",
  RECEIVED = "RECEIVED",
  UNGRANTED = "UNGRANTED",
  UNALLOCATED = "UNALLOCATED",
}

interface Variants {
  clickable: boolean;
  type: CardBudgetType;
  isError: boolean;
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

export interface CardBudgetPort<C extends ElementType> extends Partial<Variants>, Partial<CardTemplatePort<C>> {
  amount: Amount;
  badgeProps?: BadgePort<"span">;
  type?: CardBudgetType;
}
