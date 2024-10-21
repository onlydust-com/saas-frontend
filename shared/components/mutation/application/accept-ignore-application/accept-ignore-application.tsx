import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";

import { AcceptApplicationProps } from "./accept-ignore-application.types";

export function AcceptIgnoreApplication({
  applicationId,
  contributionGithubId,
  repoId,
  children,
  acceptOptions,
}: AcceptApplicationProps) {
  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

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

  function handleAccept() {
    if (isProjectOrganisationMissingPermissions(repoId)) {
      console.log("isProjectOrganisationMissingPermissions");
      setIsGithubPermissionModalOpen(true);
      return;
    }
    accept({});
  }

  return children({
    accept: () => handleAccept(),
    isAccepting,
    ignore: () => ignore({ isIgnored: true }),
    isIgnoring,
  });
}
