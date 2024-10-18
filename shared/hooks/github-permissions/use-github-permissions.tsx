import { useEffect, useMemo, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { UseGithubPermissionsProps } from "@/shared/hooks/github-permissions/use-github-permissions.types";
import { usePooling } from "@/shared/hooks/pooling/usePooling";
import { useGithubPermissionModal } from "@/shared/modals/github-permission-modal/github-permission-modal.hooks";

export function useGithubPermissions({ projectSlug, repoId }: UseGithubPermissionsProps) {
  const [enablePooling, setEnablePooling] = useState(false);
  const { isOpen: isGithubPermissionModalOpen, setIsOpen: setIsGithubPermissionModalOpen } = useGithubPermissionModal();

  const { refetchOnWindowFocus, refetchInterval, onRefetching } = usePooling({
    limites: 20,
    delays: 3000,
    enabled: enablePooling,
  });

  const {
    data: projectData,
    isRefetching,
    isLoading,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
      refetchOnWindowFocus,
      refetchInterval,
    },
  });

  const isProjectOrganisationMissingPermissions = useMemo(() => {
    return projectData?.isRepoOrganizationMissingPermissions(repoId);
  }, [projectData, repoId]);

  // TODO retrieve from projectData
  const githubAppInstallationPermissionsUpdateUrl = "https://github.com/onlydustxyz/saas-frontend/pulls";

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  useEffect(() => {
    if (!isProjectOrganisationMissingPermissions) {
      setEnablePooling(false);
    }
  }, [projectData]);

  function handleRedirectToGithubFlow() {
    if (githubAppInstallationPermissionsUpdateUrl) {
      setEnablePooling(true);
      window.open(githubAppInstallationPermissionsUpdateUrl, "_blank");
    }
  }

  return {
    isProjectOrganisationMissingPermissions,
    handleRedirectToGithubFlow,
    isGithubPermissionModalOpen,
    setIsGithubPermissionModalOpen,
  };
}
