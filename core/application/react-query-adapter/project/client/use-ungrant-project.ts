import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { UngrantFundsFromProjectBody } from "@/core/domain/project/project-contract.types";

export function useUngrantProject({
  pathParams,
  options,
  invalidateTagParams,
}: UseMutationFacadeParams<
  ProjectStoragePort["ungrantProject"],
  {
    project: {
      pathParams: {
        projectSlug: string;
      };
    };
  },
  never,
  UngrantFundsFromProjectBody
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.ungrantProject({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectById({ pathParams: { projectId: pathParams.projectId } }).tag,
              exact: false,
            });

            await queryClient.invalidateQueries({
              queryKey: rewardStoragePort.getProjectRewards({
                pathParams: { projectId: pathParams.projectId },
              }).tag,
              exact: false,
            });
          }

          if (invalidateTagParams) {
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectFinancialDetailsBySlug({
                pathParams: { projectSlug: invalidateTagParams.project.pathParams.projectSlug },
              }).tag,
              exact: false,
            });

            await queryClient.invalidateQueries({
              queryKey: biStoragePort.getBiStatsFinancials({
                pathParams: { projectSlug: invalidateTagParams.project.pathParams.projectSlug },
              }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
