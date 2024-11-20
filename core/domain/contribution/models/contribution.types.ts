import { GetContributionsResponse } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionEventResponse } from "@/core/domain/contribution/models/contribution-event-model";

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

export type ContributionEventTypeUnion = ContributionEventResponse["type"];

export enum ContributionEventType {
  ISSUE_CREATED = "ISSUE_CREATED",
  PR_CREATED = "PR_CREATED",
  ISSUE_ASSIGNED = "ISSUE_ASSIGNED",
  PR_MERGED = "PR_MERGED",
  ISSUE_CLOSED = "ISSUE_CLOSED",
  LINKED_ISSUE_CREATED = "LINKED_ISSUE_CREATED",
  LINKED_ISSUE_ASSIGNED = "LINKED_ISSUE_ASSIGNED",
  LINKED_ISSUE_CLOSED = "LINKED_ISSUE_CLOSED",
}

export enum ContributionAs {
  MAINTAINER = "MAINTAINER",
  CONTRIBUTOR = "CONTRIBUTOR",
}

export type ContributionAsUnion = `${ContributionAs}`;
