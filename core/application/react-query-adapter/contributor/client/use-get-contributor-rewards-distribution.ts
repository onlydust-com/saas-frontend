import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorRewardsDistributionInterface } from "@/core/domain/contributor/models/contributor-rewards-distribution-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetContributorRewardsDistribution({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<
  ContributorFacadePort["getContributorRewardsDistribution"],
  ContributorRewardsDistributionInterface
>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributorStoragePort.getContributorRewardsDistribution({ pathParams, queryParams }),
      options,
    })
  );
}
