import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SearchFacadePort } from "@/core/domain/search/input/search-facade-port";
import { SearchModel } from "@/core/domain/search/search-contract.types";

export function useSearch({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<SearchFacadePort["search"], SearchModel>) {
  const searchStoragePort = bootstrap.getSearchStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...searchStoragePort.search({ pathParams, queryParams }),
      options,
    })
  );
}
