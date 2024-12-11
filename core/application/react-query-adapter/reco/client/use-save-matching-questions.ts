import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RecoFacadePort } from "@/core/domain/reco/input/reco-facade-port";
import { SaveMatchingQuestionsBody } from "@/core/domain/reco/reco-contract.types";

export function useSaveMatchingQuestions({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<RecoFacadePort["saveMatchingQuestions"], undefined, never, SaveMatchingQuestionsBody> = {}) {
  const recoStoragePort = bootstrap.getRecoStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...recoStoragePort.saveMatchingQuestions({ pathParams, queryParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: recoStoragePort.getMatchingQuestions({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
