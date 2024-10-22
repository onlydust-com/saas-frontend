import { useMemo } from "react";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";

import { RewardedCard } from "@/shared/panels/contribution-sidepanel/_features/rewarded-card/rewarded-card";

import { RewardedCardWrapperProps } from "./rewarded-card-wrapper.types";

export function RewardedCardWrapper({ contribution }: RewardedCardWrapperProps) {
  const { data } = RewardReactQueryAdapter.client.useGetRewards({
    queryParams: {
      contributionUUIDs: [contribution.id],
      pageSize: 30,
    },
    options: {
      enabled: !!contribution?.totalRewardedUsdAmount,
    },
  });

  const rewards = useMemo(() => data?.pages.flatMap(page => page.rewards) || [], [data]);

  if (!rewards.length) {
    return null;
  }

  return rewards?.map((reward, index) => (
    <RewardedCard key={`rewarded-card-${index}`} reward={reward.amount} processedAt={reward.processedAt} />
  ));
}
