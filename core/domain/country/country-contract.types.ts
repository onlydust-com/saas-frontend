import { CountryInterface } from "@/core/domain/country/models/country-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Get Countries -------------------------------- */

export type GetCountryResponse = components["schemas"]["CountriesResponse"];

export type GetCountryPortResponse = HttpStorageResponse<
  Omit<GetCountryResponse, "countries"> & { countries: CountryInterface[] }
>;

export type GetCountryPortParams = HttpClientParameters<object>;
