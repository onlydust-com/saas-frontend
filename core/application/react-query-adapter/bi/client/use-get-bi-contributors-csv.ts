import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiContributorsCsv({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<BiFacadePort["getBiContributorsCsv"], undefined, Blob>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...biStoragePort.getBiContributorsCsv({ pathParams, queryParams }),
      options,
    })
  );
}
