import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { ContinueChatBody, ContinueChatResponse } from "@/core/domain/me/me-contract.types";

export function useContinueRecoChat({
  pathParams,
  options,
}: UseMutationFacadeParams<MeFacadePort["continueChat"], undefined, ContinueChatResponse, ContinueChatBody> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.continueChat({ pathParams }),
      options,
    })
  );
}
