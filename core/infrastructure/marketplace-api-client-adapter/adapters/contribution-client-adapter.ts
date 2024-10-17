import {
  GetContributionByIdResponse,
  GetContributionEventsResponse,
  GetContributionsResponse,
  PatchContributionBody,
} from "@/core/domain/contribution/contribution-contract.types";
import { ContributionActivity } from "@/core/domain/contribution/models/contribution-activity-model";
import { ContributionEvent } from "@/core/domain/contribution/models/contribution-event-model";
import { ContributionStoragePort } from "@/core/domain/contribution/output/contribution-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class ContributionClientAdapter implements ContributionStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getContributions: "contributions",
    getContributionById: "contributions/:contributionGithubId",
    patchContribution: "contributions/:contributionId",
    getContributionEvent: "contributions/:contributionId/events",
  } as const;

  getContributions = ({ queryParams }: FirstParameter<ContributionStoragePort["getContributions"]>) => {
    const path = this.routes["getContributions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetContributionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        contributions: data.contributions.map(contribution => new ContributionActivity(contribution)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getContributionsById = ({ pathParams }: FirstParameter<ContributionStoragePort["getContributionsById"]>) => {
    const path = this.routes["getContributionById"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetContributionByIdResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new ContributionActivity(data);
    };

    return {
      request,
      tag,
    };
  };

  getContributionEvent = ({
    queryParams,
    pathParams,
  }: FirstParameter<ContributionStoragePort["getContributionEvent"]>) => {
    const path = this.routes["getContributionEvent"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetContributionEventsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return data?.events.map(event => new ContributionEvent(event)) ?? [];
    };

    return {
      request,
      tag,
    };
  };

  patchContribution = ({ pathParams }: FirstParameter<ContributionStoragePort["patchContribution"]>) => {
    const path = this.routes["patchContribution"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: PatchContributionBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
