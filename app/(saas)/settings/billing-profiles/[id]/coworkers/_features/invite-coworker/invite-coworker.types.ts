import { z } from "zod";

import { BillingProfileRole } from "@/core/domain/billing-profile/billing-profile.types";

export interface InviteCoworkerProps {
  id: string;
}

export const inviteCoworkerSchema = z.object({
  githubUserId: z.string({
    required_error: "Please select a user",
  }),
  role: z.nativeEnum(BillingProfileRole, {
    required_error: "Please select a role",
  }),
});
