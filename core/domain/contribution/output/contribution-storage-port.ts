import {
  GetContributionByIdPortParams,
  GetContributionByIdPortResponse,
  GetContributionEventsPortParams,
  GetContributionEventsPortResponse,
  GetContributionsPortParams,
  GetContributionsPortResponse,
} from "@/core/domain/contribution/contribution-contract.types";

export interface ContributionStoragePort {
  getContributions(p: GetContributionsPortParams): GetContributionsPortResponse;
  getContributionsById(p: GetContributionByIdPortParams): GetContributionByIdPortResponse;
  getContributionEvent(p: GetContributionEventsPortParams): GetContributionEventsPortResponse;
}
