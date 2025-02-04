import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyHackathonRegistrationPortParams,
  GetMyHackathonRegistrationPortResponse,
  GetMyPayoutPreferencesPortParams,
  GetMyPayoutPreferencesPortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  GetMyProjectsAsContributorPortParams,
  GetMyProjectsAsContributorPortResponse,
  GetMyProjectsAsMaintainerPortParams,
  GetMyProjectsAsMaintainerPortResponse,
  GetUpdateGithubProfilePortParams,
  GetUpdateGithubProfilePortResponse,
  LogoutMeResponsePortParams,
  LogoutMeResponsePortResponse,
  PostMyApplicationPortParams,
  PostMyApplicationPortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyPayoutPreferenceForProjectPortParams,
  SetMyPayoutPreferenceForProjectPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
  UploadProfilePicturePortParams,
  UploadProfilePicturePortResponse,
} from "@/core/domain/me/me-contract.types";

export interface MeFacadePort {
  logoutMe(params: LogoutMeResponsePortParams): LogoutMeResponsePortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  getMyProjectsAsMaintainer(p: GetMyProjectsAsMaintainerPortParams): GetMyProjectsAsMaintainerPortResponse;
  getMyProjectsAsContributor(p: GetMyProjectsAsContributorPortParams): GetMyProjectsAsContributorPortResponse;
  getMyPayoutPreferences(p: GetMyPayoutPreferencesPortParams): GetMyPayoutPreferencesPortResponse;
  setMyPayoutPreferenceForProject(
    p: SetMyPayoutPreferenceForProjectPortParams
  ): SetMyPayoutPreferenceForProjectPortResponse;
  postMyApplication(p: PostMyApplicationPortParams): PostMyApplicationPortResponse;
  getMyHackathonRegistration(params: GetMyHackathonRegistrationPortParams): GetMyHackathonRegistrationPortResponse;
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  getUpdateGithubProfile(params: GetUpdateGithubProfilePortParams): GetUpdateGithubProfilePortResponse;
  uploadProfilePicture(params: UploadProfilePicturePortParams): UploadProfilePicturePortResponse;
}
