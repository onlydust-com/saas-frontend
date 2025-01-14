import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { EcosystemFacadePort } from "@/core/domain/ecosystem/input/ecosystem-facade-port";
import { EcosystemInterface } from "@/core/domain/ecosystem/models/ecosystem-model";

export function useGetEcosystemBySlug({
  options,
  pathParams,
}: UseQueryFacadeParams<EcosystemFacadePort["getEcosystemBySlug"], EcosystemInterface>) {
  const ecosystemStoragePort = bootstrap.getEcosystemStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...ecosystemStoragePort.getEcosystemBySlug({ pathParams }),
      options,
    })
  );
}
