import { RecoStoragePort } from "@/core/domain/reco/output/reco-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class RecoClientAdapterMock implements RecoStoragePort {
  constructor() {}

  routes = {};

  getMatchingQuestions = mockHttpStorageResponse<RecoStoragePort["getMatchingQuestions"]>;

  saveMatchingQuestions = mockHttpStorageResponse<RecoStoragePort["saveMatchingQuestions"]>;

  getRecommendedProjects = mockHttpStorageResponse<RecoStoragePort["getRecommendedProjects"]>;

  getTailoredDiscoveries = mockHttpStorageResponse<RecoStoragePort["getTailoredDiscoveries"]>;
}
