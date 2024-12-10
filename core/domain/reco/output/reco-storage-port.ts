import { GetMatchingQuestionsPortParams, GetMatchingQuestionsPortResponse } from "../reco-contract.types";

export interface RecoStoragePort {
  getMatchingQuestions(p: GetMatchingQuestionsPortParams): GetMatchingQuestionsPortResponse;
}
