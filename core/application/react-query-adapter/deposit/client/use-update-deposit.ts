import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UpdateDepositBody } from "@/core/domain/deposit/deposit-contract.types";
import { DepositFacadePort } from "@/core/domain/deposit/input/deposit-facade-port";

export function useUpdateDeposit({
  pathParams,
  options,
}: UseMutationFacadeParams<DepositFacadePort["updateDeposit"], undefined, never, UpdateDepositBody> = {}) {
  const { sponsorId } = useParams<{ sponsorId?: string }>();
  const depositStoragePort = bootstrap.getDepositStoragePortForClient();
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...depositStoragePort.updateDeposit({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (sponsorId) {
            // Invalidate sponsor detail
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsor({ pathParams: { sponsorId } }).tag,
              exact: false,
            });

            // Invalidate bi financial stats for sponsor
            await queryClient.invalidateQueries({
              queryKey: biStoragePort.getBiStatsFinancials({ queryParams: { sponsorId } }).tag,
              exact: false,
            });
          }
          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
