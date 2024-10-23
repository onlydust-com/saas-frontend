import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { IssueFacadePort } from "@/core/domain/issue/input/issue-facade-port";
import { UpdateIssueBody } from "@/core/domain/issue/issue-contract.types";

export function useUpdateIssue({
  pathParams,
  options,
}: UseMutationFacadeParams<IssueFacadePort["updateIssue"], undefined, never, UpdateIssueBody> = {}) {
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...issueStoragePort.updateIssue({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables: UpdateIssueBody, context) => {
          if (variables?.closed === undefined) {
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
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
