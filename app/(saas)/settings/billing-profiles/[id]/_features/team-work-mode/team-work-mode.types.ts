import { BillingProfileType } from "@/core/domain/billing-profile/billing-profile.types";

export interface TeamWorkModeProps {
  type: BillingProfileType;
  billingProfileId: string;
  isSwitchableToSelfEmployed: boolean;
}
