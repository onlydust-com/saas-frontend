import { ComponentPropsWithoutRef, ElementType } from "react";

interface Variants {}

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
  budgetPercentage?: number;
}
