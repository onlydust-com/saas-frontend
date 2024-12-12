import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { RecoFacadePort } from "@/core/domain/reco/input/reco-facade-port";
import { GetMatchingQuestionsModel } from "@/core/domain/reco/reco-contract.types";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetMatchingQuestions({
  options,
  queryParams,
}: UseQueryFacadeParams<RecoFacadePort["getMatchingQuestions"], GetMatchingQuestionsModel>) {
  const recoStoragePort = bootstrap.getRecoStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...recoStoragePort.getMatchingQuestions({ queryParams }),
      options,
    })
  );
}
