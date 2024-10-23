import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { GithubPermissionModal } from "@/shared/features/github-permissions/_components/github-permission-modal/github-permission-modal";
import { useGithubPermissionModal } from "@/shared/features/github-permissions/_components/github-permission-modal/github-permission-modal.hooks";
import { usePooling } from "@/shared/hooks/pooling/usePooling";

interface GithubPermissionsContextInterface {
  isProjectOrganisationMissingPermissions: (repoId: number) => boolean;
  handleRedirectToGithubFlow: () => void;
  isGithubPermissionModalOpen: boolean;
  setIsGithubPermissionModalOpen: (isOpen: boolean) => void;
  setEnablePooling: (enable: boolean) => void;
  canCurrentUserUpdatePermissions: (repoId: number) => boolean;
}

const GithubPermissionsContext = createContext<GithubPermissionsContextInterface>({
  isProjectOrganisationMissingPermissions: () => false,
  handleRedirectToGithubFlow: () => {},
  isGithubPermissionModalOpen: false,
  setIsGithubPermissionModalOpen: () => {},
  setEnablePooling: () => {},
  canCurrentUserUpdatePermissions: () => false,
});

export function GithubPermissionsProvider({ children, projectSlug }: PropsWithChildren & { projectSlug: string }) {
  const [enablePooling, setEnablePooling] = useState(false);
  const [repoId, setRepoId] = useState<number | undefined>();
  const { isOpen: isGithubPermissionModalOpen, setIsOpen: setIsGithubPermissionModalOpen } = useGithubPermissionModal();

  const { data: userOrganizations } = MeReactQueryAdapter.client.useGetMyOrganizations({});

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

    if (relatedOrganization && userOrganizations?.length) {
      return (
        userOrganizations
          .find(organization => organization.name === relatedOrganization.name)
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
      }}
    >
      {children}
      <GithubPermissionModal
        onRedirect={handleRedirectToGithubFlow}
        isOpen={isGithubPermissionModalOpen}
        onOpenChange={setIsGithubPermissionModalOpen}
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
