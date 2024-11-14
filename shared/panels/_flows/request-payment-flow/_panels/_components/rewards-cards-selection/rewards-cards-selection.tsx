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

  return (
    <div>
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
  );
}
