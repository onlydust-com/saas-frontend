import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GetProgramProjectsModel } from "@/core/domain/program/program-contract.types";

export function useGetProgramProjects({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProgramFacadePort["getProgramProjects"], GetProgramProjectsModel>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProgramFacadePort["getProgramProjects"], GetProgramProjectsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: programStoragePort.getProgramProjects,
    })
  );
}
