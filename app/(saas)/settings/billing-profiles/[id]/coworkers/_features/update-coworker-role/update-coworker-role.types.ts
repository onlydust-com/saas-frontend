import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

export interface UpdateCoworkerRoleProps {
  billingProfileId: string;
  githubUserId: number;
  currentRole: BillingProfileRole;
}
