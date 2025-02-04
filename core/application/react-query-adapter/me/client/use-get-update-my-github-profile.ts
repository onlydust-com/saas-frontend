import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";

export function useGetUpdateGithubProfile({
  options,
}: UseQueryFacadeParams<MeFacadePort["getUpdateGithubProfile"], never>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getUpdateGithubProfile({}),
      options,
    })
  );
}
