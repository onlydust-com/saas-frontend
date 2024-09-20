import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useProgramSidePanel } from "@/shared/panels/program-sidepanel/program-sidepanel.hooks";

import { ProgramSidePanelData } from "./program-sidepanel.types";

export function ProgramSidepanel() {
  const { name } = useProgramSidePanel();
  const { Panel } = useSidePanel({ name });
  const { programId, canGoBack = false } = useSinglePanelData<ProgramSidePanelData>(name) ?? { programId: "" };

  return (
    <Panel>
      <SidePanelHeader
        title={{
          // children: data?.name,
          children: "Program",
        }}
        canGoBack={canGoBack}
        canClose={true}
      />

      <SidePanelBody>
        <p>ID : {programId}</p>
      </SidePanelBody>
    </Panel>
  );
}
