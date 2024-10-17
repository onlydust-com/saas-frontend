import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { AcceptApplicationProps } from "@/shared/components/mutation/accept-ignore-application/accept-ignore-application.types";

export function AcceptIgnoreApplication({
  applicationId,
  contributionGithubId,
  children,
  acceptOptions,
}: AcceptApplicationProps) {
  const { mutate: accept, isPending: isAccepting } = ApplicationReactQueryAdapter.client.useAcceptApplication({
    pathParams: {
      applicationId,
    },
    ...(contributionGithubId
      ? {
          invalidateTagParams: {
            contribution: {
              pathParams: {
                contributionGithubId,
              },
            },
          },
        }
      : {}),
    options: acceptOptions,
  });

  const { mutate: ignore, isPending: isIgnoring } = ApplicationReactQueryAdapter.client.usePatchApplication({
    pathParams: {
      applicationId,
    },
  });

  return children({ accept, isAccepting, ignore, isIgnoring });
}
