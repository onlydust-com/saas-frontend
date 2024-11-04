import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";
import { ApplicationInterface } from "@/core/domain/application/model/application-model";

export function useGetApplicationById({
  options,
  pathParams,
}: UseQueryFacadeParams<ApplicationFacadePort["getApplicationById"], ApplicationInterface>) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...applicationStoragePort.getApplicationById({ pathParams }),
      options,
    })
  );
}
