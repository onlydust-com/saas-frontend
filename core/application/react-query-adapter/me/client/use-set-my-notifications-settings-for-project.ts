import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { SetMyNotificationSettingsForProjectBody } from "@/core/domain/me/me-contract.types";
import { MeNotificationForProjectInterface } from "@/core/domain/me/models/me-notification-for-project";

export function useSetMyNotificationsSettingsForProject({
  pathParams,
  options,
}: UseMutationFacadeParams<
  MeFacadePort["setMyNotificationSettingsForProject"],
  undefined,
  MeNotificationForProjectInterface,
  SetMyNotificationSettingsForProjectBody
> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.setMyNotificationSettingsForProject({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMyNotificationSettingsForProject({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
