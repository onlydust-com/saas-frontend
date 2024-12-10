import { GetMatchingQuestionsPortParams, GetMatchingQuestionsPortResponse } from "../reco-contract.types";

export interface RecoFacadePort {
  getMatchingQuestions(p: GetMatchingQuestionsPortParams): GetMatchingQuestionsPortResponse;
}
