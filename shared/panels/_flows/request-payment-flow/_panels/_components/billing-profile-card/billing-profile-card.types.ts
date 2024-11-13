import { BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

export interface BillingProfileCardProps {
  id: string;
  type: BillingProfileTypeUnion;
  name: string;
  requestableRewardCount: number;
}
