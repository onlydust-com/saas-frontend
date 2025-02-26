import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { ProjectIssueComposerSubmitBody } from "@/core/domain/project/project-contract.types";

export function useProjectIssueComposerSubmit({
  pathParams,
  options,
}: UseMutationFacadeParams<
  ProjectStoragePort["projectIssueComposerSubmit"],
  undefined,
  never,
  ProjectIssueComposerSubmitBody
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();
  // ContributionReactQueryAdapter.client.useGetContributions({
  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.projectIssueComposerSubmit({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: contributionStoragePort.getContributions({}).tag,
              exact: false,
            });
          }
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
