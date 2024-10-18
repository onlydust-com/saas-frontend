import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { useGithubPermissions } from "@/shared/hooks/github-permissions/use-github-permissions";
import { GithubPermissionModal } from "@/shared/modals/github-permission-modal/github-permission-modal";

import { AcceptApplicationProps } from "./accept-ignore-application.types";

export function AcceptIgnoreApplication({
  applicationId,
  contributionGithubId,
  repoId,
  children,
  acceptOptions,
}: AcceptApplicationProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const {
    isProjectOrganisationMissingPermissions,
    isGithubPermissionModalOpen,
    setIsGithubPermissionModalOpen,
    handleRedirectToGithubFlow,
  } = useGithubPermissions({
    projectSlug,
    repoId,
  });

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
    if (isProjectOrganisationMissingPermissions) {
      setIsGithubPermissionModalOpen(true);
      return;
    }
    accept({});
  }

  const permissionModal = useMemo(() => {
    if (isGithubPermissionModalOpen) {
      return (
        <GithubPermissionModal
          isOpen={isGithubPermissionModalOpen}
          onOpenChange={setIsGithubPermissionModalOpen}
          onRedirect={handleRedirectToGithubFlow}
        />
      );
    }
    return null;
  }, [isGithubPermissionModalOpen]);

  return (
    <>
      {children({
        accept: () => handleAccept(),
        isAccepting,
        ignore: () => ignore({ isIgnored: true }),
        isIgnoring,
      })}
      {permissionModal}
    </>
  );
}
