import { Contributor } from "@/core/domain/user/models/contributor-model";
import { User } from "@/core/domain/user/models/user-model";
import { UserProfile } from "@/core/domain/user/models/user-profile-model";
import { UserPublic } from "@/core/domain/user/models/user-public-model";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import {
  GetMeResponse,
  GetMyProfileResponse,
  GetUserByIdResponse,
  GetUserByLoginResponse,
  LogoutMeResponse,
  ReplaceMyProfileBody,
  SearchUsersPortParams,
  SearchUsersResponse,
  SetMeBody,
  SetMyProfileBody,
} from "@/core/domain/user/user-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class UserClientAdapter implements UserStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    logoutMe: "me/logout",
    getMe: "me",
    setMe: "me",
    getMyProfile: "me/profile",
    setMyProfile: "me/profile",
    replaceMyProfile: "me/profile",
    searchUsers: "users/search",
    getUserById: "users/:githubId",
    getUserByLogin: "users/login/:slug",
  } as const;

  logoutMe = () => {
    const path = this.routes["logoutMe"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = () =>
      this.client.request<LogoutMeResponse>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  };

  getMe = () => {
    const path = this.routes["getMe"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMeResponse>({
        path,
        method,
        tag,
      });

      return new User(data);
    };

    return {
      request,
      tag,
    };
  };

  setMe = () => {
    const path = this.routes["setMe"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMeBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyProfile = () => {
    const path = this.routes["getMyProfile"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyProfileResponse>({
        path,
        method,
        tag,
      });

      return new UserProfile(data);
    };

    return {
      request,
      tag,
    };
  };

  setMyProfile = () => {
    const path = this.routes["setMyProfile"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMyProfileBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  replaceMyProfile = () => {
    const path = this.routes["replaceMyProfile"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: ReplaceMyProfileBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

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
}
