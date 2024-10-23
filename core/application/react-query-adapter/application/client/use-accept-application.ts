import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

import { asyncTimeout } from "@/shared/helpers/asyncTimeout";

export function useAcceptApplication({
  pathParams,
  invalidateTagParams,
  options,
}: UseMutationFacadeParams<
  ApplicationFacadePort["acceptApplication"],
  {
    contribution: {
      pathParams: {
        contributionId: string;
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
          // Need to wait for Github to send info back to the server
          await asyncTimeout(6000);

          if (invalidateTagParams?.contribution.pathParams.contributionId) {
            await queryClient.invalidateQueries({
              queryKey: contributionStoragePort.getContributionsById({
                pathParams: { contributionUuid: invalidateTagParams.contribution.pathParams.contributionId },
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
