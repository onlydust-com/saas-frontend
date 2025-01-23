import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { ContributorFacadePort } from "@/core/domain/contributor/input/contributor-facade-port";
import { ContributorContributionsOverTimeInterface } from "@/core/domain/contributor/models/contributor-contributions-over-time-model";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetContributorContributionsOverTime({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<
  ContributorFacadePort["getContributorContributionsOverTime"],
  ContributorContributionsOverTimeInterface
>) {
  const contributorStoragePort = bootstrap.getContributorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...contributorStoragePort.getContributorContributionsOverTime({ pathParams, queryParams }),
      options,
    })
  );
}
