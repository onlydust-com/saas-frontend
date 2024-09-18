import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { UserStats } from "@/core/domain/user/models/user-stats-model";

export function useGetUserStats({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<UserFacadePort["getUserStats"], UserStats>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getUserStats({ pathParams, queryParams }),
      options,
    })
  );
}
