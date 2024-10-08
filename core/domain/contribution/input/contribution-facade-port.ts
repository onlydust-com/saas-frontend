import {
  GetContributionByIdPortParams,
  GetContributionByIdPortResponse,
  GetContributionsPortParams,
  GetContributionsPortResponse,
} from "@/core/domain/contribution/contribution-contract.types";

export interface ContributionFacadePort {
  getContributions(p: GetContributionsPortParams): GetContributionsPortResponse;
  getContributionsById(p: GetContributionByIdPortParams): GetContributionByIdPortResponse;
}
