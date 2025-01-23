import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { ContributorContributionsOverTimeInterface } from "./models/contributor-contributions-over-time-model";
import { ContributorLastYearRewindInterface } from "./models/contributor-last-year-rewind-model";
import { ContributorLocDistributionInterface } from "./models/contributor-loc-distribution-model";
import { ContributorProjectListItemInterface } from "./models/contributor-project-list-item-model";
import { ContributorRewardsDistributionInterface } from "./models/contributor-rewards-distribution-model";
import { ContributorStatsInterface } from "./models/contributor-stats-model";

/* ------------------------------ Get Contributor Stats ------------------------------ */

export type GetContributorStatsResponse = components["schemas"]["ContributorStatsResponse"];

type GetContributorStatsPathParams = operations["getContributorStats"]["parameters"]["path"];
type GetContributorStatsQueryParams = operations["getContributorStats"]["parameters"]["query"];

export type GetContributorStatsPortResponse = HttpStorageResponse<ContributorStatsInterface>;

export type GetContributorStatsPortParams = HttpClientParameters<{
  PathParams: GetContributorStatsPathParams;
  QueryParams: GetContributorStatsQueryParams;
}>;

/* ------------------------------ Get Contributor rewards distribution ------------------------------ */

export type GetContributorRewardsDistributionResponse = components["schemas"]["ContributorRewardsDistributionResponse"];

type GetContributorRewardsDistributionPathParams =
  operations["getContributorRewardsDistribution"]["parameters"]["path"];
type GetContributorRewardsDistributionQueryParams =
  operations["getContributorRewardsDistribution"]["parameters"]["query"];

export type GetContributorRewardsDistributionPortResponse =
  HttpStorageResponse<ContributorRewardsDistributionInterface>;

export type GetContributorRewardsDistributionPortParams = HttpClientParameters<{
  PathParams: GetContributorRewardsDistributionPathParams;
  QueryParams: GetContributorRewardsDistributionQueryParams;
}>;

/* ------------------------------ Get Contributor Projects ------------------------------ */

export type GetContributorProjectsResponse = components["schemas"]["ProjectPageResponseV2"];

export type GetContributorProjectsModel = Omit<GetContributorProjectsResponse, "projects"> & {
  projects: ContributorProjectListItemInterface[];
};

export type GetContributorProjectsQueryParams = operations["getContributorProjects"]["parameters"]["query"];
type GetContributorProjectsPathParams = operations["getContributorProjects"]["parameters"]["path"];

export type GetContributorProjectsPortResponse = HttpStorageResponse<GetContributorProjectsModel>;

export type GetContributorProjectsPortParams = HttpClientParameters<{
  QueryParams: GetContributorProjectsQueryParams;
  PathParams: GetContributorProjectsPathParams;
}>;

/* ------------------------------ Get Contributor loc distribution ------------------------------ */

export type GetContributorLocDistributionResponse = components["schemas"]["ContributorLocDistributionResponse"];

type GetContributorLocDistributionPathParams = operations["getContributorLocDistribution"]["parameters"]["path"];
type GetContributorLocDistributionQueryParams = operations["getContributorLocDistribution"]["parameters"]["query"];

export type GetContributorLocDistributionPortResponse = HttpStorageResponse<ContributorLocDistributionInterface>;

export type GetContributorLocDistributionPortParams = HttpClientParameters<{
  PathParams: GetContributorLocDistributionPathParams;
  QueryParams: GetContributorLocDistributionQueryParams;
}>;

/* ------------------------------ Get Contributor last year rewind ------------------------------ */

export type GetContributorLastYearRewindResponse = components["schemas"]["ContributorRewindResponse"];

type GetContributorLastYearRewindPathParams = operations["getContributorRewind"]["parameters"]["path"];

export type GetContributorLastYearRewindPortResponse = HttpStorageResponse<ContributorLastYearRewindInterface>;

export type GetContributorLastYearRewindPortParams = HttpClientParameters<{
  PathParams: GetContributorLastYearRewindPathParams;
}>;

/* ------------------------------ Get Contributor contributions over time ------------------------------ */

export type GetContributorContributionsOverTimeResponse = components["schemas"]["ContributionCountOverTimeResponse"];

type GetContributorContributionsOverTimePathParams = operations["getContributionsByTime"]["parameters"]["path"];
type GetContributorContributionsOverTimeQueryParams = operations["getContributionsByTime"]["parameters"]["query"];

export type GetContributorContributionsOverTimePortResponse =
  HttpStorageResponse<ContributorContributionsOverTimeInterface>;

export type GetContributorContributionsOverTimePortParams = HttpClientParameters<{
  PathParams: GetContributorContributionsOverTimePathParams;
  QueryParams: GetContributorContributionsOverTimeQueryParams;
}>;
