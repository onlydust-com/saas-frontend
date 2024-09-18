import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  GetUserByIdPortParams,
  GetUserByIdPortResponse,
  GetUserByLoginPortParams,
  GetUserByLoginPortResponse,
  GetUserEcosystemsPortParams,
  GetUserEcosystemsPortResponse,
  GetUserLanguagesPortParams,
  GetUserLanguagesPortResponse,
  GetUserStatsPortParams,
  GetUserStatsPortResponse,
  LogoutMeResponsePortParams,
  LogoutMeResponsePortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SearchUsersPortParams,
  SearchUsersPortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "@/core/domain/user/user-contract.types";

export interface UserFacadePort {
  logoutMe(params: LogoutMeResponsePortParams): LogoutMeResponsePortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  searchUser(params: SearchUsersPortParams): SearchUsersPortResponse;
  getUserById(params: GetUserByIdPortParams): GetUserByIdPortResponse;
  getUserByLogin(params: GetUserByLoginPortParams): GetUserByLoginPortResponse;
  getUserLanguages(params: GetUserLanguagesPortParams): GetUserLanguagesPortResponse;
  getUserEcosystems(params: GetUserEcosystemsPortParams): GetUserEcosystemsPortResponse;
  getUserStats(params: GetUserStatsPortParams): GetUserStatsPortResponse;
}
