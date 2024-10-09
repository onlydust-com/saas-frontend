import {
  GetContributionByIdPortParams,
  GetContributionByIdPortResponse,
  GetContributionEventsPortParams,
  GetContributionEventsPortResponse,
  GetContributionsPortParams,
  GetContributionsPortResponse,
  PatchContributionPortParams,
  PatchContributionPortResponse,
} from "@/core/domain/contribution/contribution-contract.types";

export interface ContributionStoragePort {
  getContributions(p: GetContributionsPortParams): GetContributionsPortResponse;
  getContributionsById(p: GetContributionByIdPortParams): GetContributionByIdPortResponse;
  getContributionEvent(p: GetContributionEventsPortParams): GetContributionEventsPortResponse;
  patchContribution(p: PatchContributionPortParams): PatchContributionPortResponse;
}
