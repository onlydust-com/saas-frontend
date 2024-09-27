import { SearchEcosystemsResponse } from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemLink } from "@/core/domain/ecosystem/models/ecosystem-link-model";
import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class EcosystemClientAdapter implements EcosystemStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    searchEcosystems: "ecosystems",
  } as const;

  searchEcosystems = ({ queryParams, pathParams }: FirstParameter<EcosystemStoragePort["searchEcosystems"]>) => {
    const path = this.routes["searchEcosystems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });

    const request = async () => {
      const data = await this.client.request<SearchEcosystemsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        ecosystems: (data?.ecosystems || []).map(ecosystem => new EcosystemLink(ecosystem)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
