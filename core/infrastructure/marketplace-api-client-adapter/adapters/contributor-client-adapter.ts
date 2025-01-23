import {
  GetContributorContributionsOverTimeResponse,
  GetContributorLastYearRewindResponse,
  GetContributorLocDistributionResponse,
  GetContributorProjectsResponse,
  GetContributorRewardsDistributionResponse,
  GetContributorStatsResponse,
} from "@/core/domain/contributor/contributor-contract.types";
import { ContributorContributionsOverTime } from "@/core/domain/contributor/models/contributor-contributions-over-time-model";
import { ContributorLastYearRewind } from "@/core/domain/contributor/models/contributor-last-year-rewind-model";
import { ContributorLocDistribution } from "@/core/domain/contributor/models/contributor-loc-distribution-model";
import { ContributorProjectListItem } from "@/core/domain/contributor/models/contributor-project-list-item-model";
import { ContributorRewardsDistribution } from "@/core/domain/contributor/models/contributor-rewards-distribution-model";
import { ContributorStats } from "@/core/domain/contributor/models/contributor-stats-model";
import { ContributorStoragePort } from "@/core/domain/contributor/outputs/contributor-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ContributorClientAdapter implements ContributorStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getContributorStats: "contributors/:contributorId/stats",
    getContributorRewardsDistribution: "contributors/:contributorId/rewards-distribution",
    getContributorProjects: "contributors/:contributorId/projects",
    getContributorLocDistribution: "contributors/:contributorId/loc-distribution",
    getContributorLastYearRewind: "contributors/:contributorId/last-year-rewind",
    getContributorContributionsOverTime: "contributors/:contributorId/contributions-over-time",
  } as const;

  getContributorStats = ({
    pathParams,
    queryParams,
  }: FirstParameter<ContributorStoragePort["getContributorStats"]>) => {
    const path = this.routes["getContributorStats"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetContributorStatsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new ContributorStats(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributorRewardsDistribution = ({
    pathParams,
    queryParams,
  }: FirstParameter<ContributorStoragePort["getContributorRewardsDistribution"]>) => {
    const path = this.routes["getContributorRewardsDistribution"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetContributorRewardsDistributionResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new ContributorRewardsDistribution(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributorProjects = ({
    pathParams,
    queryParams,
  }: FirstParameter<ContributorStoragePort["getContributorProjects"]>) => {
    const path = this.routes["getContributorProjects"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetContributorProjectsResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new ContributorProjectListItem(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getContributorLocDistribution = ({
    pathParams,
    queryParams,
  }: FirstParameter<ContributorStoragePort["getContributorLocDistribution"]>) => {
    const path = this.routes["getContributorLocDistribution"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetContributorLocDistributionResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new ContributorLocDistribution(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributorLastYearRewind = ({
    pathParams,
  }: FirstParameter<ContributorStoragePort["getContributorLastYearRewind"]>) => {
    const path = this.routes["getContributorLastYearRewind"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetContributorLastYearRewindResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new ContributorLastYearRewind(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributorContributionsOverTime = ({
    pathParams,
    queryParams,
  }: FirstParameter<ContributorStoragePort["getContributorContributionsOverTime"]>) => {
    const path = this.routes["getContributorContributionsOverTime"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async () => {
      const data = await this.client.request<GetContributorContributionsOverTimeResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return new ContributorContributionsOverTime(data);
    };

    return {
      request,
      tag,
    };
  };
}
