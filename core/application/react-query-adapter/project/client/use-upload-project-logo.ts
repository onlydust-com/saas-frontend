import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";

export function useUploadProjectLogo({
  pathParams,
  options,
}: UseMutationFacadeParams<ProjectFacadePort["uploadProjectLogo"], undefined, never, File> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.uploadProjectLogo({ pathParams }),
      ...options,
    })
  );
}
