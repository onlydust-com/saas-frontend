import {
  GetBiContributorActivityByIdResponse,
  GetBiContributorByIdResponse,
  GetBiContributorsResponse,
  GetBiContributorsStatsResponse,
  GetBiProjectsResponse,
  GetBiProjectsStatsResponse,
  GetBiStatsFinancialsResponse,
  GetBiWorldMapResponse,
} from "@/core/domain/bi/bi-contract.types";
import { BiContributorActivity } from "@/core/domain/bi/models/bi-contributor-activity-model";
import { BiContributorListItem } from "@/core/domain/bi/models/bi-contributor-list-item-model";
import { BiContributor } from "@/core/domain/bi/models/bi-contributor-model";
import { BiContributorsStats } from "@/core/domain/bi/models/bi-contributors-stats-model";
import { BiProject } from "@/core/domain/bi/models/bi-project-model";
import { BiProjectsStats } from "@/core/domain/bi/models/bi-projects-stats-model";
import { BiStatsFinancials } from "@/core/domain/bi/models/bi-stats-financials-model";
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
    getBiContributors: "bi/contributors",
    getBiContributorById: "bi/contributors/:contributorIdOrLogin",
    getBiContributorActivityById: "bi/contributors/:contributorIdOrLogin/activity-graph",
    getBiStatsFinancials: "bi/stats/financials",
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

      const max = data.countries.reduce((acc, item) => Math.max(acc, item.value), 0);

      return {
        ...data,
        countries: data.countries.map(item => new BiWorldMap(item, max)),
      };
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

  getBiProjectsCsv = ({ queryParams }: FirstParameter<BiStoragePort["getBiProjectsCsv"]>) => {
    const path = this.routes["getBiProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () =>
      this.client.request<Blob>({
        path,
        method,
        tag,
        queryParams,
        headers: {
          accept: "text/csv",
        },
      });

    return {
      request,
      tag,
    };
  };

  getBiContributors = ({ queryParams }: FirstParameter<BiStoragePort["getBiContributors"]>) => {
    const path = this.routes["getBiContributors"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiContributorsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        contributors: data.contributors.map(contributor => new BiContributorListItem(contributor)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getBiContributorById = ({ pathParams }: FirstParameter<BiStoragePort["getBiContributorById"]>) => {
    const path = this.routes["getBiContributorById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetBiContributorByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new BiContributor(data);
    };

    return {
      request,
      tag,
    };
  };

  getBiContributorActivityById = ({
    pathParams,
    queryParams,
  }: FirstParameter<BiStoragePort["getBiContributorActivityById"]>) => {
    const path = this.routes["getBiContributorActivityById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiContributorActivityByIdResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new BiContributorActivity(data);
    };

    return {
      request,
      tag,
    };
  };

  getBiContributorsCsv = ({ queryParams }: FirstParameter<BiStoragePort["getBiContributorsCsv"]>) => {
    const path = this.routes["getBiContributors"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () =>
      this.client.request<Blob>({
        path,
        method,
        tag,
        queryParams,
        headers: {
          accept: "text/csv",
        },
      });

    return {
      request,
      tag,
    };
  };

  getBiStatsFinancials = ({ queryParams }: FirstParameter<BiStoragePort["getBiStatsFinancials"]>) => {
    const path = this.routes["getBiStatsFinancials"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetBiStatsFinancialsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        stats: data.stats.map(stat => new BiStatsFinancials(stat)),
      };
    };

    return {
      request,
      tag,
    };
  };
}
