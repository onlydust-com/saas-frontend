import {
  GetSupportedCurrenciesPortParams,
  GetSupportedCurrenciesPortResponse,
} from "@/core/domain/currency/currency-contract.types";

export interface CurrencyStoragePort {
  getSupportedCurrencies(p: GetSupportedCurrenciesPortParams): GetSupportedCurrenciesPortResponse;
}
