import { BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

export interface BillingProfileCardProps {
  type: BillingProfileTypeUnion;
  name: string;
  requestableRewardCount: number;
  isDisabled?: boolean;
  onClick?: () => void;
}
