import { PropsWithChildren } from "react";

import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { AmountSelectorActions } from "@/shared/features/amount-selector/amount-selector.types";

export interface QuickActionProps extends PropsWithChildren {
  actions: AmountSelectorActions[];
  onAmountChange: (amount: string) => void;
  budget: DetailedTotalMoneyTotalPerCurrency;
}
