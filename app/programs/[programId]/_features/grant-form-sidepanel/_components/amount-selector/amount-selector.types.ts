import { RefObject } from "react";

import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface AmountSelectorProps {
  portalRef: RefObject<HTMLDivElement>;
  amount: string;
  onAmountChange: (amount: string) => void;
  budget: DetailedTotalMoneyTotalPerCurrency;
  allBudgets: DetailedTotalMoneyTotalPerCurrency[];
  onBudgetChange: (budget: DetailedTotalMoneyTotalPerCurrency) => void;
}
