import { BillingProfileShortInterface } from "@/core/domain/billing-profile/models/billing-profile-short-model";

export interface CellBillingProfileProps {
  projectId: string;
  billingProfile?: BillingProfileShortInterface;
}
