import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { GetUserLanguagesModel } from "@/core/domain/user/user-contract.types";

export function useGetUserLanguages({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<UserFacadePort["getUserLanguages"], GetUserLanguagesModel>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<UserFacadePort["getUserLanguages"], GetUserLanguagesModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: userStoragePort.getUserLanguages,
    })
  );
}
