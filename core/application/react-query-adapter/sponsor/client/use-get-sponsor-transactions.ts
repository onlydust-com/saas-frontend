import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { GetSponsorTransactionsModel } from "@/core/domain/sponsor/sponsor-contract.types";

export function useGetSponsorTransactions({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<SponsorFacadePort["getSponsorTransactions"], GetSponsorTransactionsModel>) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<SponsorFacadePort["getSponsorTransactions"], GetSponsorTransactionsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: sponsorStoragePort.getSponsorTransactions,
    })
  );
}
