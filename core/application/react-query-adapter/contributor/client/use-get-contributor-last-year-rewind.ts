import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorLastYearRewindInterface } from "@/core/domain/contributor/models/contributor-last-year-rewind-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetContributorLastYearRewind({
  pathParams,
  options,
}: UseQueryFacadeParams<ContributorFacadePort["getContributorLastYearRewind"], ContributorLastYearRewindInterface>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributorStoragePort.getContributorLastYearRewind({ pathParams }),
      options,
    })
  );
}
