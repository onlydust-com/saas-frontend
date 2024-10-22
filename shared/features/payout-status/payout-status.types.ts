import { PayoutStatus } from "@/core/domain/reward/reward-constants";

export interface PayoutStatusProps {
  status: PayoutStatus;
  dates?: {
    processedAt?: string | null;
    unlockDate?: string | null;
  };
  shouldOpenRequestPayment?: boolean;
  shouldRedirect?: boolean;
  billingProfileId?: string;
  rewardId?: string;
  projectId?: string;
  closeRewardPanel?: () => void;
}
