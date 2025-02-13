import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { StartChatResponse } from "@/core/domain/me/me-contract.types";

export function useStartRecoChat({
  options,
}: UseMutationFacadeParams<MeFacadePort["startChat"], undefined, StartChatResponse> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.startChat({}),
      options,
    })
  );
}
