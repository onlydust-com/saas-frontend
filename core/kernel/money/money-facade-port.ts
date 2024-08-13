import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type Currency = components["schemas"]["ShortCurrencyResponse"];

export interface FormatParams {
  value: number;
  currency: Currency;
  locale?: string;
  showCurrency?: boolean;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  showTilde?: boolean;
}

export interface MoneyFacadePort {
  getUSDCurrency: () => Currency;
  format(params: FormatParams): string;
}
