import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  GetUserByIdPortParams,
  GetUserByIdPortResponse,
  GetUserByLoginPortParams,
  GetUserByLoginPortResponse,
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

export interface UserStoragePort {
  routes: Record<string, string>;
  logoutMe(params: LogoutMeResponsePortParams): LogoutMeResponsePortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  searchUser(params: SearchUsersPortParams): SearchUsersPortResponse;
  getUserById(params: GetUserByIdPortParams): GetUserByIdPortResponse;
  getUserByLogin(params: GetUserByLoginPortParams): GetUserByLoginPortResponse;
}
