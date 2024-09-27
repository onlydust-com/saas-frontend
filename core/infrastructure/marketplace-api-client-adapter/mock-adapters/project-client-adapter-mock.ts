import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectClientAdapterMock implements ProjectStoragePort {
  constructor() {}

  routes = {};

  getProjectById = mockHttpStorageResponse<ProjectStoragePort["getProjectById"]>;

  getProjectStats = mockHttpStorageResponse<ProjectStoragePort["getProjectStats"]>;

  getProjects = mockHttpStorageResponse<ProjectStoragePort["getProjects"]>;

  editProject = mockHttpStorageResponse<ProjectStoragePort["editProject"]>;

  getProjectFinancialDetailsBySlug = mockHttpStorageResponse<ProjectStoragePort["getProjectFinancialDetailsBySlug"]>;
}
