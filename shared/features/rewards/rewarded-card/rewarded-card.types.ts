import { Money } from "@/core/kernel/money/money.types";

export interface RewardedCardProps {
  reward: Money;
  processedAt?: string;
  requestedAt?: string;
}
