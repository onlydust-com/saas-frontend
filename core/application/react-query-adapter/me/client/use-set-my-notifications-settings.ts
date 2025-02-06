import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { SetMyNotificationSettingsBody } from "@/core/domain/me/me-contract.types";

export function useSetMyNotificationsSettings({
  pathParams,
  options,
}: UseMutationFacadeParams<
  MeFacadePort["setMyNotificationSettings"],
  undefined,
  never,
  SetMyNotificationSettingsBody
> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.setMyNotificationSettings({ pathParams }),
      options: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: meStoragePort.getMyNotificationSettings({}).tag,
            exact: false,
          });
        },
        ...options,
      },
    })
  );
}
