import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectClientAdapterMock implements ProjectStoragePort {
  constructor() {}

  routes = {};

  getProjectByid = mockHttpStorageResponse<ProjectStoragePort["getProjectByid"]>;

  getProjectStats = mockHttpStorageResponse<ProjectStoragePort["getProjectStats"]>;

  getProjects = mockHttpStorageResponse<ProjectStoragePort["getProjects"]>;
}
