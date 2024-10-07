import { GetContributionsResponse } from "@/core/domain/contribution/contribution-contract.types";

type status = GetContributionsResponse["contributions"][0]["activityStatus"];

export const ContributionActivityStatus: { [key in status]: key } = {
  NOT_ASSIGNED: "NOT_ASSIGNED",
  IN_PROGRESS: "IN_PROGRESS",
  TO_REVIEW: "TO_REVIEW",
  DONE: "DONE",
  ARCHIVED: "ARCHIVED",
} as const;

export type ContributionActivityStatusUnion = keyof typeof ContributionActivityStatus;

export type ContributionGithubStatusUnion = GetContributionsResponse["contributions"][0]["githubStatus"];
export type ContributionTypeUnion = GetContributionsResponse["contributions"][0]["type"];
