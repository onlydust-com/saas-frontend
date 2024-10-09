import { GetCountriesPortParams, GetCountriesPortResponse } from "@/core/domain/country/country-contract.types";

export interface CountryFacadePort {
  getCountries(p: GetCountriesPortParams): GetCountriesPortResponse;
}
