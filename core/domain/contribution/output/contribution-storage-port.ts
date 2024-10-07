import {
  GetContributionsPortParams,
  GetContributionsPortResponse,
} from "@/core/domain/contribution/contribution-contract.types";

export interface ContributionStoragePort {
  getContributions(p: GetContributionsPortParams): GetContributionsPortResponse;
}
