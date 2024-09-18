import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { GetUserEcosystemsModel } from "@/core/domain/user/user-contract.types";

export function useGetUserEcosystems({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<UserFacadePort["getUserEcosystems"], GetUserEcosystemsModel>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<UserFacadePort["getUserEcosystems"], GetUserEcosystemsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: userStoragePort.getUserEcosystems,
    })
  );
}
