import { RewardedCard } from "../rewarded-card/rewarded-card";
import { RewardedCardWrapperProps } from "./rewarded-card-wrapper.types";

export function RewardedCardWrapper({ contribution }: RewardedCardWrapperProps) {
  return contribution.totalRewardedAmount?.details?.map((reward, index) => (
    <RewardedCard key={`rewarded-card-${index}`} reward={reward} />
  ));
}
