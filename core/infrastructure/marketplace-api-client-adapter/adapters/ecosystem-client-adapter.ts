import {
  GetEcosystemBySlugResponse,
  GetEcosystemContributorsResponse,
  GetEcosystemsResponse,
  SearchEcosystemsResponse,
} from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemContributorsListItem } from "@/core/domain/ecosystem/models/ecosystem-contributors-list-item-model";
import { EcosystemLink } from "@/core/domain/ecosystem/models/ecosystem-link-model";
import { EcosystemsListItem } from "@/core/domain/ecosystem/models/ecosystem-list-item-model";
import { Ecosystem } from "@/core/domain/ecosystem/models/ecosystem-model";
import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class EcosystemClientAdapter implements EcosystemStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    searchEcosystems: "ecosystems",
    getEcosystems: "ecosystems",
    getEcosystemBySlug: "ecosystems/{slug}",
    getEcosystemContributors: "ecosystems/{slug}/contributors",
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

  getEcosystems = ({ queryParams }: FirstParameter<EcosystemStoragePort["getEcosystems"]>) => {
    const path = this.routes["getEcosystems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetEcosystemsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        ecosystems: (data?.ecosystems || []).map(ecosystem => new EcosystemsListItem(ecosystem)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getEcosystemBySlug = ({ pathParams }: FirstParameter<EcosystemStoragePort["getEcosystemBySlug"]>) => {
    const path = this.routes["getEcosystemBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetEcosystemBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Ecosystem(data);
    };

    return {
      request,
      tag,
    };
  };

  getEcosystemContributors = ({ pathParams }: FirstParameter<EcosystemStoragePort["getEcosystemContributors"]>) => {
    const path = this.routes["getEcosystemContributors"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetEcosystemContributorsResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return {
        ...data,
        contributors: (data?.contributors || []).map(contributor => new EcosystemContributorsListItem(contributor)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
