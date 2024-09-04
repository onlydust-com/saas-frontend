import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface AmountSelectorProps {
  amount: string;
  onAmountChange: (amount: string) => void;
  budget: DetailedTotalMoneyTotalPerCurrency;
  allBudgets: DetailedTotalMoneyTotalPerCurrency[];
  onBudgetChange: (budget: DetailedTotalMoneyTotalPerCurrency) => void;
}
