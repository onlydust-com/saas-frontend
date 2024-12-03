import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { UnallocateFundsFromProgramBody } from "@/core/domain/program/program-contract.types";

export function useUnallocateProgram({
  pathParams,
  options,
  invalidateTagParams,
}: UseMutationFacadeParams<
  ProgramFacadePort["unallocateProgram"],
  {
    sponsor: {
      pathParams: {
        sponsorId: string;
      };
    };
  },
  never,
  UnallocateFundsFromProgramBody
> = {}) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.unallocateProgram({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (invalidateTagParams) {
            // Invalidate the Financial / Financial / Budget Cards
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsor({
                pathParams: { sponsorId: invalidateTagParams.sponsor.pathParams.sponsorId },
              }).tag,
              exact: false,
            });
          }

          // Invalidate the Financial / Financial / Budget In Time
          await queryClient.invalidateQueries({
            queryKey: biStoragePort.getBiStatsFinancials({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
