import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";

export function useUnassignContributorFromProjectContribution({
  pathParams,
  options,
}: UseMutationFacadeParams<ProjectStoragePort["unassignContributorFromProjectContribution"]> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.unassignContributorFromProjectContribution({ pathParams }),
      options: {
        ...options,
      },
    })
  );
}
