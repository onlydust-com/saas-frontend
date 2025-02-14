import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeNotificationForProjectInterface } from "@/core/domain/me/models/me-notification-for-project";

export function useGetMyNotificationsSettingsForProject({
  pathParams,
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyNotificationSettingsForProject"], MeNotificationForProjectInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyNotificationSettingsForProject({ pathParams }),
      options,
    })
  );
}
