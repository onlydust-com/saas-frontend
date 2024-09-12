import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
  const { sponsorId } = useParams<{ sponsorId?: string }>();
  const depositStoragePort = bootstrap.getDepositStoragePortForClient();
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...depositStoragePort.previewDeposit({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (sponsorId) {
            // Invalidate sponsor detail
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsor({ pathParams: { sponsorId } }).tag,
              exact: false,
            });

            // Invalidate sponsor transaction stats
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsorTransactionsStats({ pathParams: { sponsorId } }).tag,
              exact: false,
            });
          }
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
