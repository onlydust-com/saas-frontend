import { Currency } from "@/core/kernel/money/money.types";

export interface MoneyFacadePort {
  isFiat(currency?: Currency): boolean;
}
