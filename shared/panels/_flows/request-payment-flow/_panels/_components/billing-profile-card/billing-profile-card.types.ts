import { BillingProfileRoleUnion, BillingProfileTypeUnion } from "@/core/domain/billing-profile/billing-profile.types";

export interface BillingProfileCardProps {
  type: BillingProfileTypeUnion;
  role: BillingProfileRoleUnion;
  enabled: boolean;
  name: string;
  requestableRewardCount: number;
  isDisabled?: boolean;
  onClick?: () => void;
}
