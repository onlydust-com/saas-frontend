import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";

export function SingleContributionSelection() {
  const { name } = useSingleContributionSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Select contribution",
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>Select contributions in single flow</SidePanelBody>
    </Panel>
  );
}
