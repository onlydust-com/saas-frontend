import {
  GetContributorMatchingPortParams,
  GetQuestContributorPortResponse,
} from "@/core/domain/quest/quest-contract.types";

export interface QuestFacadePort {
  getQuestContributor(p: GetContributorMatchingPortParams): GetQuestContributorPortResponse;
}
