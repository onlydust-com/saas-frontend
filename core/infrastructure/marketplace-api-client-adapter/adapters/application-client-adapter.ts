import {
  DeleteApplicationBody,
  GetApplicationByIdResponse,
  PatchApplicationBody,
} from "@/core/domain/application/application-contract.types";
import { Application } from "@/core/domain/application/model/application-model";
import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ApplicationClientAdapter implements ApplicationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    patchApplication: "applications/:applicationId",
    acceptApplication: "applications/:applicationId/accept",
    getApplicationById: "applications/:applicationId",
    deleteApplication: "applications/:applicationId",
  } as const;

  patchApplication = ({ pathParams }: FirstParameter<ApplicationStoragePort["patchApplication"]>) => {
    const path = this.routes["patchApplication"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: PatchApplicationBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  acceptApplication = ({ pathParams }: FirstParameter<ApplicationStoragePort["acceptApplication"]>) => {
    const path = this.routes["acceptApplication"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  getApplicationById = ({ pathParams }: FirstParameter<ApplicationStoragePort["getApplicationById"]>) => {
    const path = this.routes["getApplicationById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetApplicationByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Application(data);
    };

    return {
      request,
      tag,
    };
  };

  deleteApplication = ({ pathParams }: FirstParameter<ApplicationStoragePort["deleteApplication"]>) => {
    const path = this.routes["deleteApplication"];
    const method = "DELETE";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: DeleteApplicationBody) =>
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
