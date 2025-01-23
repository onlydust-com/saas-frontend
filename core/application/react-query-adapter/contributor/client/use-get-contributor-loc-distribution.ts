import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorLocDistributionInterface } from "@/core/domain/contributor/models/contributor-loc-distribution-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetContributorLocDistribution({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ContributorFacadePort["getContributorLocDistribution"], ContributorLocDistributionInterface>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributorStoragePort.getContributorLocDistribution({ pathParams, queryParams }),
      options,
    })
  );
}
