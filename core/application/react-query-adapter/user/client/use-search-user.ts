import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { SearchUsersModel } from "@/core/domain/user/user-contract.types";

export function useSearchUser({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<UserFacadePort["searchUser"], SearchUsersModel>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.searchUser({ pathParams, queryParams }),
      options,
    })
  );
}
