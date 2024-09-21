import {
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
  SearchUsersPortParams,
  SearchUsersPortResponse,
} from "@/core/domain/user/user-contract.types";

export interface UserStoragePort {
  routes: Record<string, string>;
  searchUser(params: SearchUsersPortParams): SearchUsersPortResponse;
  getUserById(params: GetUserByIdPortParams): GetUserByIdPortResponse;
  getUserByLogin(params: GetUserByLoginPortParams): GetUserByLoginPortResponse;
  getUserLanguages(params: GetUserLanguagesPortParams): GetUserLanguagesPortResponse;
  getUserEcosystems(params: GetUserEcosystemsPortParams): GetUserEcosystemsPortResponse;
  getUserStats(params: GetUserStatsPortParams): GetUserStatsPortResponse;
}
