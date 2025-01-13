import {
  GetHackathonBySlugResponse,
  GetHackathonEventsResponse,
  GetHackathonProjectsV2Response,
  GetHackathonsResponse,
} from "@/core/domain/hackathon/hackathon-contract.types";
import { HackathonEvent } from "@/core/domain/hackathon/models/hackathon-event-model";
import { HackathonListItem } from "@/core/domain/hackathon/models/hackathon-list-item-model";
import { Hackathon } from "@/core/domain/hackathon/models/hackathon-model";
import { HackathonProjectListItemV2 } from "@/core/domain/hackathon/models/hackathon-project-list-item-model-v2";
import { HackathonStoragePort } from "@/core/domain/hackathon/outputs/hackathon-storage-port";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class HackathonClientAdapter implements HackathonStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getHackathons: "hackathons",
    getHackathonBySlug: "hackathons/slug/:hackathonSlug",
    getHackathonProjects: "hackathons/slug/:hackathonSlug/projects",
    getHackathonEvents: "hackathons/slug/:hackathonSlug/events",
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

  getHackathonProjects = ({
    pathParams,
    queryParams,
  }: FirstParameter<HackathonStoragePort["getHackathonProjects"]>) => {
    const path = this.routes["getHackathonProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetHackathonProjectsV2Response>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new HackathonProjectListItemV2(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getHackathonEvents = ({ pathParams, queryParams }: FirstParameter<HackathonStoragePort["getHackathonEvents"]>) => {
    const path = this.routes["getHackathonEvents"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetHackathonEventsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        events: data.events.map(event => new HackathonEvent(event)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
