import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function CreateProgramPanel() {
  return (
    <>
      <SidePanelHeader
        title={{
          children: "Create program",
        }}
        canGoBack={false}
        canClose={true}
      />
      <SidePanelBody>BODY</SidePanelBody>
    </>
  );
}
