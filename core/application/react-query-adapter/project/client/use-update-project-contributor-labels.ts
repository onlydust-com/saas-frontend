import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { UpdateProjectContributorLabelsBody } from "@/core/domain/project/project-contract.types";

export function useUpdateProjectContributorLabels({
  pathParams,
  options,
}: UseMutationFacadeParams<
  ProjectStoragePort["updateProjectContributorLabels"],
  undefined,
  never,
  UpdateProjectContributorLabelsBody
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.updateProjectContributorLabels({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: biStoragePort.getBiContributors({}).tag,
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
