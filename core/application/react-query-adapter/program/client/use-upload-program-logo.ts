import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";

export function useUploadProgramLogo({
  pathParams,
  options,
}: UseMutationFacadeParams<ProgramFacadePort["uploadProgramLogo"], undefined, never, File> = {}) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.uploadProgramLogo({ pathParams }),
      ...options,
    })
  );
}
