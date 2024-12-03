import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GetProgramSponsorsModel } from "@/core/domain/program/program-contract.types";

export function useGetProgramSponsors({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ProgramFacadePort["getProgramSponsors"], GetProgramSponsorsModel>) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ProgramFacadePort["getProgramSponsors"], GetProgramSponsorsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: programStoragePort.getProgramSponsors,
    })
  );
}
