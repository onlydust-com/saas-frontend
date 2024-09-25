import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { BiFacadePort } from "@/core/domain/bi/input/bi-facade-port";

export function useGetBiProjectsCsv({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<BiFacadePort["getBiProjectsCsv"], undefined, Blob>) {
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...biStoragePort.getBiProjectsCsv({ pathParams, queryParams }),
      options,
    })
  );
}
