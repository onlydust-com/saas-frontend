import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";

export function useRegisterToHackathon({
  pathParams,
  options,
  invalidateTagParams,
}: UseMutationFacadeParams<
  MeFacadePort["registerToHackathon"],
  {
    getHackathonBySlug: {
      pathParams: {
        hackathonSlug: string;
      };
    };
  },
  never,
  object
> = {}) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...meStoragePort.registerToHackathon({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.hackathonId) {
            await queryClient.invalidateQueries({
              queryKey: meStoragePort.getMyHackathonRegistration({
                pathParams: { hackathonId: pathParams.hackathonId },
              }).tag,
              exact: false,
            });
          }

          if (invalidateTagParams) {
            await queryClient.invalidateQueries({
              queryKey: hackathonStoragePort.getHackathonBySlug({
                pathParams: { hackathonSlug: invalidateTagParams.getHackathonBySlug.pathParams.hackathonSlug },
              }).tag,
              exact: false,
            });
          }

          await queryClient.invalidateQueries({
            queryKey: hackathonStoragePort.getHackathons({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
