import { BillingProfileShortInterface } from "@/core/domain/billing-profile/models/billing-profile-short-model";
import { MeContributorProjectsInterface } from "@/core/domain/me/models/me-contributor-projects-model";
import {
  MeHackathonRegistrationInterface,
  MeHackathonRegistrationResponse,
} from "@/core/domain/me/models/me-hackathon-registration-model";
import { MeMaintainerProjectsInterface } from "@/core/domain/me/models/me-maintainer-projects-model";
import { MeInterface } from "@/core/domain/me/models/me-model";
import { MeProfileInterface } from "@/core/domain/me/models/me-profile-model";
import { ProjectShortInterface } from "@/core/domain/project/models/project-short-model";
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

/* ------------------------------ Get My Projects As Maintainer ------------------------------ */

export type GetMyProjectsAsMaintainerResponse = components["schemas"]["MyProjectsAsMaintainerPageResponse"];

export type GetMyProjectsAsMaintainerModel = Omit<GetMyProjectsAsMaintainerResponse, "projects"> & {
  projects: MeMaintainerProjectsInterface[];
};

export type GetMyProjectsAsMaintainerQueryParams = operations["getMyProjectsAsMaintainer"]["parameters"]["query"];

export type GetMyProjectsAsMaintainerPortParams = HttpClientParameters<{
  QueryParams: GetMyProjectsAsMaintainerQueryParams;
}>;

export type GetMyProjectsAsMaintainerPortResponse = HttpStorageResponse<GetMyProjectsAsMaintainerModel>;

/* ------------------------------ Get My Projects As Contributor ------------------------------ */

export type GetMyProjectsAsContributorResponse = components["schemas"]["MyProjectsAsContributorPageResponse"];

export type GetMyProjectsAsContributorModel = Omit<GetMyProjectsAsContributorResponse, "projects"> & {
  projects: MeContributorProjectsInterface[];
};

export type GetMyProjectsAsContributorQueryParams = operations["getMyProjectsAsContributor"]["parameters"]["query"];

export type GetMyProjectsAsContributorPortParams = HttpClientParameters<{
  QueryParams: GetMyProjectsAsContributorQueryParams;
}>;

export type GetMyProjectsAsContributorPortResponse = HttpStorageResponse<GetMyProjectsAsContributorModel>;

/* ------------------------------ Get My Payout Preferences ------------------------------ */

export type GetMyPayoutPreferencesResponse = components["schemas"]["PayoutPreferencesItemResponse"][];

export type GetMyPayoutPreferencesModel = {
  project: ProjectShortInterface;
  billingProfile?: BillingProfileShortInterface;
}[];

export type GetMyPayoutPreferencesPortParams = HttpClientParameters<object>;

export type GetMyPayoutPreferencesPortResponse = HttpStorageResponse<GetMyPayoutPreferencesModel>;

/* ------------------------------ Set My Payout Preference For Project ------------------------------ */

export type SetMyPayoutPreferenceForProjectBody = components["schemas"]["PayoutPreferenceRequest"];

export type SetMyPayoutPreferenceForProjectPortParams = HttpClientParameters<object>;

export type SetMyPayoutPreferenceForProjectPortResponse = HttpStorageResponse<
  never,
  SetMyPayoutPreferenceForProjectBody
>;

/* ------------------------------ Post My Application ------------------------------ */

export type PostMyApplicationBody = components["schemas"]["ProjectApplicationCreateRequest"];

export type PostMyApplicationPortParams = HttpClientParameters<object>;

export type PostMyApplicationPortResponse = HttpStorageResponse<never, PostMyApplicationBody>;

/* --------------------------------- Get my hackathon registration -------------------------------- */

export type GetMyHackathonRegistrationResponse = MeHackathonRegistrationResponse;

export type GetMyHackathonRegistrationModel = MeHackathonRegistrationInterface;

export type GetMyHackathonRegistrationPathParams = operations["getHackathonRegistration"]["parameters"]["path"];

export type GetMyHackathonRegistrationPortParams = HttpClientParameters<{
  PathParams: GetMyHackathonRegistrationPathParams;
}>;

export type GetMyHackathonRegistrationPortResponse = HttpStorageResponse<GetMyHackathonRegistrationModel>;

/* --------------------------------- Register to hackathon -------------------------------- */

export type RegisterToHackathonPathParams = operations["registerToHackathon"]["parameters"]["path"];

export type RegisterToHackathonPortParams = HttpClientParameters<{
  PathParams: RegisterToHackathonPathParams;
}>;

export type RegisterToHackathonPortResponse = HttpStorageResponse<never>;
