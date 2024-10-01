import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export enum QuantityFilterType {
  EQUAL = "EQUAL",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
}

export enum UserFilterType {
  CONTRIBUTOR = "CONTRIBUTOR",
  MAINTAINER = "MAINTAINER",
  LEAD_PROGRAM = "LEAD_PROGRAM",
}

export type ContributionUnion = components["schemas"]["BiContributorsQueryParamsContributionCount"]["types"][0];
export const ContributionFilterType: { [key in ContributionUnion]: key } = {
  ISSUE: "ISSUE",
  PULL_REQUEST: "PULL_REQUEST",
  CODE_REVIEW: "CODE_REVIEW",
} as const;
