import { MatchingQuestions } from "@/core/domain/reco/models/matching-questions-model";
import { RecoStoragePort } from "@/core/domain/reco/output/reco-storage-port";
import { GetMatchingQuestionsResponse } from "@/core/domain/reco/reco-contract.types";
import { FirstParameter } from "@/core/kernel/types";

import { HttpClient } from "../http/http-client/http-client";

export class RecoClientAdapter implements RecoStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getMatchingQuestions: "me/reco/projects/matching-questions",
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
}
