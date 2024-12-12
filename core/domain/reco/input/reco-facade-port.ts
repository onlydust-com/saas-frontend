import {
  GetMatchingQuestionsPortParams,
  GetMatchingQuestionsPortResponse,
  SaveMatchingQuestionsPortParams,
  SaveMatchingQuestionsPortResponse,
} from "../reco-contract.types";

export interface RecoFacadePort {
  getMatchingQuestions(p: GetMatchingQuestionsPortParams): GetMatchingQuestionsPortResponse;
  saveMatchingQuestions(p: SaveMatchingQuestionsPortParams): SaveMatchingQuestionsPortResponse;
}
