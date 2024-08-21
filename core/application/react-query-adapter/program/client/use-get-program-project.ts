import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { ProgramProjectInterface } from "@/core/domain/program/models/program-project-model";

export function useGetProgramProject({
  options,
  pathParams,
}: UseQueryFacadeParams<ProgramFacadePort["getProgramProject"], ProgramProjectInterface>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...programStoragePort.getProgramProject({ pathParams }),
      options,
    })
  );
}
