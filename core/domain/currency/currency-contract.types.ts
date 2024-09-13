import { CurrencySupportedListItemInterface } from "@/core/domain/currency/models/currency-supported-list-item-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Supported Currencies ------------------------------ */

export type GetSupportedCurrenciesResponse = components["schemas"]["SupportedCurrencyListResponse"];

export type GetSupportedCurrenciesModel = Omit<GetSupportedCurrenciesResponse, "currencies"> & {
  currencies: CurrencySupportedListItemInterface[];
};

export type GetSupportedCurrenciesPortParams = HttpClientParameters<object>;

export type GetSupportedCurrenciesPortResponse = HttpStorageResponse<GetSupportedCurrenciesModel>;
