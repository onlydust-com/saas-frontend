import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

interface BaseProps {
  amount: string;
  budget: DetailedTotalMoneyTotalPerCurrency;
}

interface ReadOnlyProps extends BaseProps {
  onAmountChange?: never;
  allBudgets?: never;
  onBudgetChange?: never;
  readOnly?: true;
}

interface InputProps extends BaseProps {
  onAmountChange: (amount: string) => void;
  allBudgets?: DetailedTotalMoneyTotalPerCurrency[];
  onBudgetChange: (budget: DetailedTotalMoneyTotalPerCurrency) => void;
  readOnly?: never;
}

export type AmountSelectorProps = ReadOnlyProps | InputProps;
