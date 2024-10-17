import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UpdatePullRequestBody } from "@/core/domain/github/github-contract.types";
import { GithubFacadePort } from "@/core/domain/github/input/github-facade-port";

export function useUpdatePullRequest({
  pathParams,
  options,
}: UseMutationFacadeParams<GithubFacadePort["updatePullRequest"], undefined, never, UpdatePullRequestBody> = {}) {
  const githubStoragePort = bootstrap.getGithubStoragePortForClient();
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...githubStoragePort.updatePullRequest({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: contributionStoragePort.getContributionsById({}).tag,
            exact: false,
          });

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
