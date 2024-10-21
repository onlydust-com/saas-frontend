import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

interface BaseProps {
  amount: string;
  budget?: DetailedTotalMoneyTotalPerCurrency;
  showBudgetAmount?: boolean;
}

interface AmountSelectorReadOnlyProps extends BaseProps {
  id?: never;
  onAmountChange?: never;
  allBudgets?: never;
  onBudgetChange?: never;
  readOnly?: true;
}

export interface AmountSelectorInputProps extends BaseProps {
  id?: string | number;
  onAmountChange: (amount: string) => void;
  allBudgets?: DetailedTotalMoneyTotalPerCurrency[];
  onBudgetChange: (budget?: DetailedTotalMoneyTotalPerCurrency) => void;
  readOnly?: never;
}

export type AmountSelectorProps = AmountSelectorReadOnlyProps | AmountSelectorInputProps;
