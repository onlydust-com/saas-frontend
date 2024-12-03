import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";

export function useGetSponsorTransactionsCsv({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<SponsorFacadePort["getSponsorTransactionsCsv"], undefined, Blob>) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...sponsorStoragePort.getSponsorTransactionsCsv({ pathParams, queryParams }),
      options,
    })
  );
}
