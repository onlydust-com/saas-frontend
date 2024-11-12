import { PayoutStatus } from "@/core/domain/reward/reward-constants";

export interface PayoutStatusProps {
  status: PayoutStatus;
  shouldRedirect?: boolean;
  billingProfileId?: string;
}
