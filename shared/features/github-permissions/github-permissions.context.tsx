import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

import { usePublicRepoScope } from "@/core/application/auth0-client-adapter/hooks/use-public-repo-scope";
import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { GithubPermissionModal } from "@/shared/features/github-permissions/_components/github-permission-modal/github-permission-modal";
import { useGithubPermissionModal } from "@/shared/features/github-permissions/_components/github-permission-modal/github-permission-modal.hooks";
import { GithubPublicScopePermissionModal } from "@/shared/features/github-permissions/_components/github-public-scope-permission-modal/github-public-scope-permission-modal";
import { useGithubPublicScopePermissionModal } from "@/shared/features/github-permissions/_components/github-public-scope-permission-modal/github-public-scope-permission-modal.hooks";
import { usePooling } from "@/shared/hooks/pooling/usePooling";

interface GithubPermissionsContextInterface {
  isProjectOrganisationMissingPermissions: (repoId: number) => boolean;
  handleRedirectToGithubFlow: () => void;
  isGithubPermissionModalOpen: boolean;
  setIsGithubPermissionModalOpen: (isOpen: boolean) => void;
  setEnablePooling: (enable: boolean) => void;
  canCurrentUserUpdatePermissions: (repoId: number) => boolean;
  isGithubPublicScopePermissionModalOpen: boolean;
  setIsGithubPublicScopePermissionModalOpen: (isOpen: boolean) => void;
}

const GithubPermissionsContext = createContext<GithubPermissionsContextInterface>({
  isProjectOrganisationMissingPermissions: () => false,
  handleRedirectToGithubFlow: () => {},
  isGithubPermissionModalOpen: false,
  setIsGithubPermissionModalOpen: () => {},
  setEnablePooling: () => {},
  canCurrentUserUpdatePermissions: () => false,
  isGithubPublicScopePermissionModalOpen: false,
  setIsGithubPublicScopePermissionModalOpen: () => {},
});

export function GithubPermissionsProvider({ children, projectSlug }: PropsWithChildren & { projectSlug?: string }) {
  const [enablePooling, setEnablePooling] = useState(false);
  const [repoId, setRepoId] = useState<number | undefined>();
  const { isOpen: isGithubPermissionModalOpen, setIsOpen: setIsGithubPermissionModalOpen } = useGithubPermissionModal();
  const { isOpen: isGithubPublicScopePermissionModalOpen, setIsOpen: setIsGithubPublicScopePermissionModalOpen } =
    useGithubPublicScopePermissionModal();
  const { handleVerifyPermissions } = usePublicRepoScope();

  const { data: userOrganizations } = GithubReactQueryAdapter.client.useGetMyOrganizations({});

  const { refetchOnWindowFocus, refetchInterval, onRefetching } = usePooling({
    limit: 20,
    delays: 3000,
    enabled: enablePooling,
  });

  const { data: projectData, isRefetching } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
      refetchOnWindowFocus,
      refetchInterval,
    },
  });

  function isProjectOrganisationMissingPermissions(repoId: number) {
    if (!repoId) return false;

    setRepoId(repoId);
    return projectData?.isRepoOrganizationMissingPermissions(repoId) ?? false;
  }

  function canCurrentUserUpdatePermissions(repoId: number) {
    const relatedOrganization = projectData?.getOrganizationByRepoId(repoId);
    const { organizations } = userOrganizations ?? {};

    if (relatedOrganization && organizations?.length) {
      return (
        organizations
          .find(organization => organization.githubUserId === relatedOrganization.githubUserId)
          ?.isUserAdminOfOrganization() ?? false
      );
    }

    return false;
  }

  const updatePermissionsUrl = useMemo(() => {
    if (!repoId) return false;

    return projectData?.getGithubUpdatePermissionsUrlByRepo(repoId);
  }, [projectData, repoId, projectSlug]);

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  useEffect(() => {
    if (!isProjectOrganisationMissingPermissions) {
      setEnablePooling(false);
    }
  }, [projectData]);

  function handleRedirectToGithubFlow() {
    if (updatePermissionsUrl) {
      setEnablePooling(true);
      window.open(updatePermissionsUrl, "_blank");
    }
  }

  return (
    <GithubPermissionsContext.Provider
      value={{
        isProjectOrganisationMissingPermissions,
        handleRedirectToGithubFlow,
        isGithubPermissionModalOpen,
        setIsGithubPermissionModalOpen,
        setEnablePooling,
        canCurrentUserUpdatePermissions,

        isGithubPublicScopePermissionModalOpen,
        setIsGithubPublicScopePermissionModalOpen,
      }}
    >
      {children}

      <GithubPermissionModal
        onRedirect={handleRedirectToGithubFlow}
        isOpen={isGithubPermissionModalOpen}
        onOpenChange={setIsGithubPermissionModalOpen}
      />

      <GithubPublicScopePermissionModal
        onRedirect={() =>
          handleVerifyPermissions(() => {
            // Close the modal when the user has granted the permissions
            setIsGithubPublicScopePermissionModalOpen(false);
          })
        }
        isOpen={isGithubPublicScopePermissionModalOpen}
        onOpenChange={setIsGithubPublicScopePermissionModalOpen}
      />
    </GithubPermissionsContext.Provider>
  );
}

export function useGithubPermissionsContext() {
  const context = useContext(GithubPermissionsContext);
  if (!context) {
    throw new Error("useGithubPermissionsContext must be used within a GithubPermissionsProvider");
  }
  return context;
}
