import { ContributorInterface } from "@/core/domain/user/models/contributor-model";
import { UserEcosystemItem } from "@/core/domain/user/models/user-ecosystem-item-model";
import { UserLanguageItem } from "@/core/domain/user/models/user-language-item-model";
import { UserPublicInterface } from "@/core/domain/user/models/user-public-model";
import { UserStats } from "@/core/domain/user/models/user-stats-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

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

/* --------------------------------- Get user languages -------------------------------- */

export type GetUserLanguagesResponse = components["schemas"]["UserProfileLanguagePage"];
export type GetUserLanguagesModel = Omit<GetUserLanguagesResponse, "languages"> & {
  languages: UserLanguageItem[];
};

type GetUserLanguagesQueryParams = operations["getUserProfileStatsPerLanguages"]["parameters"]["query"];

type GetUserLanguagesPathParams = operations["getUserProfileStatsPerLanguages"]["parameters"]["path"];

export type GetUserLanguagesPortParams = HttpClientParameters<{
  QueryParams: GetUserLanguagesQueryParams;
  PathParams: GetUserLanguagesPathParams;
}>;

export type GetUserLanguagesPortResponse = HttpStorageResponse<GetUserLanguagesResponse>;

/* --------------------------------- Get user ecosystems -------------------------------- */

export type GetUserEcosystemsResponse = components["schemas"]["UserProfileEcosystemPage"];
export type GetUserEcosystemsModel = Omit<GetUserEcosystemsResponse, "ecosystems"> & {
  ecosystems: UserEcosystemItem[];
};

type GetUserEcosystemsQueryParams = operations["getUserProfileStatsPerEcosystems"]["parameters"]["query"];

type GetUserEcosystemsPathParams = operations["getUserProfileStatsPerEcosystems"]["parameters"]["path"];

export type GetUserEcosystemsPortParams = HttpClientParameters<{
  QueryParams: GetUserEcosystemsQueryParams;
  PathParams: GetUserEcosystemsPathParams;
}>;

export type GetUserEcosystemsPortResponse = HttpStorageResponse<GetUserEcosystemsResponse>;

/* --------------------------------- Get user stats -------------------------------- */

export type GetUserStatsResponse = components["schemas"]["UserProfileStatsV2"];

export type GetUserStatsPortResponse = HttpStorageResponse<UserStats>;

type GetUserStatsQueryParams = operations["getUserProfileStats"]["parameters"]["query"];
type GetUserStatsPathParams = operations["getUserProfileStats"]["parameters"]["path"];

export type GetUserStatsPortParams = HttpClientParameters<{
  QueryParams: GetUserStatsQueryParams;
  PathParams: GetUserStatsPathParams;
}>;
