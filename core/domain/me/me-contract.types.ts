import { MeInterface } from "@/core/domain/me/models/me-model";
import { MeOrganizationInterface } from "@/core/domain/me/models/me-organization-model";
import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";
import { MeProjectListItemInterface } from "@/core/domain/me/models/me-projects-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Logout me -------------------------------- */

export type LogoutMeResponse = never;

export type LogoutMeResponsePortParams = HttpClientParameters<object>;

export type LogoutMeResponsePortResponse = HttpStorageResponse<LogoutMeResponse>;

/* --------------------------------- Get me -------------------------------- */

export type GetMeResponse = components["schemas"]["GetMeResponse"];

export type GetMeResponsePortParams = HttpClientParameters<object>;

export type GetMeResponsePortResponse = HttpStorageResponse<MeInterface>;

/* --------------------------------- Set me --------------------------------- */

export type SetMeBody = components["schemas"]["PatchMeContract"];

export type SetMePortParams = HttpClientParameters<object>;

export type SetMePortResponse = HttpStorageResponse<MeInterface, SetMeBody>;

/* --------------------------------- Get my profile -------------------------------- */

export type GetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type GetMyProfilePortParams = HttpClientParameters<object>;

export type GetMyProfilePortResponse = HttpStorageResponse<MeProfileInterface>;

/* --------------------------------- Set my profile -------------------------------- */

export type SetMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type SetMyProfilePortParams = HttpClientParameters<object>;

export type SetMyProfilePortResponse = HttpStorageResponse<never, SetMyProfileBody>;

/* --------------------------------- Replace my profile -------------------------------- */

export type ReplaceMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type ReplaceMyProfilePortParams = HttpClientParameters<object>;

export type ReplaceMyProfilePortResponse = HttpStorageResponse<never, ReplaceMyProfileBody>;

/* ------------------------------ Get MY Projects ------------------------------ */

export type GetMeProjectsResponse = components["schemas"]["MyProjectsPageResponse"];

export type GetMeProjectsModel = Omit<GetMeProjectsResponse, "projects"> & {
  projects: MeProjectListItemInterface[];
};

export type GetMeProjectsQueryParams = operations["getMyProjects"]["parameters"]["query"];

export type GetMeProjectsPortResponse = HttpStorageResponse<GetMeProjectsModel>;

export type GetMeProjectsPortParams = HttpClientParameters<{ QueryParams: GetMeProjectsQueryParams }>;

/* --------------------------------- Get my organizations -------------------------------- */

export type GetMyOrganizationsResponse = components["schemas"]["GithubOrganizationResponse"][];

export type GetMyOrganizationsPortParams = HttpClientParameters<object>;

export type GetMyOrganizationsPortResponse = HttpStorageResponse<MeOrganizationInterface[]>;
