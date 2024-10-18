import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { Typo } from "@/design-system/atoms/typo";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useRewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.hooks";
import { RewardDetailSidepanelData } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.types";

export function RewardDetailSidepanel() {
  const { name } = useRewardDetailSidepanel();
  const idKernelPort = bootstrap.getIdKernelPort();
  const { Panel } = useSidePanel({ name });
  const { rewardId, projectId } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {};

  const { data } = RewardReactQueryAdapter.client.useGetProjectReward({
    pathParams: { projectId: projectId ?? "", rewardId: rewardId ?? "" },
    options: {
      enabled: Boolean(projectId && rewardId),
    },
  });

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ children: rewardId ? `#${idKernelPort.prettyId(rewardId)}` : "" }}
      />

      <SidePanelBody>
        <div className="mx-auto flex max-h-72 flex-1 items-center">
          <Typo color={"primary"} weight={"medium"} classNames={{ base: "font-clash text-4xl" }}>
            {data?.amount.prettyAmount} {data?.amount.currency.code}
          </Typo>
        </div>
      </SidePanelBody>
    </Panel>
  );
}
