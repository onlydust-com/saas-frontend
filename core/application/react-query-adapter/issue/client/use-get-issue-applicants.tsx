import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { IssueFacadePort } from "@/core/domain/issue/input/issue-facade-port";
import { GetIssueApplicantsModel } from "@/core/domain/issue/issue-contract.types";

export function useGetIssueApplicants({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<IssueFacadePort["getIssueApplicants"], GetIssueApplicantsModel>) {
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<IssueFacadePort["getIssueApplicants"], GetIssueApplicantsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: issueStoragePort.getIssueApplicants,
    })
  );
}
