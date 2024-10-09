import { GetCountryPortParams, GetCountryPortResponse } from "@/core/domain/country/country-contract.types";

export interface CountryFacadePort {
  getCountry(p: GetCountryPortParams): GetCountryPortResponse;
}
