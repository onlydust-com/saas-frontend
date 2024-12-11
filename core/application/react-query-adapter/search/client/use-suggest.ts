import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { SearchFacadePort } from "@/core/domain/search/input/search-facade-port";
import { SuggestModel } from "@/core/domain/search/search-contract.types";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useSuggest({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<SearchFacadePort["suggest"], SuggestModel>) {
  const searchStoragePort = bootstrap.getSearchStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...searchStoragePort.suggest({
        pathParams,
        queryParams,
      }),
      options: {
        retry: 0,
        refetchOnWindowFocus: false,
        ...options,
      },
    })
  );
}
