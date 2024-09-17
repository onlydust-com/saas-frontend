import { ContributorInterface } from "@/core/domain/user/models/contributor-model";
import { UserInterface } from "@/core/domain/user/models/user-model";
import { UserProfileInterface } from "@/core/domain/user/models/user-profile-model";
import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";
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

/* --------------------------------- Get user -------------------------------- */

export type GetUserResponse = components["schemas"]["PublicUserProfileResponseV2"];

/* --------------------------------- Get user by ID -------------------------------- */

export type GetUserByIdResponse = GetUserResponse;

export type GetUserByIdPortResponse = HttpStorageResponse<UserPublicInterface>;

type GetUserByIdQueryParams = operations["getUserProfile"]["parameters"]["query"];
type GetUserByIdPathParams = operations["getUserProfile"]["parameters"]["path"];

export type GetUserByIdPortParams = HttpClientParameters<{
  QueryParams: GetUserByIdQueryParams;
  PathParams: GetUserByIdPathParams;
}>;

/* --------------------------------- Get user by Login -------------------------------- */

export type GetUserByLoginResponse = GetUserResponse;

export type GetUserByLoginPortResponse = HttpStorageResponse<UserPublicInterface>;

type GetUserByLoginQueryParams = operations["getUserProfileByLogin"]["parameters"]["query"];
type GetUserByLoginPathParams = operations["getUserProfileByLogin"]["parameters"]["path"];

export type GetUserByLoginPortParams = HttpClientParameters<{
  QueryParams: GetUserByLoginQueryParams;
  PathParams: GetUserByLoginPathParams;
}>;
