import { QuestStoragePort } from "@/core/domain/quest/outputs/quest-storage-port";
import {
  GetContributorMatchingPortParams,
  GetQuestContributorResponse,
} from "@/core/domain/quest/quest-contract.types";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class QuestClientAdapter implements QuestStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getQuestContributor: "quests/:questId/matching/:githubLogin",
  } as const;

  getQuestContributor = ({ pathParams, queryParams }: GetContributorMatchingPortParams) => {
    const path = this.routes["getQuestContributor"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });
    const request = async () => {
      const data = await this.client.request<GetQuestContributorResponse>({
        path,
        method,
        tag,
        pathParams,
        queryParams,
      });

      return data;
    };

    return {
      request,
      tag,
    };
  };
}
