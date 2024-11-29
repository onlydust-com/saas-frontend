import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";

export function useGetProgramTransactionsCsv({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<ProgramFacadePort["getProgramTransactionsCsv"], undefined, Blob>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.getProgramTransactionsCsv({ pathParams, queryParams }),
      options,
    })
  );
}
