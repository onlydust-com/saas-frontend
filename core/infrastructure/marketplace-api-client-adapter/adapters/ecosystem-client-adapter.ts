import {
  GetEcosystemBySlugResponse,
  GetEcosystemContributorsResponse,
  GetEcosystemEventsResponse,
  GetEcosystemsResponse,
  SearchEcosystemsResponse,
} from "@/core/domain/ecosystem/ecosystem-contract.types";
import { EcosystemContributorsListItem } from "@/core/domain/ecosystem/models/ecosystem-contributors-list-item-model";
import { EcosystemEvent } from "@/core/domain/ecosystem/models/ecosystem-event-model";
import { EcosystemLink } from "@/core/domain/ecosystem/models/ecosystem-link-model";
import { EcosystemsListItem } from "@/core/domain/ecosystem/models/ecosystem-list-item-model";
import { Ecosystem } from "@/core/domain/ecosystem/models/ecosystem-model";
import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

import { MarketplaceApiVersion } from "../config/api-version";

export class EcosystemClientAdapter implements EcosystemStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    searchEcosystems: "ecosystems",
    getEcosystems: "ecosystems",
    getEcosystemBySlug: "ecosystems/:slug",
    getEcosystemContributors: "ecosystems/:slug/contributors",
    getEcosystemEvents: "ecosystems/:slug/events",
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
        version: MarketplaceApiVersion.v3,
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
        version: MarketplaceApiVersion.v2,
      });

      return new Ecosystem(data);
    };

    return {
      request,
      tag,
    };
  };

  getEcosystemContributors = ({
    pathParams,
    queryParams,
  }: FirstParameter<EcosystemStoragePort["getEcosystemContributors"]>) => {
    const path = this.routes["getEcosystemContributors"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetEcosystemContributorsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
        version: MarketplaceApiVersion.v2,
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

  getEcosystemEvents = ({ pathParams, queryParams }: FirstParameter<EcosystemStoragePort["getEcosystemEvents"]>) => {
    const path = this.routes["getEcosystemEvents"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetEcosystemEventsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        events: (data?.events || []).map(event => new EcosystemEvent(event)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
