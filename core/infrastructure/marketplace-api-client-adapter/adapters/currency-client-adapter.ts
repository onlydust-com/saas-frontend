import { GetSupportedCurrenciesResponse } from "@/core/domain/currency/currency-contract.types";
import { CurrencySupportedListItem } from "@/core/domain/currency/models/currency-supported-list-item-model";
import { CurrencyStoragePort } from "@/core/domain/currency/output/currency-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class CurrencyClientAdapter implements CurrencyStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getSupportedCurrencies: "currencies",
  } as const;

  getSupportedCurrencies = () => {
    const path = this.routes["getSupportedCurrencies"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetSupportedCurrenciesResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        currencies: data.currencies.map(currency => new CurrencySupportedListItem(currency)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
