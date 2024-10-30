import { BiStoragePort } from "@/core/domain/bi/outputs/bi-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class BiClientAdapterMock implements BiStoragePort {
  constructor() {}

  routes = {};

  getBiContributorsStats = mockHttpStorageResponse<BiStoragePort["getBiContributorsStats"]>;

  getBiProjectsStats = mockHttpStorageResponse<BiStoragePort["getBiProjectsStats"]>;

  getBiWorldMap = mockHttpStorageResponse<BiStoragePort["getBiWorldMap"]>;

  getBiProjects = mockHttpStorageResponse<BiStoragePort["getBiProjects"]>;

  getBiProjectsCsv = mockHttpStorageResponse<BiStoragePort["getBiProjectsCsv"]>;

  getBiContributors = mockHttpStorageResponse<BiStoragePort["getBiContributors"]>;

  getBiContributorsCsv = mockHttpStorageResponse<BiStoragePort["getBiContributorsCsv"]>;

  getBiStatsFinancials = mockHttpStorageResponse<BiStoragePort["getBiStatsFinancials"]>;

  getBiContributorById = mockHttpStorageResponse<BiStoragePort["getBiContributorById"]>;

  getBiContributorActivityById = mockHttpStorageResponse<BiStoragePort["getBiContributorActivityById"]>;
}
