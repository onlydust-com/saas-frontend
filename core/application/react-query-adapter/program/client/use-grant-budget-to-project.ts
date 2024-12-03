import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GrantBudgetToProjectBody } from "@/core/domain/program/program-contract.types";

export function useGrantBudgetToProject({
  pathParams,
  options,
}: UseMutationFacadeParams<
  ProgramFacadePort["grantBudgetToProject"],
  undefined,
  never,
  GrantBudgetToProjectBody
> = {}) {
  const programStoragePort = bootstrap.getProgramStoragePortForClient();
  const biStoragePort = bootstrap.getBiStoragePortForClient();

  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.grantBudgetToProject({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          const { programId } = pathParams ?? {};

          if (programId) {
            // Invalidate program detail + financial budget
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramById({ pathParams: { programId } }).tag,
              exact: false,
            });

            // Invalidate program project list
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramProjects({ pathParams: { programId } }).tag,
              exact: false,
            });

            // Invalidate budget in time chart + transactions
            await queryClient.invalidateQueries({
              queryKey: biStoragePort.getBiStatsFinancials({ queryParams: { programId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
