import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { bootstrap } from "@/core/bootstrap";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { RewardedCard } from "@/shared/features/rewards/rewarded-card/rewarded-card";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { ContributionsAccordion } from "@/shared/panels/reward-detail-sidepanel/_features/contributions-accordion/contributions-accordion";
import { useRewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.hooks";
import { RewardDetailSidepanelData } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel.types";

export function Content() {
  const { name } = useRewardDetailSidepanel();
  const { rewardId } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {};

  const {
    data: reward,
    isError,
    isLoading,
  } = RewardReactQueryAdapter.client.useGetRewardId({
    pathParams: { rewardId: rewardId ?? "" },
    options: {
      enabled: Boolean(rewardId),
    },
  });

  if (isLoading) {
    return (
      <SidePanelBody>
        <Skeleton className={"h-30"} />
        <Skeleton className={"h-full"} />
      </SidePanelBody>
    );
  }

  if (isError || !reward) {
    return (
      <SidePanelBody>
        <EmptyStateLite />
      </SidePanelBody>
    );
  }

  return (
    <>
      <SidePanelBody>
        <RewardedCard reward={reward.amount} processedAt={reward.processedAt} requestedAt={reward.requestedAt} />
        {reward.items?.length ? <ContributionsAccordion ids={reward.items} /> : null}
      </SidePanelBody>
    </>
  );
}

export function RewardDetailSidepanel() {
  const { name } = useRewardDetailSidepanel();
  const idKernelPort = bootstrap.getIdKernelPort();
  const { Panel } = useSidePanel({ name });
  const { rewardId } = useSinglePanelData<RewardDetailSidepanelData>(name) ?? {};

  return (
    <Panel>
      <SidePanelHeader
        canGoBack={false}
        canClose={true}
        title={{ children: rewardId ? `#${idKernelPort.prettyId(rewardId)}` : "" }}
      />
      <Content />
    </Panel>
  );
}
