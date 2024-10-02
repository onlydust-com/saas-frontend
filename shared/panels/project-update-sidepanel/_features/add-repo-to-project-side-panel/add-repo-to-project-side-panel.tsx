import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { ProjectInterface } from "@/core/domain/project/models/project-model";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { AvailableRepositories } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/_components/available-repositories/available-repositories";
import { useAddRepoToProjectSidePanel } from "@/shared/panels/project-update-sidepanel/_features/add-repo-to-project-side-panel/add-repo-to-project-side-panel.hooks";
import { EditProjectFormData } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

import { AddRepoToProjectSidePanelData } from "./add-repo-to-project-side-panel.types";

export function AddRepoToProjectSidePanel({ project }: { project: ProjectInterface }) {
  const { name } = useAddRepoToProjectSidePanel();
  const { Panel, close: closePanel } = useSidePanel({ name });
  const { projectId } = useSinglePanelData<AddRepoToProjectSidePanelData>(name) ?? { projectId: "" };

  const { data: userOrganizations } = GithubReactQueryAdapter.client.useGetMyOrganizations({});

  const { watch } = useFormContext<EditProjectFormData>();
  const githubRepos = watch("githubRepoIds");

  const installedOrganizations = useMemo(() => {
    return userOrganizations?.getInstalledOrganizations() ?? [];
  }, [userOrganizations, githubRepos]);

  const notInstalledOrganizations = useMemo(() => {
    return userOrganizations?.getNotInstalledOrganizations() ?? [];
  }, [userOrganizations, githubRepos]);

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
      </SidePanelBody>
    </Panel>
  );
}
