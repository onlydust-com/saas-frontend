import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function ProjectSidepanel() {
  return (
    <>
      <SidePanelHeader canGoBack={false} canClose={true} title={{ children: "Project", token: "" }} />
      <div></div>
    </>
  );
}
