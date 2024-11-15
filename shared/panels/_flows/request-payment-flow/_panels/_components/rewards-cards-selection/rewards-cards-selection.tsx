import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { RewardCardCheckbox } from "@/shared/features/rewards/reward-card-checkbox/reward-card-checkbox";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";

import { RewardsCardsSelectionProps } from "./rewards-cards-selection.types";

export function RewardsCardsSelection({ rewards }: RewardsCardsSelectionProps) {
  const { rewardIds, selectRewards, billingProfileId } = useRequestPaymentFlow();

  function onSelectRewards(id: string, checked: boolean) {
    if (billingProfileId) {
      if (checked) {
        selectRewards(billingProfileId, [...rewardIds.filter(i => i !== id), id]);
      } else {
        selectRewards(billingProfileId, [...rewardIds.filter(i => i !== id)]);
      }
    }
  }

  function onSelectAllRewards() {
    if (billingProfileId) {
      if (!rewardIds?.length) {
        selectRewards(billingProfileId, [...rewards.rewards.map(reward => reward.id)]);
      } else {
        selectRewards(billingProfileId, []);
      }
    }
  }

  return (
    <div className={"flex flex-col gap-2 rounded-lg bg-components-accordion-open-bg p-3"}>
      <div className={"flex flex-row items-center justify-between gap-1"}>
        <div className={"flex flex-row items-center justify-start gap-1"}>
          <Typo size={"md"} weight={"medium"} translate={{ token: "panels:requestPaymentFlow.rewards.title" }} />
          <Badge size={"xxs"} color={"grey"} shape={"rounded"}>
            {rewardIds?.length}
          </Badge>
        </div>
        <Button
          variant={"secondary"}
          size={"xs"}
          translate={{
            token: rewardIds?.length > 0 ? "common:clearSelection" : "common:selectAll",
          }}
          onClick={onSelectAllRewards}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        {rewards.rewards.map(reward => (
          <RewardCardCheckbox
            key={reward.id}
            id={reward.id}
            amount={reward.amount}
            numberOfRewardedContributions={reward.numberOfRewardedContributions}
            project={{
              name: reward.rewardedOnProjectName,
              logoUrl: reward.rewardedOnProjectLogoUrl,
            }}
            value={rewardIds?.includes(reward.id)}
            onChange={checked => onSelectRewards(reward.id, checked)}
          />
        ))}
      </div>
    </div>
  );
}
