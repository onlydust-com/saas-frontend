import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { EditProgramBody } from "@/core/domain/program/program-contract.types";

export function useEditProgram({
  pathParams,
  queryParams,
  options,
}: UseMutationFacadeParams<ProgramFacadePort["editProgram"], undefined, never, EditProgramBody> = {}) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();
  const sponsorStoragePort = bootstrap.getSponsorStoragePortForServer();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.editProgram({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.programId) {
            // invalidate single sponsor request
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramById({ pathParams: { programId: pathParams.programId } }).tag,
              exact: false,
            });
          }

          if (queryParams?.sponsorId) {
            // Invalidate sponsor programs
            await queryClient.invalidateQueries({
              queryKey: sponsorStoragePort.getSponsorPrograms({ pathParams: { sponsorId: queryParams.sponsorId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
