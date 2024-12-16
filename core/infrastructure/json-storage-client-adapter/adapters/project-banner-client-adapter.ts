import { ProjectBanner, ProjectBannerResponse } from "@/core/domain/project-banner/models/project-banner-model";
import { ProjectBannerStoragePort } from "@/core/domain/project-banner/outputs/project-banner-storage-port";
import ProjectBannerData from "@/core/infrastructure/json-storage-client-adapter/data/project-banner-client-data.json";

export class ProjectBannerClientAdapter implements ProjectBannerStoragePort {
  constructor() {}

  routes = {};

  getProjectBanners = () => {
    return ProjectBannerData.projectBanners.map(
      projectBanner => new ProjectBanner(projectBanner as ProjectBannerResponse)
    );
  };
}
