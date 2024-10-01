import { GetMyOrganizationsResponse } from "@/core/domain/github/github-contract.types";
import { GithubOrganization } from "@/core/domain/github/models/github-organization-model";
import { GithubStoragePort } from "@/core/domain/github/outputs/github-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class GithubClientAdapter implements GithubStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getMyOrganizations: "me/organizations",
  } as const;

  getMyOrganizations = ({ queryParams, pathParams }: FirstParameter<GithubStoragePort["getMyOrganizations"]>) => {
    const path = this.routes["getMyOrganizations"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetMyOrganizationsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return data.map(organization => new GithubOrganization(organization));
    };

    return {
      request,
      tag,
    };
  };
}
