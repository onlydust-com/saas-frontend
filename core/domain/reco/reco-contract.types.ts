import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { MatchingQuestionsInterface } from "./models/matching-questions-model";

/* ------------------------------ Get Matching Questions ------------------------------ */

export type GetMatchingQuestionsResponse = components["schemas"]["MatchingQuestionsResponse"];

export type GetMatchingQuestionsModel = Omit<GetMatchingQuestionsResponse, "questions"> & {
  questions: MatchingQuestionsInterface[];
};

type GetMatchingQuestionsQueryParams = operations["getMatchingQuestions"]["parameters"]["query"];

export type GetMatchingQuestionsPortResponse = HttpStorageResponse<GetMatchingQuestionsModel>;

export type GetMatchingQuestionsPortParams = HttpClientParameters<{
  QueryParams: GetMatchingQuestionsQueryParams;
}>;

/* ------------------------------ Save Matching Questions ------------------------------ */

export type SaveMatchingQuestionsBody = components["schemas"]["SaveMatchingAnswersRequest"];

type SaveMatchingQuestionsPathParams = operations["saveMatchingQuestionAnswers"]["parameters"]["path"];
type SaveMatchingQuestionsQueryParams = operations["saveMatchingQuestionAnswers"]["parameters"]["query"];

export type SaveMatchingQuestionsPortParams = HttpClientParameters<{
  PathParams: SaveMatchingQuestionsPathParams;
  QueryParams: SaveMatchingQuestionsQueryParams;
}>;

export type SaveMatchingQuestionsPortResponse = HttpStorageResponse<never>;
