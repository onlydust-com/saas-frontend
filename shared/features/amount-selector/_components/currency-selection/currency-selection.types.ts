import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface CurrencySelectionProps {
  readOnly?: boolean;
  budget: DetailedTotalMoneyTotalPerCurrency;
  allBudgets?: DetailedTotalMoneyTotalPerCurrency[];
  showBudgetAmount: boolean;
  onBudgetChange: (budget: DetailedTotalMoneyTotalPerCurrency) => void;
  id?: string | number;
}
