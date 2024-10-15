import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SelectableContributorsAccordion } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/selectable-contributors-accordion";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";

export function BulkContributorSelection() {
  const { name } = useBulkContributorSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <SidePanelHeader
        title={{
          children: "Rewards",
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <SelectableContributorsAccordion />
      </SidePanelBody>
    </Panel>
  );
}
