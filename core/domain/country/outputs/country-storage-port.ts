import { GetCountryPortParams, GetCountryPortResponse } from "@/core/domain/country/country-contract.types";

export interface CountryStoragePort {
  routes: Record<string, string>;
  getCountry(p: GetCountryPortParams): GetCountryPortResponse;
}
