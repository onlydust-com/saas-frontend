import { CountryStoragePort } from "@/core/domain/country/outputs/country-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class CountryClientAdapterMock implements CountryStoragePort {
  constructor() {}

  routes = {};

  getCountries = mockHttpStorageResponse<CountryStoragePort["getCountries"]>;
}
