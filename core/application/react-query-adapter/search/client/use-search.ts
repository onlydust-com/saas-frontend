import { useInfiniteQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { SearchFacadePort } from "@/core/domain/search/input/search-facade-port";
import { SearchModel } from "@/core/domain/search/search-contract.types";

import { UseInfiniteQueryFacadeParams, useInfiniteQueryAdapter } from "../../helpers/use-infinite-query-adapter";

export function useSearch({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<SearchFacadePort["search"], SearchModel>) {
  const searchStoragePort = bootstrap.getSearchStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<SearchFacadePort["search"], SearchModel>({
      pathParams,
      queryParams,
      options: {
        retry: 0,
        refetchOnWindowFocus: false,
        ...options,
      },
      httpStorage: searchStoragePort.search,
    })
  );
}
