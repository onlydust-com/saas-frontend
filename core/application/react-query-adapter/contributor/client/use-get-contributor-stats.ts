import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorStatsInterface } from "@/core/domain/contributor/models/contributor-stats-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetContributorStats({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<ContributorFacadePort["getContributorStats"], ContributorStatsInterface>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributorStoragePort.getContributorStats({ pathParams, queryParams }),
      options,
    })
  );
}
