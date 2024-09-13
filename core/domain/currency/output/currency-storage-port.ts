import {
  GetSupportedCurrenciesPortParams,
  GetSupportedCurrenciesPortResponse,
} from "@/core/domain/currency/currency-contract.types";

export interface CurrencyStoragePort {
  routes: Record<string, string>;
  getSupportedCurrencies(p: GetSupportedCurrenciesPortParams): GetSupportedCurrenciesPortResponse;
}
