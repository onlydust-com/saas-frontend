import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { useActionPooling } from "@/shared/hooks/action-pooling/action-pooling.context";

import { AcceptApplicationProps } from "./accept-ignore-application.types";

export function AcceptIgnoreApplication({
  applicationId,
  contributionId,
  repoId,
  children,
  acceptOptions,
}: AcceptApplicationProps) {
  const { isProjectOrganisationMissingPermissions, setIsGithubPermissionModalOpen } = useGithubPermissionsContext();
  const { startPooling, shouldRefetch } = useActionPooling();

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
    options: {
      ...acceptOptions,
      onSuccess: (...args) => {
        acceptOptions?.onSuccess?.(...args);
        startPooling();
      },
    },
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
    isDisabled: !!shouldRefetch,
  });
}
