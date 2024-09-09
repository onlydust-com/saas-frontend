import { ContributorInterface } from "@/core/domain/user/models/contributor-model";
import { UserInterface } from "@/core/domain/user/models/user-model";
import { UserProfileInterface } from "@/core/domain/user/models/user-profile-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Logout me -------------------------------- */

export type LogoutMeResponse = never;

export type LogoutMeResponsePortParams = HttpClientParameters<object>;

export type LogoutMeResponsePortResponse = HttpStorageResponse;

/* --------------------------------- Get me -------------------------------- */

export type GetMeResponse = components["schemas"]["GetMeResponse"];

export type GetMeResponsePortParams = HttpClientParameters<object>;

export type GetMeResponsePortResponse = HttpStorageResponse<UserInterface>;

/* --------------------------------- Set me --------------------------------- */

export type SetMeBody = components["schemas"]["PatchMeContract"];

export type SetMePortParams = HttpClientParameters<object>;

export type SetMePortResponse = HttpStorageResponse<UserInterface, SetMeBody>;

/* --------------------------------- Get my profile -------------------------------- */

export type GetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type GetMyProfilePortParams = HttpClientParameters<object>;

export type GetMyProfilePortResponse = HttpStorageResponse<UserProfileInterface>;

/* --------------------------------- Set my profile -------------------------------- */

export type SetMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type SetMyProfilePortParams = HttpClientParameters<object>;

export type SetMyProfilePortResponse = HttpStorageResponse<never, SetMyProfileBody>;

/* --------------------------------- Replace my profile -------------------------------- */

export type ReplaceMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type ReplaceMyProfilePortParams = HttpClientParameters<object>;

export type ReplaceMyProfilePortResponse = HttpStorageResponse<never, ReplaceMyProfileBody>;

/* --------------------------------- Search users -------------------------------- */

export type SearchUsersResponse = components["schemas"]["ContributorSearchResponse"];

export type SearchUsersModel = Omit<SearchUsersResponse, "internalContributors" | "externalContributors"> & {
  internalContributors: ContributorInterface[];
  externalContributors: ContributorInterface[];
};

type SearchUsersQueryParams = operations["searchContributors"]["parameters"]["query"];
type SearchUsersPathParams = operations["searchContributors"]["parameters"]["path"];

export type SearchUsersPortParams = HttpClientParameters<{
  QueryParams: SearchUsersQueryParams;
  PathParams: SearchUsersPathParams;
}>;

export type SearchUsersPortResponse = HttpStorageResponse<SearchUsersModel>;
