import { GetApplicationsResponse } from "@/core/domain/application/application-contract.types";
import { ApplicationListItem } from "@/core/domain/application/models/application-list-item-model";
import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ApplicationClientAdapter implements ApplicationStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getApplications: "applications",
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
}
