import { ActionType } from "@/core/domain/billing-profile/models/billing-profile-coworker-model";

export interface ManageCoworkerProps {
  actionType: ActionType;
  githubUserId: number;
  billingProfileId: string;
}
