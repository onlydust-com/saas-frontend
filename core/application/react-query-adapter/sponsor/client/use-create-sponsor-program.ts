import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { AllocateBudgetToProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

export function useAllocateBudgetToProgram({
  pathParams,
  options,
}: UseMutationFacadeParams<
  SponsorFacadePort["allocateBudgetToProgram"],
  undefined,
  never,
  AllocateBudgetToProgramBody
> = {}) {
  const { sponsorId } = useParams<{ sponsorId?: string }>();
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...sponsorStoragePort.allocateBudgetToProgram({ pathParams }),
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

            // Invalidate sponsor programs
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsorPrograms({ pathParams: { sponsorId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
