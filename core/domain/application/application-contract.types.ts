import { ApplicationListItemInterface } from "@/core/domain/application/models/application-list-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Applications ------------------------------ */

export type GetApplicationsResponse = components["schemas"]["ProjectApplicationPageResponse"];
export type GetApplicationsModel = Omit<GetApplicationsResponse, "applications"> & {
  applications: ApplicationListItemInterface[];
};

export type GetApplicationsQueryParams = operations["getProjectsApplicationsV2"]["parameters"]["query"]["params"];

export type GetApplicationsPortResponse = HttpStorageResponse<GetApplicationsModel>;

export type GetApplicationsPortParams = HttpClientParameters<{
  QueryParams: GetApplicationsQueryParams;
}>;

/* ---------------------------- Patch Application --------------------------- */

export type PatchApplicationBody = components["schemas"]["ProjectApplicationPatchRequest"];

export type PatchApplicationPathParams = operations["patchProjectApplication"]["parameters"]["path"];

export type PatchApplicationPortParams = HttpClientParameters<{ PathParams: PatchApplicationPathParams }>;

export type PatchApplicationPortResponse = HttpStorageResponse;
