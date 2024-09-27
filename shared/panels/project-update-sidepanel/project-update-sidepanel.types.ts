import { z } from "zod";

import { EditProjectBody } from "@/core/domain/project/project-contract.types";

export interface ProjectUpdateSidePanelData {
  projectId: string;
  canGoBack?: boolean;
}

export type EditProjectFormData = EditProjectBody & {
  logoFile?: File;
  leads: string[];
  rewardSettingsArrays: string[];
};

export const editProjectFormValidation = z.object({
  name: z.string().min(1),
});

export enum rewardsSettingsTypes {
  PullRequests = "PullRequests",
  Issue = "Issue",
  CodeReviews = "CodeReviews",
}
