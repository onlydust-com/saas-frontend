import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

export function useAcceptApplication({
  pathParams,
  invalidateTagParams,
  options,
}: UseMutationFacadeParams<
  ApplicationFacadePort["acceptApplication"],
  {
    contribution: {
      pathParams: {
        contributionGithubId: number;
      };
    };
  }
> = {}) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...applicationStoragePort.acceptApplication({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (invalidateTagParams?.contribution.pathParams.contributionGithubId) {
            await queryClient.invalidateQueries({
              queryKey: contributionStoragePort.getContributionsById({
                pathParams: { contributionGithubId: invalidateTagParams.contribution.pathParams.contributionGithubId },
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
