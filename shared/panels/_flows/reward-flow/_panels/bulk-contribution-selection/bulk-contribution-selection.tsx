import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";

export function BulkContributionSelection() {
  const { name } = useBulkContributionSelection();
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

      <SidePanelBody>Select contributions in bulk flow</SidePanelBody>
    </Panel>
  );
}
