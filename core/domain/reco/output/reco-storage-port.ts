import {
  GetMatchingQuestionsPortParams,
  GetMatchingQuestionsPortResponse,
  GetRecommendedProjectsPortParams,
  GetRecommendedProjectsPortResponse,
  SaveMatchingQuestionsPortParams,
  SaveMatchingQuestionsPortResponse,
} from "../reco-contract.types";

export interface RecoStoragePort {
  getMatchingQuestions(p: GetMatchingQuestionsPortParams): GetMatchingQuestionsPortResponse;
  saveMatchingQuestions(p: SaveMatchingQuestionsPortParams): SaveMatchingQuestionsPortResponse;
  getRecommendedProjects(p: GetRecommendedProjectsPortParams): GetRecommendedProjectsPortResponse;
}
