import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { ProgramListSidepanelProps } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel.types";

export function ProgramListSidepanel(props: ProgramListSidepanelProps) {
  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:programList.title" },
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>List</SidePanelBody>
    </>
  );
}
