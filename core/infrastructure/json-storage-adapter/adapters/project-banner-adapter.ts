import { ProjectBanner, ProjectBannerResponse } from "@/core/domain/project-banner/models/project-banner-model";
import { ProjectBannerStoragePort } from "@/core/domain/project-banner/outputs/project-banner-storage-port";

import ProjectBannerData from "../data/project-banner-data.json";

export class ProjectBannerAdapter implements ProjectBannerStoragePort {
  routes = {};

  getProjectBanners = () => {
    return ProjectBannerData.projectBanners.map(
      projectBanner => new ProjectBanner(projectBanner as ProjectBannerResponse)
    );
  };
}
