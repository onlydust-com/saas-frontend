import { useGrantFormContext } from "@/app/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.context";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";

export function GrantFormSidepanel() {
  const { sidePanel, projectIdState } = useGrantFormContext();
  const { Panel } = sidePanel;
  const [projectId] = projectIdState;

  return (
    <Panel>
      <SidePanelHeader canClose={true} canGoBack title={{ token: "programs:grantList.title" }} />

      <ScrollView>{projectId}</ScrollView>
    </Panel>
  );
}
