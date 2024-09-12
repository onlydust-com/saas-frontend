import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { PreviewDepositBody, PreviewDepositResponse } from "@/core/domain/deposit/deposit-contract.types";
import { DepositFacadePort } from "@/core/domain/deposit/input/deposit-facade-port";

export function usePreviewDeposit({
  pathParams,
  options,
}: UseMutationFacadeParams<
  DepositFacadePort["previewDeposit"],
  undefined,
  PreviewDepositResponse,
  PreviewDepositBody
> = {}) {
  const depositStoragePort = bootstrap.getDepositStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...depositStoragePort.previewDeposit({ pathParams }),
      options,
    })
  );
}
