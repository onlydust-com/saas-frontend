import { GetHackathonBySlugResponse, GetHackathonsResponse } from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonListItem } from "@/core/domain/hackathon/models/hackathon-list-item-model";
import { Hackathon } from "@/core/domain/hackathon/models/hackathon-model";
import { HackathonStoragePort } from "@/core/domain/hackathon/outputs/hackathon-storage-port";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class HackathonClientAdapter implements HackathonStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getHackathons: "hackathons",
    getHackathonBySlug: "hackathons/slug/:hackathonSlug",
  } as const;

  getHackathons = () => {
    const path = this.routes["getHackathons"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetHackathonsResponse>({
        path,
        method,
        tag,
      });

      return {
        ...data,
        hackathons: data.hackathons.map(hackathon => new HackathonListItem(hackathon)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getHackathonBySlug = ({ pathParams }: FirstParameter<HackathonStoragePort["getHackathonBySlug"]>) => {
    const path = this.routes["getHackathonBySlug"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetHackathonBySlugResponse>({
        path,
        method,
        tag,
        pathParams,
        version: MarketplaceApiVersion.v2,
      });

      return new Hackathon(data);
    };

    return {
      request,
      tag,
    };
  };
}
