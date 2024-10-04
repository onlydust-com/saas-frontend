import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetContributionsModel } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionFacadePort } from "@/core/domain/contribution/input/contribution-facade-port";

export function useGetContributions({
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ContributionFacadePort["getContributions"], GetContributionsModel>) {
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ContributionFacadePort["getContributions"], GetContributionsModel>({
      queryParams,
      options,
      httpStorage: contributionStoragePort.getContributions,
    })
  );
}
