import { useContext } from "react";

import { ProgramDetailsPanelContext } from "@/app/programs/[programId]/_context/program-details-panels/program-details-panels.context";

import { SIDE_PANEL_GAP, SIDE_PANEL_SIZE } from "@/shared/constants/side-panel-size";
import { SidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group";
import { useSidePanelGroup } from "@/shared/features/side-panel-group/side-panel-group.context";
import { SidePanelHeader } from "@/shared/features/side-panel-group/side-panel-header/side-panel-header";
import { SidePanel } from "@/shared/features/side-panel-group/side-panel/side-panel";

import { ProjectSidepanels } from "./project-sidepanel.types";

function ProjectSidePanelContent() {
  const { watch } = useSidePanelGroup();

  const { data } = watch<{ projectId: string }>(ProjectSidepanels.PROJECT);

  // query;
  return <div>Project {data?.projectId} </div>;
}

export function ProjectSidepanel() {
  const { projectPanel } = useContext(ProgramDetailsPanelContext);

  return (
    <SidePanelGroup
      ref={projectPanel}
      panels={[ProjectSidepanels.PROJECT]}
      defaultPanelName={ProjectSidepanels.PROJECT}
      config={{ closedWidth: 0, openedWidth: SIDE_PANEL_SIZE.m, gap: SIDE_PANEL_GAP.m }}
    >
      <SidePanel name={ProjectSidepanels.PROJECT}>
        {/*{({ getPannelData }) => (*/}
        {/*  <>*/}
        <SidePanelHeader
          canGoBack={false}
          canClose={true}
          title={{ token: "programs:transactionPanel.export.title" }}
          onClose={() => projectPanel.current?.closePanel()}
        />
        <ProjectSidePanelContent />
        {/*  </>*/}
        {/*)}*/}
      </SidePanel>
    </SidePanelGroup>
  );
}
