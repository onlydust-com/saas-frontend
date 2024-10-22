import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { IssueFacadePort } from "@/core/domain/issue/input/issue-facade-port";
import { GetIssueModel } from "@/core/domain/issue/issue-contract.types";

export function useGetIssue({ options, pathParams }: UseQueryFacadeParams<IssueFacadePort["getIssue"], GetIssueModel>) {
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...issueStoragePort.getIssue({ pathParams }),
      options,
    })
  );
}
