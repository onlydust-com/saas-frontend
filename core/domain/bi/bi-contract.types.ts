import { BiContributorsStatsInterface } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { BiProjectsStatsInterface } from "@/core/domain/bi/models/bi-projects-stats-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------- Get Bi Contributors Stats --------------------- */
export type GetBiContributorsStatsResponse = components["schemas"]["BiContributorsStatsListResponse"];
export type GetBiContributorsStatsModel = Omit<GetBiContributorsStatsResponse, "stats"> & {
  stats: BiContributorsStatsInterface[];
};

type GetBiContributorsStatsQueryParams = operations["getBIContributorsStats"]["parameters"]["query"];

type GetBiContributorsStatsPathParams = operations["getBIContributorsStats"]["parameters"]["path"];

export type GetBiContributorsStatsPortParams = HttpClientParameters<{
  QueryParams: GetBiContributorsStatsQueryParams;
  PathParams: GetBiContributorsStatsPathParams;
}>;

export type GetBiContributorsStatsPortResponse = HttpStorageResponse<GetBiContributorsStatsModel>;

/* --------------------- Get Bi Contributors Stats --------------------- */
export type GetBiProjectsStatsResponse = components["schemas"]["BiProjectsStatsListResponse"];
export type GetBiProjectsStatsModel = Omit<GetBiProjectsStatsResponse, "stats"> & {
  stats: BiProjectsStatsInterface[];
};

type GetBiProjectsStatsQueryParams = operations["getBIProjectsStats"]["parameters"]["query"];

type GetBiProjectsStatsPathParams = operations["getBIProjectsStats"]["parameters"]["path"];

export type GetBiProjectsStatsPortParams = HttpClientParameters<{
  QueryParams: GetBiProjectsStatsQueryParams;
  PathParams: GetBiProjectsStatsPathParams;
}>;

export type GetBiProjectsStatsPortResponse = HttpStorageResponse<GetBiProjectsStatsModel>;
