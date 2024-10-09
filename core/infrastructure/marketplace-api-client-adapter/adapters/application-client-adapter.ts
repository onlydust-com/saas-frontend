import { GetApplicationsResponse, PatchApplicationBody } from "@/core/domain/application/application-contract.types";
import { ApplicationListItem } from "@/core/domain/application/models/application-list-item-model";
import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ApplicationClientAdapter implements ApplicationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getApplications: "applications",
    patchApplication: "applications/:applicationId",
  } as const;

  getApplications = ({ queryParams }: FirstParameter<ApplicationStoragePort["getApplications"]>) => {
    const path = this.routes["getApplications"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetApplicationsResponse>({
        path,
        version: MarketplaceApiVersion.v2,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        applications: data.applications.map(application => new ApplicationListItem(application)),
      };
    };

    return {
      request,
      tag,
    };
  };

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
}
