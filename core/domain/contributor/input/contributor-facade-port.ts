import {
  GetContributorContributionsOverTimePortParams,
  GetContributorContributionsOverTimePortResponse,
  GetContributorLastYearRewindPortParams,
  GetContributorLastYearRewindPortResponse,
  GetContributorLocDistributionPortParams,
  GetContributorLocDistributionPortResponse,
  GetContributorProjectsPortParams,
  GetContributorProjectsPortResponse,
  GetContributorRewardsDistributionPortParams,
  GetContributorRewardsDistributionPortResponse,
  GetContributorStatsPortParams,
  GetContributorStatsPortResponse,
} from "@/core/domain/contributor/contributor-contract.types";

export interface ContributorFacadePort {
  getContributorStats(p: GetContributorStatsPortParams): GetContributorStatsPortResponse;
  getContributorRewardsDistribution(
    p: GetContributorRewardsDistributionPortParams
  ): GetContributorRewardsDistributionPortResponse;
  getContributorProjects(p: GetContributorProjectsPortParams): GetContributorProjectsPortResponse;
  getContributorLocDistribution(p: GetContributorLocDistributionPortParams): GetContributorLocDistributionPortResponse;
  getContributorLastYearRewind(p: GetContributorLastYearRewindPortParams): GetContributorLastYearRewindPortResponse;
  getContributorContributionsOverTime(
    p: GetContributorContributionsOverTimePortParams
  ): GetContributorContributionsOverTimePortResponse;
}
