import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProgramFacadePort } from "@/core/domain/program/input/program-facade-port";
import { GrantBudgetToProjectBody } from "@/core/domain/program/program-contract.types";

export function useGrantBudgetToProject({
  options,
}: UseMutationFacadeParams<
  ProgramFacadePort["grantBudgetToProject"],
  undefined,
  never,
  GrantBudgetToProjectBody
> = {}) {
  const { programId } = useParams<{ programId?: string }>();
  const programStoragePort = bootstrap.getProgramStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...programStoragePort.grantBudgetToProject({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (programId) {
            // Invalidate program detail
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramById({ pathParams: { programId } }).tag,
              exact: false,
            });

            // Invalidate program project list
            await queryClient.invalidateQueries({
              queryKey: programStoragePort.getProgramProjects({ pathParams: { programId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
