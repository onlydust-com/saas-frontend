import { QuestStoragePort } from "@/core/domain/quest/outputs/quest-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class QuestClientAdapterMock implements QuestStoragePort {
  constructor() {}

  routes = {};

  getQuestContributor = mockHttpStorageResponse<QuestStoragePort["getQuestContributor"]>;
}
