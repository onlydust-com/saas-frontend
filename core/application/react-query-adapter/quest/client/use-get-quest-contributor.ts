import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { QuestFacadePort } from "@/core/domain/quest/input/quest-facade-port";
import { GetQuestContributorResponse } from "@/core/domain/quest/quest-contract.types";

export function useGetQuestContributor({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<QuestFacadePort["getQuestContributor"], GetQuestContributorResponse>) {
  const questStoragePort = bootstrap.getQuestStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...questStoragePort.getQuestContributor({ pathParams, queryParams }),
      options,
    })
  );
}
