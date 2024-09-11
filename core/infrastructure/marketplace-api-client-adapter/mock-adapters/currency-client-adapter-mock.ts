import { CurrencyStoragePort } from "@/core/domain/currency/output/currency-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class CurrencyClientAdapterMock implements CurrencyStoragePort {
  constructor() {}

  routes = {};

  getSupportedCurrencies = mockHttpStorageResponse<CurrencyStoragePort["getSupportedCurrencies"]>;
}
