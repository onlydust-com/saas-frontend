import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { GetSponsorProgramsModel } from "@/core/domain/sponsor/sponsor-contract.types";

export function useGetSponsorPrograms({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<SponsorFacadePort["getSponsorPrograms"], GetSponsorProgramsModel>) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<SponsorFacadePort["getSponsorPrograms"], GetSponsorProgramsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: sponsorStoragePort.getSponsorPrograms,
    })
  );
}
