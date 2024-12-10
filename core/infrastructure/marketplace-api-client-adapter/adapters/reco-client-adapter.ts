import { MatchingQuestions } from "@/core/domain/reco/models/matching-questions-model";
import { RecoStoragePort } from "@/core/domain/reco/output/reco-storage-port";
import { GetMatchingQuestionsResponse, SaveMatchingQuestionsBody } from "@/core/domain/reco/reco-contract.types";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class RecoClientAdapter implements RecoStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getMatchingQuestions: "me/reco/projects/matching-questions",
    saveMatchingQuestions: "me/reco/projects/matching-questions/:questionId/answers",
  } as const;

  getMatchingQuestions = ({ queryParams }: FirstParameter<RecoStoragePort["getMatchingQuestions"]>) => {
    const path = this.routes["getMatchingQuestions"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });

    const request = async () => {
      const data = await this.client.request<GetMatchingQuestionsResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        questions: data.questions.map(question => new MatchingQuestions(question)),
      };
    };

    return {
      request,
      tag,
    };
  };

  saveMatchingQuestions = ({ pathParams, queryParams }: FirstParameter<RecoStoragePort["saveMatchingQuestions"]>) => {
    const path = this.routes["saveMatchingQuestions"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams, queryParams });

    const request = async (body: SaveMatchingQuestionsBody) =>
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
