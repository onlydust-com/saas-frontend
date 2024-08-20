import { ProjectListItemInterface } from "@/core/domain/project/models/project-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

export type GetProjectByidResponse = components["schemas"]["ProjectResponse"];

export type GetProjectByidPortResponse = HttpStorageResponse<GetProjectByidResponse>;

type GetProjectByIdQueryParams = operations["getProject"]["parameters"]["query"];
type GetProjectByIdPathParams = operations["getProject"]["parameters"]["path"];

export type GetProjectByidPortParams = HttpClientParameters<{
  QueryParams: GetProjectByIdQueryParams;
  PathParams: GetProjectByIdPathParams;
}>;

export type GetProjectStatsResponse = components["schemas"]["ProjectStatsResponse"];

export type GetProjectStatsPortResponse = HttpStorageResponse<GetProjectStatsResponse>;

type GetProjectStatsQueryParams = operations["getProjectStats"]["parameters"]["query"];
type GetProjectStatsPathParams = operations["getProjectStats"]["parameters"]["path"];

export type GetProjectStatsPortParams = HttpClientParameters<{
  QueryParams: GetProjectStatsQueryParams;
  PathParams: GetProjectStatsPathParams;
}>;

/* ------------------------------ Get Projects ------------------------------ */
export type GetProjectsResponse = components["schemas"]["ProjectPageResponse"];
export type GetProjectsModel = Omit<GetProjectsResponse, "projects"> & {
  projects: ProjectListItemInterface[];
};

type GetProjectsQueryParams = operations["getProjects"]["parameters"]["query"];

export type GetProjectsPortResponse = HttpStorageResponse<GetProjectsModel>;

export type GetProjectsPortParams = HttpClientParameters<{ QueryParams: GetProjectsQueryParams }>;
