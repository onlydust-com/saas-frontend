import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { GetSponsorTransactionsStatsResponse } from "@/core/domain/sponsor/sponsor-contract.types";

export function useGetSponsorTransactionsStats({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<SponsorFacadePort["getSponsorTransactionsStats"], GetSponsorTransactionsStatsResponse>) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...sponsorStoragePort.getSponsorTransactionsStats({ pathParams, queryParams }),
      options: {
        staleTime: 10000,
        ...options,
      },
    })
  );
}
