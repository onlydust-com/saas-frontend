import { z } from "zod";

import { AddOtherWorkBody } from "@/core/domain/reward/reward-contract.types";

export type CreateContributionFormData = AddOtherWorkBody;

export const createContributionFormValidation = z.object({
  githubRepoId: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export interface CreateContributionSidePanelData {
  githubUserId: number;
}
