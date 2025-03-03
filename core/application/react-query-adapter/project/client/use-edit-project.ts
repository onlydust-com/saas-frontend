import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { EditProjectBody } from "@/core/domain/project/project-contract.types";

export function useEditProject({
  pathParams,
  options,
  invalidateTagParams,
}: UseMutationFacadeParams<
  ProjectStoragePort["editProject"],
  {
    project: {
      pathParams: { projectSlug: string };
    };
  },
  never,
  EditProjectBody
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.editProject({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectById({ pathParams: { projectId: pathParams.projectId } }).tag,
              exact: false,
            });
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectAcquisitionTip({
                pathParams: { projectIdOrSlug: pathParams.projectId },
              }).tag,
              exact: false,
            });
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectBySlugOrIdV2({
                pathParams: { projectIdOrSlug: pathParams.projectId },
              }).tag,
              exact: false,
            });
          }
          if (invalidateTagParams?.project?.pathParams?.projectSlug) {
            await queryClient.invalidateQueries({
              queryKey: projectStoragePort.getProjectBySlugOrIdV2({
                pathParams: { projectIdOrSlug: invalidateTagParams.project.pathParams.projectSlug },
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
