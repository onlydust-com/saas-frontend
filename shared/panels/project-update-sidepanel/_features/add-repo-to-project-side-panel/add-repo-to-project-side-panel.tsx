import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { ProjectInterface } from "@/core/domain/project/models/project-model";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { AvailableRepositories } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/_components/available-repositories/available-repositories";
import { ManageOrganizations } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/_components/manage-organizations/manage-organizations";
import { useAddRepoToProjectSidePanel } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/add-repo-to-project-side-panel.hooks";
import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

export function AddRepoToProjectSidePanel({ project }: { project: ProjectInterface }) {
  const { name } = useAddRepoToProjectSidePanel();
  const { Panel } = useSidePanel({ name });

  const { data: userOrganizations, refetch } = GithubReactQueryAdapter.client.useGetMyOrganizations({});

  const { watch } = useFormContext<EditProjectFormData>();
  const githubRepos = watch("githubRepoIds");

  const mergedOrganizations = useMemo(() => {
    return userOrganizations?.addOrganizations(project.organizations ?? []);
  }, [userOrganizations, project]);

  const installedOrganizations = useMemo(() => {
    return mergedOrganizations?.getInstalledOrganizations() ?? [];
  }, [mergedOrganizations, githubRepos]);

  const notInstalledOrganizations = useMemo(() => {
    return mergedOrganizations?.getNotInstalledOrganizations() ?? [];
  }, [mergedOrganizations, githubRepos]);

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:projectUpdate.addRepoPanel.title",
          },
          children: "ADD REPO",
        }}
        canGoBack={true}
        canClose={true}
      />
      <SidePanelBody>
        <AvailableRepositories organizations={installedOrganizations} project={project} />
        <ManageOrganizations
          installed={installedOrganizations}
          notInstalled={notInstalledOrganizations}
          onRefresh={refetch}
        />
      </SidePanelBody>
    </Panel>
  );
}
