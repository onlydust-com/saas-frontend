import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface SummaryProps {
  amount: string;
  budget: DetailedTotalMoneyTotalPerCurrency;
}
