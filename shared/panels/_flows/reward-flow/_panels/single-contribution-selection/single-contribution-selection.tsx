import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";

import { OtherWorkSidepanel } from "../../_features/other-work-sidepanel/other-work-sidepanel";
import { useOtherWorkSidepanel } from "../../_features/other-work-sidepanel/other-work-sidepanel.hooks";

export function SingleContributionSelection() {
  const { name } = useSingleContributionSelection();
  const { Panel } = useSidePanel({ name });

  const { open } = useOtherWorkSidepanel();

  return (
    <>
      <Panel>
        <SidePanelHeader
          title={{
            children: "Select contribution",
          }}
          canGoBack
          canClose
        />

        <SidePanelBody>
          Select contributions in single flow
          <Button variant={"secondary"} size={"sm"} classNames={{ base: "w-full" }} onClick={() => open()}>
            Open other work
          </Button>
        </SidePanelBody>
      </Panel>

      <OtherWorkSidepanel />
    </>
  );
}
