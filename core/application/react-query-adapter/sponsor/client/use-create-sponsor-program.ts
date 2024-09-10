import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { SponsorFacadePort } from "@/core/domain/sponsor/input/sponsor-facade-port";
import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

export function useCreateSponsorProgram({
  pathParams,
  options,
}: UseMutationFacadeParams<
  SponsorFacadePort["createSponsorProgram"],
  undefined,
  never,
  CreateSponsorProgramBody
> = {}) {
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...sponsorStoragePort.createSponsorProgram({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.sponsorId) {
            // Invalidate sponsor programs
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsorPrograms({ pathParams: { sponsorId: pathParams.sponsorId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
