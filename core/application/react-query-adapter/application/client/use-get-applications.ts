import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { GetApplicationsModel } from "@/core/domain/application/application-contract.types";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

export function useGetApplications({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<ApplicationFacadePort["getApplications"], GetApplicationsModel>) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<ApplicationFacadePort["getApplications"], GetApplicationsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: applicationStoragePort.getApplications,
    })
  );
}
