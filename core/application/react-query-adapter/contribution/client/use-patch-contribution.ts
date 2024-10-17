import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { PatchContributionBody } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionFacadePort } from "@/core/domain/contribution/input/contribution-facade-port";

export function usePatchContribution({
  pathParams,
  options,
}: UseMutationFacadeParams<ContributionFacadePort["patchContribution"], undefined, never, PatchContributionBody> = {}) {
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...contributionStoragePort.patchContribution({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.contributionId) {
            await queryClient.invalidateQueries({
              queryKey: contributionStoragePort.getContributionsById({
                pathParams: { contributionGithubId: pathParams?.contributionId },
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
