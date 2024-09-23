import { Contributor } from "@/core/domain/user/models/contributor-model";
import { UserEcosystemItem } from "@/core/domain/user/models/user-ecosystem-item-model";
import { UserLanguageItem } from "@/core/domain/user/models/user-language-item-model";
import { UserPublic } from "@/core/domain/user/models/user-public-model";
import { UserStats } from "@/core/domain/user/models/user-stats-model";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import {
  GetUserByIdResponse,
  GetUserByLoginResponse,
  GetUserEcosystemsResponse,
  GetUserLanguagesResponse,
  GetUserStatsResponse,
  SearchUsersPortParams,
  SearchUsersResponse,
} from "@/core/domain/user/user-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class UserClientAdapter implements UserStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    searchUsers: "users/search",
    getUserById: "users/:githubId",
    getUserByLogin: "users/login/:slug",
    getUserLanguages: "users/:githubId/languages",
    getUserEcosystems: "users/:githubId/ecosystems",
    getUserStats: "users/:githubId/stats",
  } as const;

  searchUser = ({ queryParams, pathParams }: SearchUsersPortParams) => {
    const path = this.routes["searchUsers"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });

    const request = async () => {
      const data = await this.client.request<SearchUsersResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        internalContributors: (data?.internalContributors || []).map(user => new Contributor(user)),
        externalContributors: (data?.externalContributors || []).map(user => new Contributor(user)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getUserById = ({ queryParams, pathParams }: FirstParameter<UserStoragePort["getUserById"]>) => {
    const path = this.routes["getUserById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetUserByIdResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new UserPublic(data);
    };

    return {
      request,
      tag,
    };
  };

  getUserByLogin = ({ queryParams, pathParams }: FirstParameter<UserStoragePort["getUserByLogin"]>) => {
    const path = this.routes["getUserByLogin"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetUserByLoginResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new UserPublic(data);
    };

    return {
      request,
      tag,
    };
  };

  getUserLanguages = ({ pathParams, queryParams }: FirstParameter<UserStoragePort["getUserLanguages"]>) => {
    const path = this.routes["getUserLanguages"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetUserLanguagesResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        languages: data.languages.map(language => new UserLanguageItem(language)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getUserEcosystems = ({ pathParams, queryParams }: FirstParameter<UserStoragePort["getUserEcosystems"]>) => {
    const path = this.routes["getUserEcosystems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetUserEcosystemsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        languages: data.ecosystems.map(ecosystem => new UserEcosystemItem(ecosystem)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getUserStats = ({ queryParams, pathParams }: FirstParameter<UserStoragePort["getUserStats"]>) => {
    const path = this.routes["getUserStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetUserStatsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new UserStats(data);
    };

    return {
      request,
      tag,
    };
  };
}
