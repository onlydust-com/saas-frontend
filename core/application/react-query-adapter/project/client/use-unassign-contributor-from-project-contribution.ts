import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.unassignContributorFromProjectContribution({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.contributionUuid) {
            await queryClient.invalidateQueries({
              queryKey: contributionStoragePort.getContributionsById({
                pathParams: { contributionUuid: pathParams?.contributionUuid },
              }).tag,
              exact: false,
            });
          }

          await queryClient.invalidateQueries({
            queryKey: contributionStoragePort.getContributions({}).tag,
            exact: false,
          });

          await queryClient.invalidateQueries({
            queryKey: issueStoragePort.getIssueApplicants({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
