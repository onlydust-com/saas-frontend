import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import {
  ProjectUpdateSidePanelData,
  editProjectFormValidation,
} from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";

export function ProjectUpdateSidepanel() {
  const { name } = useProjectUpdateSidePanel();
  const { Panel } = useSidePanel({ name });
  const { projectId, canGoBack = false } = useSinglePanelData<ProjectUpdateSidePanelData>(name) ?? { projectId: "" };

  const { control, handleSubmit, reset } = useForm<{ name: string }>({
    resolver: zodResolver(editProjectFormValidation),
  });

  async function onSubmit(data: { name: string }) {
    console.log("data", data, projectId);
  }

  return (
    <Panel>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex h-full w-full flex-col gap-px"}>
        <SidePanelHeader
          title={{
            translate: {
              token: "panels:projectUpdate.title",
            },
          }}
          canGoBack={canGoBack}
          canClose={true}
        />
        <SidePanelBody>UPDATE PANEL</SidePanelBody>
      </form>
    </Panel>
  );
}
