import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export type CardTransactionStatus = "granted" | "allocated" | "returned";

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

export interface CardTransactionPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  status: CardTransactionStatus;
  date: Date;
  amount: Amount;
  buttonProps?: Partial<ButtonPort<"a" | "button">>;
}
