import { GetCountriesPortParams, GetCountriesPortResponse } from "@/core/domain/country/country-contract.types";

export interface CountryStoragePort {
  routes: Record<string, string>;
  getCountries(p: GetCountriesPortParams): GetCountriesPortResponse;
}
