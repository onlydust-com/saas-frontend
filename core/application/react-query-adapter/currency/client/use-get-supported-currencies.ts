import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetSupportedCurrenciesModel } from "@/core/domain/currency/currency-contract.types";
import { CurrencyFacadePort } from "@/core/domain/currency/input/currency-facade-port";

export function useGetSupportedCurrencies({
  options,
}: UseQueryFacadeParams<CurrencyFacadePort["getSupportedCurrencies"], GetSupportedCurrenciesModel>) {
  const currencyStoragePort = bootstrap.getCurrencyStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...currencyStoragePort.getSupportedCurrencies({}),
      options,
    })
  );
}
