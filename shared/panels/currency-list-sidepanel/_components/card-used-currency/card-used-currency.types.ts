import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

export interface CardUsedCurrencyProps {
  budget: DetailedTotalMoneyTotalPerCurrency;
  onActionClick: (currencyId: string) => void;
}
