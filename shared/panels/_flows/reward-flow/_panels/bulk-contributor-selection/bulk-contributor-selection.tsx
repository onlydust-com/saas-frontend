import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SelectableContributorsAccordion } from "@/shared/panels/_flows/reward-flow/_panels/_components/selectable-contributors-accordion/selectable-contributors-accordion";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { useSingleContributionSelection } from "../single-contribution-selection/single-contribution-selection.hooks";

function Content() {
  const { open: openBulkContributionSelection } = useBulkContributionSelection();
  const { open: openSingleFlow } = useSingleContributionSelection();

  const { selectedGithubUserIds } = useRewardFlow();

  function handleOpenFlow() {
    if (selectedGithubUserIds.length === 1) {
      openSingleFlow();
    } else {
      openBulkContributionSelection();
    }
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: { token: "panels:bulkContributorsSelection.title" },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <SelectableContributorsAccordion />
      </SidePanelBody>
      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          translate={{
            token: "common:next",
          }}
          isDisabled={!selectedGithubUserIds?.length}
          onClick={() => handleOpenFlow()}
        />
      </SidePanelFooter>
    </>
  );
}

export function BulkContributorSelection() {
  const { name } = useBulkContributorSelection();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
