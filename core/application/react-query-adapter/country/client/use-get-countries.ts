import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetCountriesResponse } from "@/core/domain/country/country-contract.types";
import { CountryFacadePort } from "@/core/domain/country/input/country-facade-port";

export function useGetCountries({
  options,
}: UseQueryFacadeParams<CountryFacadePort["getCountries"], GetCountriesResponse>) {
  const countriesStoragePort = bootstrap.getCountriesStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...countriesStoragePort.getCountries({}),
      options,
    })
  );
}
