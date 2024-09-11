import {
  GetSupportedCurrenciesPortParams,
  GetSupportedCurrenciesPortResponse,
} from "@/core/domain/currency/currency-contract.types";

export interface CurrencyFacadePort {
  getSupportedCurrencies(p: GetSupportedCurrenciesPortParams): GetSupportedCurrenciesPortResponse;
}
