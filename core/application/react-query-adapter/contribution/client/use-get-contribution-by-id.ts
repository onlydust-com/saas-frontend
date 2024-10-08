import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ContributionFacadePort } from "@/core/domain/contribution/input/contribution-facade-port";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export function useGetContributionById({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<ContributionFacadePort["getContributionsById"], ContributionActivityInterface>) {
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributionStoragePort.getContributionsById({ pathParams, queryParams }),
      options,
    })
  );
}
