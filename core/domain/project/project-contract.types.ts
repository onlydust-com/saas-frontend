import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";
import { ProjectListItemInterface } from "@/core/domain/project/models/project-list-item-model";
import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Project By Id ------------------------------ */
export type GetProjectByIdResponse = components["schemas"]["ProjectResponse"];

export type GetProjectByIdPortResponse = HttpStorageResponse<ProjectInterface>;

type GetProjectByIdQueryParams = operations["getProject"]["parameters"]["query"];
type GetProjectByIdPathParams = operations["getProject"]["parameters"]["path"];

export type GetProjectByIdPortParams = HttpClientParameters<{
  QueryParams: GetProjectByIdQueryParams;
  PathParams: GetProjectByIdPathParams;
}>;

/* ------------------------------ Get Project Stats ------------------------------ */
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

/* --------------------- Upload project logo --------------------- */

export type UploadProjectLogoResponse = components["schemas"]["UploadImageResponse"];

export type UploadProjectLogoPortParams = HttpClientParameters<object>;

export type UploadProjectLogoPortResponse = HttpStorageResponse<UploadProjectLogoResponse, File>;

/* --------------------- Edit Project --------------------- */

export type EditProjectBody = components["schemas"]["UpdateProjectRequest"];

type EditProjectPathParams = operations["updateProject"]["parameters"]["path"];

export type EditProjectPortParams = HttpClientParameters<{
  PathParams: EditProjectPathParams;
}>;

export type EditProjectPortResponse = HttpStorageResponse;

/* ------------------------------ Get Project Financial Details ------------------------------ */
export type GetProjectFinancialDetailsResponse = components["schemas"]["ProjectFinancialResponse"];

export type GetProjectFinancialDetailsPortResponse = HttpStorageResponse<ProjectFinancialInterface>;

type GetProjectFinancialDetailsPathParams = operations["getProjectFinancialDetails"]["parameters"]["path"];

export type GetProjectFinancialDetailsPortParams = HttpClientParameters<{
  PathParams: GetProjectFinancialDetailsPathParams;
}>;
