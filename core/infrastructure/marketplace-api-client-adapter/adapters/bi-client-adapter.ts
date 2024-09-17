import {
  GetBiContributorsStatsResponse,
  GetBiProjectsStatsResponse,
  GetBiProjectsResponse,
  GetBiWorldMapResponse,
} from "@/core/domain/bi/bi-contract.types";
import { BiContributorsStats } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { BiProject } from "@/core/domain/bi/models/bi-project-model";
import { BiProjectsStats } from "@/core/domain/bi/models/bi-projects-stats-model";
import { BiWorldMap } from "@/core/domain/bi/models/bi-world-map-model";
import { BiStoragePort } from "@/core/domain/bi/outputs/bi-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class BiClientAdapter implements BiStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getBiContributorsStats: "bi/stats/contributors",
    getBiProjectsStats: "bi/stats/projects",
    getBiWorldMap: "bi/world-map",
    getBiProjects: "bi/projects",
  } as const;

  getBiContributorsStats = ({ pathParams, queryParams }: FirstParameter<BiStoragePort["getBiContributorsStats"]>) => {
    const path = this.routes["getBiContributorsStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiContributorsStatsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        stats: data.stats.map(stat => new BiContributorsStats(stat)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getBiProjectsStats = ({ pathParams, queryParams }: FirstParameter<BiStoragePort["getBiProjectsStats"]>) => {
    const path = this.routes["getBiProjectsStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiProjectsStatsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        stats: data.stats.map(stat => new BiProjectsStats(stat)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getBiWorldMap = ({ pathParams, queryParams }: FirstParameter<BiStoragePort["getBiWorldMap"]>) => {
    const path = this.routes["getBiWorldMap"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiWorldMapResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      const max = data.reduce((acc, item) => Math.max(acc, item.value), 0);

      return data.map(item => new BiWorldMap(item, max));
    };

    return {
      request,
      tag,
    };
  };

  getBiProjects = ({ queryParams }: FirstParameter<BiStoragePort["getBiProjects"]>) => {
    const path = this.routes["getBiProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiProjectsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new BiProject(project)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
