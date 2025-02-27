import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import {
  ProjectIssueComposerUpdateBody,
  ProjectIssueComposerUpdateResponse,
} from "@/core/domain/project/project-contract.types";

export function useProjectIssueComposerUpdate({
  pathParams,
  options,
}: UseMutationFacadeParams<
  ProjectStoragePort["projectIssueComposerUpdate"],
  undefined,
  ProjectIssueComposerUpdateResponse,
  ProjectIssueComposerUpdateBody
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.projectIssueComposerUpdate({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
