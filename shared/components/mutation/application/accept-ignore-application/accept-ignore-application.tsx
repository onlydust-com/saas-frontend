import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";

import { AcceptApplicationProps } from "./accept-ignore-application.types";

export function AcceptIgnoreApplication({
  applicationId,
  contributionId,
  repoId,
  children,
  acceptOptions,
}: AcceptApplicationProps) {
  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();

  const { mutate: accept, isPending: isAccepting } = ApplicationReactQueryAdapter.client.useAcceptApplication({
    pathParams: {
      applicationId,
    },
    ...(contributionId
      ? {
          invalidateTagParams: {
            contribution: {
              pathParams: {
                contributionId,
              },
            },
          },
        }
      : {}),
    options: acceptOptions,
  });

  const { mutate: patch, isPending: isPatching } = ApplicationReactQueryAdapter.client.usePatchApplication({
    pathParams: {
      applicationId,
    },
  });

  function handleAccept() {
    if (isProjectOrganisationMissingPermissions(repoId)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }
    accept({});
  }

  return children({
    accept: () => handleAccept(),
    ignore: () => patch({ isIgnored: true }),
    unignore: () => patch({ isIgnored: false }),
    isUpdating: isAccepting || isPatching,
  });
}
