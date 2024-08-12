import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GetProgramsModel } from "@/core/domain/program/program-contract.types";

export function useGetPrograms({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProgramFacadePort["getPrograms"], GetProgramsModel>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProgramFacadePort["getPrograms"], GetProgramsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: programStoragePort.getPrograms,
    })
  );
}
