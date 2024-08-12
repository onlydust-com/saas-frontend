import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { ProgramInterface } from "@/core/domain/program/models/program-model";

export function useGetProgramById({
  options,
}: UseQueryFacadeParams<ProgramFacadePort["getProgramById"], ProgramInterface>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...programStoragePort.getProgramById({}),
      options,
    })
  );
}
