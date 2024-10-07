import { z } from "zod";

import { EditProjectBody } from "@/core/domain/project/project-contract.types";

export interface ProjectUpdateSidePanelData {
  projectId: string;
  canGoBack?: boolean;
}

export type EditProjectFormData = EditProjectBody & {
  logoFile?: File;
  rewardSettingsArrays: string[];
  labels: { name: string; backendId?: string }[];
};

export const editProjectFormValidation = z.object({
  name: z.string().min(1),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  isLookingForContributors: z.boolean().optional(),
  inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
  githubRepoIds: z.array(z.number()).optional(),
  projectLeadsToKeep: z.array(z.string()).optional(),
  description: z.string().optional(),
  ecosystemIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  logoFile: z.any().optional(),
  rewardSettingsArrays: z.array(z.string()).optional(),
  moreInfos: z
    .array(
      z.object({
        url: z.string().trim().nullish().optional(),
        value: z.string().nullish().optional(),
      })
    )
    .min(0),
  labels: z
    .array(
      z.object({
        name: z.string(),
        backendId: z.string().optional(),
      })
    )
    .min(0),
});

export enum rewardsSettingsTypes {
  PullRequests = "PullRequests",
  Issue = "Issue",
  CodeReviews = "CodeReviews",
}
