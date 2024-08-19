import { ProjectSidepanelProps } from "@/app/programs/[programId]/_features/project-sidepanel/project-sidepanel.types";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function ProjectSidepanel({ projectId }: ProjectSidepanelProps) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectById({
    pathParams: { projectId: projectId ?? "" },
    options: {
      enabled: !!projectId,
    },
  });
  return (
    <>
      <SidePanelHeader canGoBack={false} canClose={true} title={{ children: "Project", token: "" }} />
      <div>project {data?.name}</div>
    </>
  );
}
