import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface AmountFieldProps {
  onAmountChange: (amount: string) => void;
  readOnly?: boolean;
  amount: string;
  isFilled: boolean;
  budget: DetailedTotalMoneyTotalPerCurrency;
}
