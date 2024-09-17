import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";

export function useGetUserById({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<UserFacadePort["getUserById"], UserPublicInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getUserById({ pathParams, queryParams }),
      options,
    })
  );
}
