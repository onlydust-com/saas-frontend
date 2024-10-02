import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  invalidateTagParams,
}: UseMutationFacadeParams<
  SponsorFacadePort["allocateBudgetToProgram"],
  {
    sponsor: {
      pathParams: {
        sponsorId: string;
      };
    };
    program: {
      pathParams: {
        programId: string;
      };
    };
  },
  never,
  AllocateBudgetToProgramBody
> = {}) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const programStoragePort = bootstrap.getProgramStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...sponsorStoragePort.allocateBudgetToProgram({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (invalidateTagParams) {
            // Invalidate sponsor detail
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsor({
                pathParams: { sponsorId: invalidateTagParams.sponsor.pathParams.sponsorId },
              }).tag,
              exact: false,
            });

            // Invalidate bi financial stats for sponsor
            await queryClient.invalidateQueries({
              queryKey: biStoragePort.getBiStatsFinancials({
                queryParams: { sponsorId: invalidateTagParams.sponsor.pathParams.sponsorId },
              }).tag,
              exact: false,
            });

            // Invalidate sponsor programs
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsorPrograms({
                pathParams: { sponsorId: invalidateTagParams.sponsor.pathParams.sponsorId },
              }).tag,
              exact: false,
            });

            // Invalidate program by id
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramById({
                pathParams: { programId: invalidateTagParams.program.pathParams.programId },
              }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
