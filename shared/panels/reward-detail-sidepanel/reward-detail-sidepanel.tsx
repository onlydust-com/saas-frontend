import { bootstrap } from "@/core/bootstrap";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useRewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.hooks";
import { RewardDetailSidepanelData } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.types";

export function RewardDetailSidepanel() {
  const { name } = useRewardDetailSidepanel();
  const idKernelPort = bootstrap.getIdKernelPort();
  const { Panel } = useSidePanel({ name });
  const { reward } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {};

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ children: reward?.id ? `#${idKernelPort.prettyId(reward?.id)}` : "" }}
      />

      <SidePanelBody>
        <div className="flex flex-col gap-3">details</div>
      </SidePanelBody>
    </Panel>
  );
}
