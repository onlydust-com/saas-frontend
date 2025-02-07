import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeNotificationSettingsInterface } from "@/core/domain/me/models/me-notification-settings-model";

export function useGetMyNotificationsSettings({
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyNotificationSettings"], MeNotificationSettingsInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyNotificationSettings({}),
      options,
    })
  );
}
