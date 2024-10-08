import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ContributionFacadePort } from "@/core/domain/contribution/input/contribution-facade-port";
import { ContributionEventInterface } from "@/core/domain/contribution/models/contribution-event-model";

export function useGetContributionEvents({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<ContributionFacadePort["getContributionEvent"], ContributionEventInterface[]>) {
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributionStoragePort.getContributionEvent({ pathParams, queryParams }),
      options,
    })
  );
}
