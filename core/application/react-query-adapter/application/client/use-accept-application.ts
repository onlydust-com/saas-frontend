import { useMutation } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ApplicationFacadePort } from "@/core/domain/application/input/application-facade-port";

export function useAcceptApplication({
  pathParams,
  options,
}: UseMutationFacadeParams<
  ApplicationFacadePort["acceptApplication"],
  {
    contribution: {
      pathParams: {
        contributionId: string;
      };
    };
  }
> = {}) {
  const applicationStoragePort = bootstrap.getApplicationStoragePortForClient();

  return useMutation(
    useMutationAdapter({
      ...applicationStoragePort.acceptApplication({ pathParams }),
      options: {
        ...options,
      },
    })
  );
}
