import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { SponsorInterface } from "@/core/domain/sponsor/models/sponsor-model";

export function useGetSponsor({
  options,
  pathParams,
}: UseQueryFacadeParams<SponsorFacadePort["getSponsor"], SponsorInterface>) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...sponsorStoragePort.getSponsor({ pathParams }),
      options,
    })
  );
}
