import {
  GetContributorMatchingPortParams,
  GetQuestContributorPortResponse,
} from "@/core/domain/quest/quest-contract.types";

export interface QuestStoragePort {
  routes: Record<string, string>;
  getQuestContributor(p: GetContributorMatchingPortParams): GetQuestContributorPortResponse;
}
