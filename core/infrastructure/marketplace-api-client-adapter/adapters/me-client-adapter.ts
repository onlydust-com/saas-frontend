import { bootstrap } from "@/core/bootstrap";
import {
  GetMeResponse,
  GetMyProfileResponse,
  LogoutMeResponse,
  ReplaceMyProfileBody,
  SetMeBody,
  SetMyProfileBody,
} from "@/core/domain/me/me-contract.types";
import { Me } from "@/core/domain/me/models/me-model";
import { MeProfile } from "@/core/domain/me/models/me-profile-model";
import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { AnyType } from "@/core/kernel/types";

export class MeClientAdapter implements MeStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    logoutMe: "me/logout",
    getMe: "me",
    setMe: "me",
    getMyProfile: "me/profile",
    setMyProfile: "me/profile",
    replaceMyProfile: "me/profile",
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

    const authProvider = bootstrap.getAuthProvider();
    const request = async () => {
      try {
        const data = await this.client.request<GetMeResponse>({
          path,
          method,
          tag,
        });
        return new Me(data);
      } catch (err) {
        if ((err as AnyType).status === 401 && authProvider?.logout) {
          authProvider?.logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }
        throw err;
      }
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

      return new MeProfile(data);
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
}
