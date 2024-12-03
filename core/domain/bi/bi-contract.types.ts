import { BiContributorActivityInterface } from "@/core/domain/bi/models/bi-contributor-activity-model";
import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";
import { BiContributorsStatsInterface } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { BiProjectInterface } from "@/core/domain/bi/models/bi-project-model";
import { BiProjectsStatsInterface } from "@/core/domain/bi/models/bi-projects-stats-model";
import { BiStatsFinancialsInterface } from "@/core/domain/bi/models/bi-stats-financials-model";
import { BiWorldMapInterface } from "@/core/domain/bi/models/bi-world-map-model";
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

/* --------------------- Get Bi Projects Stats --------------------- */
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

/* --------------------- Get Bi World map --------------------- */

export type GetBiWorldMapResponse = components["schemas"]["BiWorldMapListResponse"];

export type GetBiWorldMapModel = Omit<GetBiWorldMapResponse, "countries"> & {
  countries: BiWorldMapInterface[];
};

type GetBiWorldMapQueryParams = operations["getBIWorldMap"]["parameters"]["query"];

type GetBiWorldMapPathParams = operations["getBIWorldMap"]["parameters"]["path"];

export type GetBiWorldMapPortParams = HttpClientParameters<{
  QueryParams: GetBiWorldMapQueryParams;
  PathParams: GetBiWorldMapPathParams;
}>;

export type GetBiWorldMapPortResponse = HttpStorageResponse<GetBiWorldMapModel>;

/* --------------------- Get Bi Projects --------------------- */
export type GetBiProjectsResponse = components["schemas"]["BiProjectsPageResponse"];
export type GetBiProjectsModel = Omit<GetBiProjectsResponse, "projects"> & {
  projects: BiProjectInterface[];
};

export type GetBiProjectsQueryParams = operations["getBIProjects_1"]["parameters"]["query"]["queryParams"];

export type GetBiProjectsPortParams = HttpClientParameters<{
  QueryParams: GetBiProjectsQueryParams;
}>;

export type GetBiProjectsPortResponse = HttpStorageResponse<GetBiProjectsModel>;

/* --------------------- Get Bi Projects CSV --------------------- */

export type GetBiProjectsCsvPortResponse = HttpStorageResponse<Blob>;

/* --------------------- Get Bi Contributors --------------------- */

export type GetBiContributorsResponse = components["schemas"]["BiContributorsPageResponse"];
export type GetBiContributorsModel = Omit<GetBiContributorsResponse, "contributors"> & {
  contributors: BiContributorInterface[];
};

export type GetBiContributorsQueryParams = operations["getBIContributors_1"]["parameters"]["query"]["queryParams"];

export type GetBiContributorsPortParams = HttpClientParameters<{
  QueryParams: GetBiContributorsQueryParams;
}>;

export type GetBiContributorsPortResponse = HttpStorageResponse<GetBiContributorsModel>;

/* --------------------- Get Bi contributor by Id --------------------- */

export type GetBiContributorByIdResponse = components["schemas"]["BiContributorsPageItemResponse"];

export type GetBiContributorByIdModel = BiContributorInterface;

type GetBiContributorByIdPathParams = operations["getBIContributor"]["parameters"]["path"];

export type GetBiContributorByIdPortParams = HttpClientParameters<{
  PathParams: GetBiContributorByIdPathParams;
}>;

export type GetBiContributorByIdPortResponse = HttpStorageResponse<GetBiContributorByIdModel>;

/* --------------------- Get Bi contributor activity by Id --------------------- */

export type GetBiContributorActivityByIdResponse = components["schemas"]["ContributorActivityGraphResponse"];

export type GetBiContributorActivityByIdModel = BiContributorActivityInterface;

type GetBiContributorActivityByIdPathParams = operations["getContributorActivityGraph"]["parameters"]["path"];
type GetBiContributorActivityByIdQueryParams = operations["getContributorActivityGraph"]["parameters"]["query"];

export type GetBiContributorActivityByIdPortParams = HttpClientParameters<{
  PathParams: GetBiContributorActivityByIdPathParams;
  QueryParams: GetBiContributorActivityByIdQueryParams;
}>;

export type GetBiContributorActivityByIdPortResponse = HttpStorageResponse<GetBiContributorActivityByIdModel>;

/* --------------------- Get Bi Contributors CSV --------------------- */

export type GetBiContributorsCsvPortResponse = HttpStorageResponse<Blob>;

/* --------------------- Get Bi Stats Financials --------------------- */

export type GetBiStatsFinancialsResponse = components["schemas"]["BiFinancialsStatsListResponse"];
export type GetBiStatsFinancialsModel = Omit<GetBiStatsFinancialsResponse, "stats"> & {
  stats: BiStatsFinancialsInterface[];
};

type GetBiStatsFinancialsQueryParams = operations["getBIFinancialsStats"]["parameters"]["query"];

export type GetBiStatsFinancialsPortParams = HttpClientParameters<{
  QueryParams: GetBiStatsFinancialsQueryParams;
}>;

export type GetBiStatsFinancialsPortResponse = HttpStorageResponse<GetBiStatsFinancialsModel>;
