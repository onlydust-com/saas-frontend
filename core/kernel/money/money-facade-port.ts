import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type Currency = components["schemas"]["ShortCurrencyResponse"];

export interface MoneyFacadePort {
  isFiat(currency?: Currency): boolean;
  format(params: {
    amount?: number | null;
    currency?: Currency;
    options?: Intl.NumberFormatOptions;
    locale?: Intl.LocalesArgument;
  }): { amount: string; code: Currency["code"] | undefined };
  getCurrency(code: Currency["code"]): Currency;
}
